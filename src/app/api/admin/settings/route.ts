import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { siteSettingsSchema } from "@/lib/cms/settings-schema";
import { getSiteSettings, upsertSiteSettings } from "@/lib/cms/settings";
import { validateMediaReferences } from "@/lib/cms/media";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const settings = await getSiteSettings();
  const media = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, url: true, altText: true, originalName: true },
  });

  return apiOk({ settings, media });
}

export async function PATCH(request: Request) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN"]);
  if (!authorized.ok) return authorized.response;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = siteSettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid site settings payload.", 400, parsed.error.flatten());
  }

  const mediaReferencesValid = await validateMediaReferences([
    parsed.data.logoMediaId,
    parsed.data.faviconMediaId,
    parsed.data.defaultOgMediaId,
  ]);
  if (!mediaReferencesValid) {
    return apiError("BAD_REQUEST", "Selected media asset does not exist.", 400);
  }

  await upsertSiteSettings(parsed.data);
  return apiOk({ settings: await getSiteSettings() });
}
