import { z } from "zod";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";

const metricSchema = z.object({ value: z.string(), label: z.string() });
const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
});

const updateSchema = z.object({
  slug: z.string().trim().min(1).max(120).optional(),
  client: z.string().trim().min(1).max(190).optional(),
  sector: z.string().trim().min(1).max(120).optional(),
  duration: z.string().trim().min(1).max(80).optional(),
  year: z.string().trim().max(10).nullable().optional(),
  image: z.string().trim().min(1).max(255).optional(),
  challenge: z.string().trim().min(1).optional(),
  approach: z.string().trim().min(1).optional(),
  result: z.string().trim().min(1).optional(),
  scope: z.array(z.string()).min(1).optional(),
  services: z.array(z.string()).nullable().optional(),
  metrics: z.array(metricSchema).min(1).optional(),
  gallery: z.array(z.string()).nullable().optional(),
  testimonial: testimonialSchema.nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
}).refine((d) => Object.keys(d).length > 0, { message: "At least one field is required." });

function parseId(idStr: string): number | null {
  const n = parseInt(idStr, 10);
  return isNaN(n) || n < 1 ? null : n;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (!id) return apiError("BAD_REQUEST", "Invalid id.", 400);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = updateSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid payload.", 400, parsed.error.flatten());
  }

  const existing = await prisma.caseStudy.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Case study not found.", 404);

  const publishedAt =
    parsed.data.status === "PUBLISHED" && existing.status !== "PUBLISHED"
      ? new Date()
      : parsed.data.status === "DRAFT"
      ? null
      : undefined;

  const { services, gallery, testimonial, ...rest } = parsed.data;

  const item = await prisma.caseStudy.update({
    where: { id },
    data: {
      ...rest,
      ...(services !== undefined ? { services: services === null ? Prisma.JsonNull : services } : {}),
      ...(gallery !== undefined ? { gallery: gallery === null ? Prisma.JsonNull : gallery } : {}),
      ...(testimonial !== undefined ? { testimonial: testimonial === null ? Prisma.JsonNull : testimonial } : {}),
      ...(publishedAt !== undefined ? { publishedAt } : {}),
    },
  });

  revalidatePath("/tr/islerimiz", "page");
  revalidatePath("/en/portfolio", "page");
  revalidatePath(`/tr/islerimiz/${item.slug}`, "page");
  revalidatePath(`/en/portfolio/${item.slug}`, "page");

  return apiOk({ item });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (!id) return apiError("BAD_REQUEST", "Invalid id.", 400);

  const existing = await prisma.caseStudy.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Case study not found.", 404);

  await prisma.caseStudy.delete({ where: { id } });
  return apiOk({ deleted: true });
}
