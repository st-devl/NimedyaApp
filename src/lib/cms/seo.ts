import { cache } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath, type RouteKey } from "@/lib/i18n/routes";
import { seoDefaults } from "@/lib/seo/defaults";
import { getSiteSettings } from "@/lib/cms/settings";

export type SeoPageView = {
  routeKey: RouteKey;
  locale: Locale;
  path: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageUrl: string | null;
  twitterCard: "summary" | "summary_large_image";
  noindex: boolean;
  nofollow: boolean;
  updatedAt: Date | null;
};

function toTwitterCard(value: string): "summary" | "summary_large_image" {
  return value === "SUMMARY" ? "summary" : "summary_large_image";
}

export const getSeoPage = cache(async (locale: Locale, routeKey: RouteKey): Promise<SeoPageView> => {
  const row = await prisma.seoPage.findUnique({
    where: { routeKey_locale: { routeKey, locale } },
    include: { ogImage: true, twitterImage: true },
  });

  if (row) {
    return {
      routeKey,
      locale,
      path: row.path,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      canonicalUrl: row.canonicalUrl,
      ogTitle: row.ogTitle,
      ogDescription: row.ogDescription,
      ogImageUrl: row.ogImage?.url ?? null,
      twitterTitle: row.twitterTitle,
      twitterDescription: row.twitterDescription,
      twitterImageUrl: row.twitterImage?.url ?? null,
      twitterCard: toTwitterCard(row.twitterCard),
      noindex: row.noindex,
      nofollow: row.nofollow,
      updatedAt: row.updatedAt,
    };
  }

  const fallback = seoDefaults[routeKey][locale];
  return {
    routeKey,
    locale,
    path: localizedPath(locale, routeKey),
    metaTitle: fallback.title,
    metaDescription: fallback.description,
    canonicalUrl: null,
    ogTitle: fallback.title,
    ogDescription: fallback.description,
    ogImageUrl: null,
    twitterTitle: fallback.title,
    twitterDescription: fallback.description,
    twitterImageUrl: null,
    twitterCard: "summary_large_image",
    noindex: routeKey.startsWith("admin"),
    nofollow: routeKey.startsWith("admin"),
    updatedAt: null,
  };
});

export async function listIndexedSeoPages() {
  return prisma.seoPage.findMany({
    where: { noindex: false },
    orderBy: [{ locale: "asc" }, { path: "asc" }],
    select: { locale: true, path: true, routeKey: true, updatedAt: true },
  });
}

function toAbsoluteUrl(url: string | null | undefined, baseUrl: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = baseUrl.replace(/\/$/, "");
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function buildManagedMetadata(locale: Locale, routeKey: RouteKey): Promise<Metadata> {
  const [settings, seo] = await Promise.all([getSiteSettings(), getSeoPage(locale, routeKey)]);
  const base = settings.baseUrl.replace(/\/$/, "");
  const canonical = seo.canonicalUrl || seo.path;

  const ogImageRaw = seo.ogImageUrl || settings.defaultOgImageUrl;
  const ogImageUrl = toAbsoluteUrl(ogImageRaw, base);
  const twitterImageUrl = toAbsoluteUrl(seo.twitterImageUrl, base) || ogImageUrl;

  const ogTitle = seo.ogTitle || seo.metaTitle;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    metadataBase: new URL(base),
    alternates: {
      canonical,
      languages: {
        tr: localizedPath("tr", routeKey),
        en: localizedPath("en", routeKey),
        "x-default": localizedPath("tr", routeKey),
      },
    },
    robots: {
      index: !seo.noindex && settings.robotsAllowIndex,
      follow: !seo.nofollow && settings.robotsAllowIndex,
    },
    openGraph: {
      title: ogTitle,
      description: seo.ogDescription || seo.metaDescription,
      url: `${base}${canonical.startsWith("/") ? canonical : `/${canonical}`}`,
      siteName: settings.siteName,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }]
        : undefined,
    },
    twitter: {
      card: seo.twitterCard,
      title: seo.twitterTitle || ogTitle,
      description: seo.twitterDescription || seo.ogDescription || seo.metaDescription,
      images: twitterImageUrl
        ? [{ url: twitterImageUrl, width: 1200, height: 630, alt: ogTitle }]
        : undefined,
    },
  };
}
