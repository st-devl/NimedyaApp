import { z } from "zod";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";

const createSliderSchema = z.object({
  trTitle: z.string().trim().min(1).max(255),
  trDescription: z.string().trim().min(1),
  enTitle: z.string().trim().min(1).max(255),
  enDescription: z.string().trim().min(1),
  imageUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  linkUrl: z.string().trim().url().max(255).optional().or(z.literal("")),
  status: z.enum(["ACTIVE", "DRAFT"]).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const items = await prisma.sliderItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return apiOk({ items });
}

export async function POST(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = createSliderSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid slider payload.", 400, parsed.error.flatten());
  }

  const count = await prisma.sliderItem.count();
  const item = await prisma.sliderItem.create({
    data: {
      ...parsed.data,
      imageUrl: parsed.data.imageUrl || null,
      linkUrl: parsed.data.linkUrl || null,
      sortOrder: parsed.data.sortOrder ?? count,
    },
  });

  return apiOk({ item }, { status: 201 });
}
