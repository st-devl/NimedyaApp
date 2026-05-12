import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { AdminSettingsPageSections } from "@/components/sections/admin/settings/admin-settings-page";
import { hasAdminSession } from "@/lib/auth/admin-session";
import { getSiteSettings } from "@/lib/cms/settings";
import { prisma } from "@/lib/db/prisma";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export default async function AdminSettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isAuthenticated = await hasAdminSession();
  if (!isAuthenticated) {
    redirect(`/${locale}/admin/login`);
  }

  const [settings, media] = await Promise.all([
    getSiteSettings(),
    prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, url: true, altText: true, originalName: true },
    }),
  ]);

  return <AdminSettingsPageSections locale={locale as Locale} media={media} settings={settings} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata(locale, "adminSettings");
}
