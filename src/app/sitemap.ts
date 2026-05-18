import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { getSiteSettings } from "@/lib/cms/settings";
import { listIndexedSeoPages } from "@/lib/cms/seo";
import { routeMap, type RouteKey } from "@/lib/i18n/routes";
import { getServiceDetailsContent } from "@/content";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

const routeKeys = Object.keys(routeMap) as RouteKey[];

const trabzonRouteKeys: RouteKey[] = [
  "trabzonWebTasarim",
  "trabzonSeo",
  "trabzonFotografcilik",
  "trabzonTanitimFilmi",
  "trabzonKurumsalKimlik",
];

const highPriorityRouteKeys: RouteKey[] = ["home", "services", "contact", "portfolio", "about"];

function getRoutePriority(key: RouteKey): number {
  if (key === "home") return 1.0;
  if (trabzonRouteKeys.includes(key)) return 0.9;
  if (highPriorityRouteKeys.includes(key)) return 0.8;
  if (key === "blog" || key === "pricing") return 0.7;
  return 0.6;
}

function getRouteChangeFreq(key: RouteKey): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (key === "home") return "weekly";
  if (trabzonRouteKeys.includes(key)) return "monthly";
  if (highPriorityRouteKeys.includes(key)) return "weekly";
  return "monthly";
}

async function getServiceDetailUrls(siteUrl: string): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const base = locale === "tr" ? "hizmetler" : "services";
    const staticServices = getServiceDetailsContent(locale);

    try {
      const dbServices = await prisma.serviceDetail.findMany({
        where: { locale, status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      });

      const dbSlugs = new Set(dbServices.map((s) => s.slug));

      for (const dbService of dbServices) {
        entries.push({
          url: `${siteUrl}/${locale}/${base}/${dbService.slug}`,
          lastModified: dbService.updatedAt,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }

      for (const staticService of staticServices) {
        if (!dbSlugs.has(staticService.slug)) {
          entries.push({
            url: `${siteUrl}/${locale}/${base}/${staticService.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
          });
        }
      }
    } catch {
      for (const staticService of staticServices) {
        entries.push({
          url: `${siteUrl}/${locale}/${base}/${staticService.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  }

  return entries;
}

async function getCaseStudyUrls(siteUrl: string): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  try {
    const studies = await prisma.caseStudy.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, locale: true, updatedAt: true },
    });

    for (const study of studies) {
      const base = study.locale === "tr" ? "islerimiz" : "portfolio";
      entries.push({
        url: `${siteUrl}/${study.locale}/${base}/${study.slug}`,
        lastModified: study.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch {
    // DB unavailable — no case study URLs in fallback
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nimedya.com";

  try {
    const settings = await getSiteSettings();
    siteUrl = settings.baseUrl.replace(/\/$/, "");
  } catch {
    // Use env fallback
  }

  const [serviceDetailUrls, caseStudyUrls] = await Promise.all([
    getServiceDetailUrls(siteUrl),
    getCaseStudyUrls(siteUrl),
  ]);

  let dbPages: MetadataRoute.Sitemap = [];
  try {
    const pages = await listIndexedSeoPages();
    dbPages = pages
      .filter((page) => !page.routeKey.startsWith("admin"))
      .map((page) => ({
        url: `${siteUrl}${page.path}`,
        lastModified: page.updatedAt ?? new Date(),
        changeFrequency: getRouteChangeFreq(page.routeKey as RouteKey),
        priority: getRoutePriority(page.routeKey as RouteKey),
      }));
  } catch {
    // Fall through to static fallback
  }

  // Static fallback for all routeMap entries not covered by DB
  const dbPaths = new Set(dbPages.map((p) => p.url));
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    routeKeys
      .filter((key) => !key.startsWith("admin"))
      .flatMap((key) => {
        const slug = routeMap[key][locale];
        const path = slug ? `/${locale}/${slug}` : `/${locale}`;
        const url = `${siteUrl}${path}`;
        if (dbPaths.has(url)) return [];
        return [
          {
            url,
            lastModified: new Date(),
            changeFrequency: getRouteChangeFreq(key),
            priority: getRoutePriority(key),
          },
        ];
      }),
  );

  return [...dbPages, ...staticPages, ...serviceDetailUrls, ...caseStudyUrls];
}
