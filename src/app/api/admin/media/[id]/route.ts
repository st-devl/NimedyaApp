import { z } from "zod";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { deleteMediaAssetRecord, getMediaAsset, updateMediaAssetAltText } from "@/lib/cms/media";
import { removeStoredFile } from "@/lib/cms/media-storage";

const updateMediaSchema = z.object({
  altText: z.union([z.literal(""), z.string().trim().max(255)]).transform((value) => value || null),
});

type MediaRouteContext = {
  params: Promise<{ id: string }>;
};

async function parseId(ctx: MediaRouteContext) {
  const { id } = await ctx.params;
  const mediaId = Number(id);
  return Number.isInteger(mediaId) && mediaId > 0 ? mediaId : null;
}

export async function PATCH(request: Request, ctx: MediaRouteContext) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN"]);
  if (!authorized.ok) return authorized.response;

  const mediaId = await parseId(ctx);
  if (!mediaId) return apiError("BAD_REQUEST", "Invalid media id.", 400);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = updateMediaSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid media payload.", 400, parsed.error.flatten());
  }

  const media = await updateMediaAssetAltText(mediaId, parsed.data.altText);
  return apiOk({ media });
}

export async function DELETE(request: Request, ctx: MediaRouteContext) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN"]);
  if (!authorized.ok) return authorized.response;

  const mediaId = await parseId(ctx);
  if (!mediaId) return apiError("BAD_REQUEST", "Invalid media id.", 400);

  const existing = await getMediaAsset(mediaId);
  if (!existing) return apiError("NOT_FOUND", "Media asset not found.", 404);

  await deleteMediaAssetRecord(mediaId);
  await removeStoredFile(existing.storagePath);

  return apiOk({ deleted: true });
}
