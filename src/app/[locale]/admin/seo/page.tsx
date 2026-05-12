import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { AdminSeoPageSections } from "@/components/sections/admin/seo/admin-seo-page";
import { hasAdminSession } from "@/lib/auth/admin-session";
import { prisma } from "@/lib/db/prisma";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export default async function AdminSeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isAuthenticated = await hasAdminSession();
  if (!isAuthenticated) {
    redirect(`/${locale}/admin/login`);
  }

  const [pages, media] = await Promise.all([
    prisma.seoPage.findMany({
      orderBy: [{ locale: "asc" }, { routeKey: "asc" }],
      select: {
        id: true,
        routeKey: true,
        locale: true,
        path: true,
        metaTitle: true,
        metaDescription: true,
        canonicalUrl: true,
        ogTitle: true,
        ogDescription: true,
        ogImageMediaId: true,
        twitterTitle: true,
        twitterDescription: true,
        twitterImageMediaId: true,
        twitterCard: true,
        noindex: true,
        nofollow: true,
      },
    }),
    prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, url: true, altText: true, originalName: true },
    }),
  ]);

  return <AdminSeoPageSections locale={locale as Locale} media={media} pages={pages as Parameters<typeof AdminSeoPageSections>[0]["pages"]} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata(locale, "adminSeo");
}
