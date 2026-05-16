import { z } from "zod";
import { revalidatePath } from "next/cache";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";

const benefitSchema = z.object({ title: z.string(), description: z.string() });
const processStepSchema = z.object({ step: z.string(), description: z.string() });
const faqSchema = z.object({ question: z.string(), answer: z.string() });

const updateSchema = z.object({
  slug: z.string().trim().min(1).max(120).optional(),
  label: z.string().trim().min(1).max(120).optional(),
  title: z.string().trim().min(1).max(255).optional(),
  intro: z.string().trim().min(1).optional(),
  heroCta: z.string().trim().min(1).max(120).optional(),
  aboutTitle: z.string().trim().min(1).max(255).optional(),
  aboutLead: z.string().trim().min(1).optional(),
  aboutBody: z.string().trim().min(1).optional(),
  benefitsTitle: z.string().trim().min(1).max(255).optional(),
  benefits: z.array(benefitSchema).min(1).optional(),
  processTitle: z.string().trim().min(1).max(255).optional(),
  processSteps: z.array(processStepSchema).min(1).optional(),
  deliverablesTitle: z.string().trim().min(1).max(255).optional(),
  deliverables: z.array(z.string()).min(1).optional(),
  faqTitle: z.string().trim().min(1).max(255).optional(),
  faq: z.array(faqSchema).min(1).optional(),
  ctaTitle: z.string().trim().min(1).max(255).optional(),
  ctaSubtitle: z.string().trim().min(1).optional(),
  ctaButton: z.string().trim().min(1).max(120).optional(),
  image: z.string().trim().min(1).max(100).optional(),
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

  const existing = await prisma.serviceDetail.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Service detail not found.", 404);

  const publishedAt =
    parsed.data.status === "PUBLISHED" && existing.status !== "PUBLISHED"
      ? new Date()
      : parsed.data.status === "DRAFT"
      ? null
      : undefined;

  const item = await prisma.serviceDetail.update({
    where: { id },
    data: {
      ...parsed.data,
      ...(publishedAt !== undefined ? { publishedAt } : {}),
    },
  });

  revalidatePath("/tr/hizmetler", "page");
  revalidatePath("/en/services", "page");
  revalidatePath(`/tr/hizmetler/${item.slug}`, "page");
  revalidatePath(`/en/services/${item.slug}`, "page");

  return apiOk({ item });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (!id) return apiError("BAD_REQUEST", "Invalid id.", 400);

  const existing = await prisma.serviceDetail.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Service detail not found.", 404);

  await prisma.serviceDetail.delete({ where: { id } });
  return apiOk({ deleted: true });
}
