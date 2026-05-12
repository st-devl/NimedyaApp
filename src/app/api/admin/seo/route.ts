import { Prisma } from "@prisma/client";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { seoPageSchema } from "@/lib/cms/seo-schema";
import { validateMediaReferences } from "@/lib/cms/media";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const [pages, media] = await Promise.all([
    prisma.seoPage.findMany({
      orderBy: [{ locale: "asc" }, { routeKey: "asc" }],
      include: { ogImage: true, twitterImage: true },
    }),
    prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, url: true, altText: true, originalName: true },
    }),
  ]);

  return apiOk({ pages, media });
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

  const parsed = seoPageSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid SEO payload.", 400, parsed.error.flatten());
  }

  const mediaReferencesValid = await validateMediaReferences([parsed.data.ogImageMediaId, parsed.data.twitterImageMediaId]);
  if (!mediaReferencesValid) {
    return apiError("BAD_REQUEST", "Selected media asset does not exist.", 400);
  }

  try {
    const page = await prisma.seoPage.upsert({
      where: { routeKey_locale: { routeKey: parsed.data.routeKey, locale: parsed.data.locale } },
      update: parsed.data,
      create: parsed.data,
    });

    return apiOk({ page });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return apiError("BAD_REQUEST", "SEO path already exists for this locale.", 400);
    }

    throw error;
  }
}
