import { NextResponse } from "next/server";
import { z } from "zod";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { getClientIp } from "@/lib/api/request";
import { consumeRateLimit } from "@/lib/api/rate-limit";
import { getTranslateProvider, type AiProvider } from "@/lib/ai/translate-provider";
import { prisma } from "@/lib/db/prisma";

const requestSchema = z.object({
  data: z.unknown(),
});

function auditLog(event: string, meta: Record<string, unknown>) {
  console.info(JSON.stringify({ scope: "admin-translate-content", event, at: new Date().toISOString(), ...meta }));
}

async function translateJson(data: unknown, timeoutMs: number): Promise<unknown> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
    select: { aiProvider: true, aiApiKey: true, aiModel: true, aiBaseUrl: true },
  });

  const provider = getTranslateProvider({
    provider: (settings?.aiProvider ?? "disabled") as AiProvider,
    apiKey: settings?.aiApiKey ?? "",
    model: settings?.aiModel ?? "gpt-4.1-mini",
    baseUrl: settings?.aiBaseUrl ?? null,
  });

  const systemPrompt =
    "You are a TR->EN JSON content translator for a marketing agency website. " +
    "Translate ONLY the string values inside the JSON from Turkish to English. " +
    "Rules: (1) Keep all JSON keys exactly as-is. (2) Do NOT translate values that look like image/asset keys (camelCase identifiers with no spaces), URLs, or email addresses. (3) Preserve all non-string values (numbers, booleans, null, arrays, objects) unchanged. (4) Return valid JSON with the same structure. (5) Keep brand and product names unchanged.";

  const userContent = JSON.stringify(data);

  const result = await Promise.race([
    provider.translateRaw(systemPrompt, userContent),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("TRANSLATE_TIMEOUT")), timeoutMs)),
  ]);

  return result;
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) {
    auditLog("unauthorized", { clientIp });
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const rateLimit = consumeRateLimit("admin-translate-content", clientIp, 10, 60_000);
  if (!rateLimit.allowed) {
    auditLog("rate_limited", { clientIp });
    return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  try {
    const translated = await translateJson(parsed.data.data, 20_000);
    auditLog("success", { clientIp });
    return NextResponse.json({ ok: true, data: translated });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    auditLog("error", { clientIp, reason });

    if (reason === "TRANSLATE_TIMEOUT") return NextResponse.json({ ok: false, error: "Çeviri zaman aşımına uğradı." }, { status: 504 });
    if (reason === "AI_PROVIDER_DISABLED") return NextResponse.json({ ok: false, error: "AI sağlayıcısı devre dışı. AI Ayarları'ndan yapılandırın." }, { status: 500 });
    if (reason === "AI_API_KEY_MISSING") return NextResponse.json({ ok: false, error: "API anahtarı eksik. AI Ayarları'ndan girin." }, { status: 500 });

    return NextResponse.json({ ok: false, error: "Çeviri başarısız oldu." }, { status: 500 });
  }
}
