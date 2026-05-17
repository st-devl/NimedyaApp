import { z } from "zod";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";

const nullableShortText = z.union([z.literal(""), z.null(), z.string().trim().max(255)]).optional();

const updateSliderSchema = z.object({
  trTitle: z.string().trim().min(1).max(255).optional(),
  trDescription: z.string().trim().min(1).optional(),
  enTitle: z.string().trim().min(1).max(255).optional(),
  enDescription: z.string().trim().min(1).optional(),
  trPretitle: nullableShortText,
  enPretitle: nullableShortText,
  trBadge: nullableShortText,
  enBadge: nullableShortText,
  trBadgeSub: nullableShortText,
  enBadgeSub: nullableShortText,
  trCtaSecondary: nullableShortText,
  enCtaSecondary: nullableShortText,
  badgeIcon: nullableShortText,
  imageUrl: z.union([z.literal(""), z.null(), z.string().trim().url().max(500), z.string().trim().startsWith("/").max(500)]).optional(),
  linkUrl: z.union([z.literal(""), z.null(), z.string().trim().url().max(255), z.string().trim().startsWith("/").max(255)]).optional(),
  status: z.enum(["ACTIVE", "DRAFT"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
}).refine((d) => Object.keys(d).length > 0, {
  message: "At least one field is required.",
});

function parseId(idStr: string): number | null {
  const n = parseInt(idStr, 10);
  return isNaN(n) || n < 1 ? null : n;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (!id) return apiError("BAD_REQUEST", "Invalid slider item id.", 400);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = updateSliderSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid payload.", 400, parsed.error.flatten());
  }

  const existing = await prisma.sliderItem.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Slider item not found.", 404);

  const nullIfEmpty = (v: string | null | undefined) => (v === "" ? null : v);
  const data = {
    ...parsed.data,
    trPretitle: nullIfEmpty(parsed.data.trPretitle),
    enPretitle: nullIfEmpty(parsed.data.enPretitle),
    trBadge: nullIfEmpty(parsed.data.trBadge),
    enBadge: nullIfEmpty(parsed.data.enBadge),
    trBadgeSub: nullIfEmpty(parsed.data.trBadgeSub),
    enBadgeSub: nullIfEmpty(parsed.data.enBadgeSub),
    trCtaSecondary: nullIfEmpty(parsed.data.trCtaSecondary),
    enCtaSecondary: nullIfEmpty(parsed.data.enCtaSecondary),
    badgeIcon: nullIfEmpty(parsed.data.badgeIcon),
    ...(parsed.data.imageUrl === "" ? { imageUrl: null } : {}),
    ...(parsed.data.linkUrl === "" ? { linkUrl: null } : {}),
  };

  const item = await prisma.sliderItem.update({ where: { id }, data });
  return apiOk({ item });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (!id) return apiError("BAD_REQUEST", "Invalid slider item id.", 400);

  const existing = await prisma.sliderItem.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Slider item not found.", 404);

  await prisma.sliderItem.delete({ where: { id } });
  return apiOk({ deleted: true });
}
