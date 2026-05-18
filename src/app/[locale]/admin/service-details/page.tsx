import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { requireAdminSession } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { AdminServiceDetailsPageSections } from "@/components/sections/admin/service-details/admin-service-details-page";

export const dynamic = "force-dynamic";

export default async function AdminServiceDetailsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const session = await requireAdminSession();
  if (!session) notFound();

  const rows = await prisma.serviceDetail.findMany({
    orderBy: [{ locale: "asc" }, { key: "asc" }],
    select: { id: true, key: true, locale: true, slug: true, label: true, title: true, status: true, updatedAt: true },
  });

  const items = rows.map((r) => ({
    ...r,
    status: r.status as "DRAFT" | "PUBLISHED",
    updatedAt: r.updatedAt.toISOString(),
  }));

  return <AdminServiceDetailsPageSections initialItems={items} />;
}

export async function generateMetadata() {
  return { title: "Service Details — Admin" };
}
