import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { getAiSettings, upsertAiSettings } from "@/lib/cms/settings";
import { z } from "zod";

const aiSettingsSchema = z.object({
  aiProvider: z.enum(["disabled", "openai", "groq", "grok", "custom"]),
  aiApiKey: z.string().max(500).nullable().optional(),
  aiModel: z.string().max(100).min(1),
  aiBaseUrl: z.string().max(255).url().nullable().optional().or(z.literal("")),
});

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return NextResponse.json({ ok: false }, { status: 401 });

  const settings = await getAiSettings();
  return NextResponse.json({ ok: true, data: settings });
}

export async function POST(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return NextResponse.json({ ok: false }, { status: 401 });

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = aiSettingsSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const { aiProvider, aiApiKey, aiModel, aiBaseUrl } = parsed.data;
  await upsertAiSettings({
    aiProvider,
    aiApiKey: aiApiKey ?? null,
    aiModel,
    aiBaseUrl: aiBaseUrl || null,
  });

  return NextResponse.json({ ok: true });
}
