import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { contentBlockSchema } from "@/lib/cms/content-schema";
import { listContentBlocks, upsertContentBlock } from "@/lib/cms/content";

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  return apiOk({ blocks: await listContentBlocks() });
}

export async function PATCH(request: Request) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN", "EDITOR"]);
  if (!authorized.ok) return authorized.response;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = contentBlockSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid content payload.", 400, parsed.error.flatten());
  }

  const block = await upsertContentBlock({
    ...parsed.data,
    data: parsed.data.data as Prisma.InputJsonValue,
    publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
  });

  revalidatePath("/tr", "page");
  revalidatePath("/en", "page");

  return apiOk({ block });
}
