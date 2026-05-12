import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock next/headers before any imports that transitively use it
vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

import { cookies } from "next/headers";
import {
  buildAdminSessionCookie,
  clearAdminSessionCookie,
  getAdminSession,
  hasAdminSession,
} from "./admin-session";

// ── helpers ────────────────────────────────────────────────────────────────

function parseTokenPayload(token: string): Record<string, unknown> | null {
  const [base] = token.split(".");
  if (!base) return null;
  try {
    return JSON.parse(Buffer.from(base, "base64url").toString("utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

// ── buildAdminSessionCookie ────────────────────────────────────────────────

describe("buildAdminSessionCookie", () => {
  it("returns the correct cookie name", () => {
    const { name } = buildAdminSessionCookie({ id: 1, role: "ADMIN" });
    expect(name).toBe("nimedya_admin_session");
  });

  it("sets httpOnly and sameSite=lax", () => {
    const { options } = buildAdminSessionCookie({ id: 1, role: "ADMIN" });
    expect(options.httpOnly).toBe(true);
    expect(options.sameSite).toBe("lax");
  });

  it("encodes the correct sub and role into the token payload", () => {
    const { value } = buildAdminSessionCookie({ id: 42, role: "EDITOR" });
    const payload = parseTokenPayload(value);
    expect(payload).not.toBeNull();
    expect(payload!.sub).toBe(42);
    expect(payload!.role).toBe("EDITOR");
  });

  it("sets exp roughly 8 hours from now", () => {
    const before = Date.now();
    const { value } = buildAdminSessionCookie({ id: 1, role: "ADMIN" });
    const after = Date.now();

    const payload = parseTokenPayload(value);
    const exp = payload!.exp as number;
    const eightHoursMs = 60 * 60 * 8 * 1000;

    expect(exp).toBeGreaterThanOrEqual(before + eightHoursMs);
    expect(exp).toBeLessThanOrEqual(after + eightHoursMs + 1000);
  });

  it("produces a token with two dot-separated parts (base.sig)", () => {
    const { value } = buildAdminSessionCookie({ id: 1, role: "ADMIN" });
    expect(value.split(".")).toHaveLength(2);
  });
});

// ── clearAdminSessionCookie ────────────────────────────────────────────────

describe("clearAdminSessionCookie", () => {
  it("returns maxAge: 0 to expire the cookie", () => {
    const { options } = clearAdminSessionCookie();
    expect(options.maxAge).toBe(0);
  });

  it("returns an empty value", () => {
    expect(clearAdminSessionCookie().value).toBe("");
  });
});

// ── getAdminSession ────────────────────────────────────────────────────────

describe("getAdminSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function mockCookieJar(token: string | undefined) {
    vi.mocked(cookies).mockResolvedValue({
      get: (name: string) => (name === "nimedya_admin_session" ? { name, value: token ?? "" } : undefined),
    } as ReturnType<typeof cookies> extends Promise<infer T> ? T : never);
  }

  it("returns null when no cookie is present", async () => {
    mockCookieJar(undefined);
    expect(await getAdminSession()).toBeNull();
  });

  it("returns a valid session for a freshly built token", async () => {
    const cookie = buildAdminSessionCookie({ id: 7, role: "ADMIN" });
    mockCookieJar(cookie.value);

    const session = await getAdminSession();
    expect(session).not.toBeNull();
    expect(session!.userId).toBe(7);
    expect(session!.role).toBe("ADMIN");
    expect(session!.expiresAt).toBeInstanceOf(Date);
  });

  it("returns null for a tampered token", async () => {
    const cookie = buildAdminSessionCookie({ id: 1, role: "ADMIN" });
    // Flip a char in the signature
    const tampered = cookie.value.slice(0, -1) + (cookie.value.endsWith("a") ? "b" : "a");
    mockCookieJar(tampered);

    expect(await getAdminSession()).toBeNull();
  });

  it("returns null for a token with an invalid role", async () => {
    // Manually craft a payload with an unknown role
    const badPayload = Buffer.from(JSON.stringify({ sub: 1, role: "SUPERUSER", exp: Date.now() + 99999 })).toString("base64url");
    mockCookieJar(`${badPayload}.invalidsig`);
    expect(await getAdminSession()).toBeNull();
  });
});

// ── hasAdminSession ────────────────────────────────────────────────────────

describe("hasAdminSession", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns true when a valid session exists", async () => {
    const cookie = buildAdminSessionCookie({ id: 1, role: "ADMIN" });
    vi.mocked(cookies).mockResolvedValue({
      get: () => ({ name: "nimedya_admin_session", value: cookie.value }),
    } as ReturnType<typeof cookies> extends Promise<infer T> ? T : never);

    expect(await hasAdminSession()).toBe(true);
  });

  it("returns false when no cookie is set", async () => {
    vi.mocked(cookies).mockResolvedValue({
      get: () => undefined,
    } as ReturnType<typeof cookies> extends Promise<infer T> ? T : never);

    expect(await hasAdminSession()).toBe(false);
  });
});
