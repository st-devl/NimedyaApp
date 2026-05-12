import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { requireAdminSession } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { AdminSliderPageSections } from "@/components/sections/admin/admin-slider-page";
import { buildManagedMetadata } from "@/lib/cms/seo";
import type { Metadata } from "next";
import type { SliderItem } from "@/components/sections/admin/slider/types";

export default async function AdminSliderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const session = await requireAdminSession();
  if (!session) notFound();

  const rows = await prisma.sliderItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const items: SliderItem[] = rows.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return <AdminSliderPageSections initialItems={items} locale={locale as Locale} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildManagedMetadata(locale as Locale, "adminSlider");
}
