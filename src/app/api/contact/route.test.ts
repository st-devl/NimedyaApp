import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/cms/contact", () => ({
  createContactRequest: vi.fn().mockResolvedValue({ id: 1 }),
}));

vi.mock("@/lib/api/rate-limit", () => ({
  consumeRateLimit: vi.fn().mockReturnValue({ allowed: true, retryAfterSeconds: 0 }),
}));

vi.mock("@/lib/logger", () => ({
  appLogger: {
    rateLimited: vi.fn(),
    contactSubmitted: vi.fn(),
  },
}));

import { createContactRequest } from "@/lib/cms/contact";
import { consumeRateLimit } from "@/lib/api/rate-limit";
import { appLogger } from "@/lib/logger";
import { POST } from "./route";

// ── helpers ────────────────────────────────────────────────────────────────

function makeRequest(body: unknown, options: { contentType?: string } = {}): Request {
  const headers: Record<string, string> = {
    "content-type": options.contentType ?? "application/json",
    "x-forwarded-for": "1.2.3.4",
  };
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validPayload = {
  name: "Ahmet Yilmaz",
  email: "ahmet@example.com",
  message: "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.",
};

// ── success ────────────────────────────────────────────────────────────────

describe("POST /api/contact — success", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 201 with received: true for a valid payload", async () => {
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body).toEqual({ ok: true, data: { received: true } });
  });

  it("calls createContactRequest with the parsed data", async () => {
    await POST(makeRequest(validPayload));
    expect(createContactRequest).toHaveBeenCalledOnce();
    expect(createContactRequest).toHaveBeenCalledWith(validPayload);
  });

  it("logs contactSubmitted with the client IP", async () => {
    await POST(makeRequest(validPayload));
    expect(appLogger.contactSubmitted).toHaveBeenCalledWith({ ip: "1.2.3.4" });
  });

  it("trims whitespace from name and message", async () => {
    const req = makeRequest({ ...validPayload, name: "  Ali  ", message: "  " + validPayload.message + "  " });
    await POST(req);
    expect(createContactRequest).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Ali", message: validPayload.message }),
    );
  });
});

// ── validation errors ──────────────────────────────────────────────────────

describe("POST /api/contact — validation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when name is too short", async () => {
    const res = await POST(makeRequest({ ...validPayload, name: "A" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.error.code).toBe("BAD_REQUEST");
  });

  it("returns 400 when email is invalid", async () => {
    const res = await POST(makeRequest({ ...validPayload, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error.code).toBe("BAD_REQUEST");
  });

  it("returns 400 when message is too short", async () => {
    const res = await POST(makeRequest({ ...validPayload, message: "short" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error.code).toBe("BAD_REQUEST");
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await POST(makeRequest({ name: "Ali" }));
    expect(res.status).toBe(400);
  });

  it("does not call createContactRequest on invalid payload", async () => {
    await POST(makeRequest({ ...validPayload, email: "bad" }));
    expect(createContactRequest).not.toHaveBeenCalled();
  });

  it("includes validation details in the error response", async () => {
    const res = await POST(makeRequest({ ...validPayload, name: "X" }));
    const body = await res.json();
    expect(body.error.details).toBeDefined();
  });
});

// ── JSON parse error ───────────────────────────────────────────────────────

describe("POST /api/contact — malformed body", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 for non-JSON body", async () => {
    const res = await POST(makeRequest("not json at all", { contentType: "text/plain" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error.code).toBe("BAD_REQUEST");
  });

  it("does not call createContactRequest on parse error", async () => {
    await POST(makeRequest("{broken json"));
    expect(createContactRequest).not.toHaveBeenCalled();
  });
});

// ── rate limiting ──────────────────────────────────────────────────────────

describe("POST /api/contact — rate limiting", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 429 when rate limit is exceeded", async () => {
    vi.mocked(consumeRateLimit).mockReturnValueOnce({ allowed: false, retryAfterSeconds: 42 });
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.error.code).toBe("RATE_LIMITED");
  });

  it("includes Retry-After header when rate limited", async () => {
    vi.mocked(consumeRateLimit).mockReturnValueOnce({ allowed: false, retryAfterSeconds: 30 });
    const res = await POST(makeRequest(validPayload));
    expect(res.headers.get("Retry-After")).toBe("30");
  });

  it("logs rateLimited with scope and IP", async () => {
    vi.mocked(consumeRateLimit).mockReturnValueOnce({ allowed: false, retryAfterSeconds: 10 });
    await POST(makeRequest(validPayload));
    expect(appLogger.rateLimited).toHaveBeenCalledWith({ scope: "contact-submit", ip: "1.2.3.4" });
  });

  it("does not call createContactRequest when rate limited", async () => {
    vi.mocked(consumeRateLimit).mockReturnValueOnce({ allowed: false, retryAfterSeconds: 10 });
    await POST(makeRequest(validPayload));
    expect(createContactRequest).not.toHaveBeenCalled();
  });
});
