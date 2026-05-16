import { z } from "zod";
import { revalidatePath } from "next/cache";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";

const benefitSchema = z.object({ title: z.string(), description: z.string() });
const processStepSchema = z.object({ step: z.string(), description: z.string() });
const faqSchema = z.object({ question: z.string(), answer: z.string() });

const serviceDetailSchema = z.object({
  key: z.string().trim().min(1).max(60),
  locale: z.enum(["tr", "en"]),
  slug: z.string().trim().min(1).max(120),
  label: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(255),
  intro: z.string().trim().min(1),
  heroCta: z.string().trim().min(1).max(120),
  aboutTitle: z.string().trim().min(1).max(255),
  aboutLead: z.string().trim().min(1),
  aboutBody: z.string().trim().min(1),
  benefitsTitle: z.string().trim().min(1).max(255),
  benefits: z.array(benefitSchema).min(1),
  processTitle: z.string().trim().min(1).max(255),
  processSteps: z.array(processStepSchema).min(1),
  deliverablesTitle: z.string().trim().min(1).max(255),
  deliverables: z.array(z.string()).min(1),
  faqTitle: z.string().trim().min(1).max(255),
  faq: z.array(faqSchema).min(1),
  ctaTitle: z.string().trim().min(1).max(255),
  ctaSubtitle: z.string().trim().min(1),
  ctaButton: z.string().trim().min(1).max(120),
  image: z.string().trim().min(1).max(100),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const items = await prisma.serviceDetail.findMany({
    orderBy: [{ locale: "asc" }, { key: "asc" }],
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

  const parsed = serviceDetailSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid service detail payload.", 400, parsed.error.flatten());
  }

  const existing = await prisma.serviceDetail.findUnique({
    where: { key_locale: { key: parsed.data.key, locale: parsed.data.locale } },
  });
  if (existing) {
    return apiError("CONFLICT", "A service detail with this key and locale already exists.", 409);
  }

  const item = await prisma.serviceDetail.create({
    data: {
      ...parsed.data,
      status: parsed.data.status ?? "DRAFT",
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/tr/hizmetler", "page");
  revalidatePath("/en/services", "page");

  return apiOk({ item }, { status: 201 });
}
