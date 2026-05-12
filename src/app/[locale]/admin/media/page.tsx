import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { AdminMediaPageSections } from "@/components/sections/admin/media/admin-media-page";
import { hasAdminSession } from "@/lib/auth/admin-session";
import { listMediaAssets } from "@/lib/cms/media";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";

export default async function AdminMediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isAuthenticated = await hasAdminSession();
  if (!isAuthenticated) {
    redirect(`/${locale}/admin/login`);
  }

  const media = await listMediaAssets();
  return <AdminMediaPageSections locale={locale as Locale} media={media} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "adminMedia");
}
