import { z } from "zod";
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

const caseStudySchema = z.object({
  slug: z.string().trim().min(1).max(120),
  locale: z.enum(["tr", "en"]),
  client: z.string().trim().min(1).max(190),
  sector: z.string().trim().min(1).max(120),
  duration: z.string().trim().min(1).max(80),
  year: z.string().trim().max(10).optional(),
  image: z.string().trim().min(1).max(255),
  challenge: z.string().trim().min(1),
  approach: z.string().trim().min(1),
  result: z.string().trim().min(1),
  scope: z.array(z.string()).min(1),
  services: z.array(z.string()).optional(),
  metrics: z.array(metricSchema).min(1),
  gallery: z.array(z.string()).optional(),
  testimonial: testimonialSchema.optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const items = await prisma.caseStudy.findMany({
    orderBy: [{ locale: "asc" }, { client: "asc" }],
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

  const parsed = caseStudySchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid case study payload.", 400, parsed.error.flatten());
  }

  const existing = await prisma.caseStudy.findUnique({
    where: { slug_locale: { slug: parsed.data.slug, locale: parsed.data.locale } },
  });
  if (existing) {
    return apiError("CONFLICT", "A case study with this slug and locale already exists.", 409);
  }

  const item = await prisma.caseStudy.create({
    data: {
      ...parsed.data,
      status: parsed.data.status ?? "DRAFT",
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/tr/portfolio", "page");
  revalidatePath("/en/portfolio", "page");

  return apiOk({ item }, { status: 201 });
}
