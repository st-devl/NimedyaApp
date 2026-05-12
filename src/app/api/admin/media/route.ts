import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { createMediaAsset, listMediaAssets } from "@/lib/cms/media";
import { storeImageFile, validateImageFile } from "@/lib/cms/media-storage";

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  return apiOk({ media: await listMediaAssets() });
}

export async function POST(request: Request) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN"]);
  if (!authorized.ok) return authorized.response;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be multipart form data.", 400);
  }

  const file = formData.get("file");
  const altText = formData.get("altText");
  if (!(file instanceof File)) {
    return apiError("BAD_REQUEST", "Image file is required.", 400);
  }

  const validation = validateImageFile(file);
  if (!validation.ok) {
    return apiError("BAD_REQUEST", validation.message, 400);
  }

  const stored = await storeImageFile(file);
  const media = await createMediaAsset({
    ...stored,
    altText: typeof altText === "string" && altText.trim() ? altText.trim().slice(0, 255) : null,
  });

  return apiOk({ media }, { status: 201 });
}
