import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { requireAdminSession } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { AdminCaseStudiesPageSections } from "@/components/sections/admin/case-studies/admin-case-studies-page";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const session = await requireAdminSession();
  if (!session) notFound();

  const rows = await prisma.caseStudy.findMany({
    orderBy: [{ locale: "asc" }, { client: "asc" }],
    select: { id: true, slug: true, locale: true, client: true, sector: true, duration: true, year: true, status: true, updatedAt: true },
  });

  const items = rows.map((r) => ({
    ...r,
    status: r.status as "DRAFT" | "PUBLISHED",
    updatedAt: r.updatedAt.toISOString(),
  }));

  return <AdminCaseStudiesPageSections initialItems={items} />;
}

export async function generateMetadata() {
  return { title: "Vaka Çalışmaları — Admin" };
}
