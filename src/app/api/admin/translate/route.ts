import { NextResponse } from "next/server";
import { consumeRateLimit } from "@/lib/api/rate-limit";
import { getClientIp } from "@/lib/api/request";
import { getTranslateProvider } from "@/lib/ai/translate-provider";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import {
  translateRequestSchema,
  type TranslateErrorCode,
  type TranslateErrorResponse,
  type TranslateSuccessResponse,
} from "@/lib/ai/translate-types";

function errorResponse(code: TranslateErrorCode, message: string, status: number) {
  const payload: TranslateErrorResponse = { ok: false, error: { code, message } };
  return NextResponse.json(payload, { status });
}

function auditLog(event: string, meta: Record<string, unknown>) {
  console.info(
    JSON.stringify({
      scope: "admin-translate",
      event,
      at: new Date().toISOString(),
      ...meta,
    }),
  );
}

function hasDisallowedControlChars(value: string) {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value);
}

async function translateWithTimeout(title: string, description: string, timeoutMs: number) {
  const provider = getTranslateProvider();

  return Promise.race([
    provider.translate({ title, description }),
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("TRANSLATE_TIMEOUT")), timeoutMs);
    }),
  ]);
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) {
    auditLog("unauthorized", { clientIp });
    return errorResponse("UNAUTHORIZED", "Unauthorized admin translate request.", 401);
  }

  const rateLimit = consumeRateLimit("admin-translate", clientIp, 20, 60_000);
  if (!rateLimit.allowed) {
    auditLog("rate_limited", { clientIp });
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "RATE_LIMITED",
          message: "Too many translation requests. Please retry in a minute.",
        },
      } satisfies TranslateErrorResponse,
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    auditLog("invalid_json", { clientIp });
    return errorResponse("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = translateRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    auditLog("schema_rejected", { clientIp });
    return errorResponse("BAD_REQUEST", "Invalid request payload.", 400);
  }

  if (hasDisallowedControlChars(parsed.data.title) || hasDisallowedControlChars(parsed.data.description)) {
    auditLog("control_chars_rejected", { clientIp });
    return errorResponse("BAD_REQUEST", "Payload contains disallowed control characters.", 400);
  }

  try {
    const translated = await translateWithTimeout(parsed.data.title, parsed.data.description, 8000);
    const payload: TranslateSuccessResponse = { ok: true, data: translated };
    auditLog("success", { clientIp, titleLength: parsed.data.title.length, descriptionLength: parsed.data.description.length });
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === "MOCK_PROVIDER_DISABLED_IN_PRODUCTION") {
      auditLog("provider_error", { clientIp, reason: error.message });
      return errorResponse("INTERNAL_ERROR", "Mock translate provider cannot run in production.", 500);
    }

    if (error instanceof Error && error.message.startsWith("OPENAI_PROVIDER_")) {
      auditLog("provider_error", { clientIp, reason: error.message });
      return errorResponse("INTERNAL_ERROR", "OpenAI provider translation failed.", 502);
    }

    if (error instanceof Error && error.message === "OPENAI_API_KEY_MISSING") {
      auditLog("provider_error", { clientIp, reason: error.message });
      return errorResponse("INTERNAL_ERROR", "OpenAI API key is missing.", 500);
    }

    if (error instanceof Error && error.message === "TRANSLATE_TIMEOUT") {
      auditLog("timeout", { clientIp });
      return errorResponse("TIMEOUT", "Translation request timed out.", 504);
    }

    auditLog("unexpected_error", { clientIp, reason: error instanceof Error ? error.message : "unknown" });
    return errorResponse("INTERNAL_ERROR", "Unexpected translation error.", 500);
  }
}
