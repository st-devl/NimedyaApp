import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { getSiteSettings } from "@/lib/cms/settings";
import { listIndexedSeoPages } from "@/lib/cms/seo";
import { routeMap, type RouteKey } from "@/lib/i18n/routes";

const routeKeys = Object.keys(routeMap) as RouteKey[];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const siteUrl = settings.baseUrl.replace(/\/$/, "");

  try {
    const pages = await listIndexedSeoPages();
    return pages
      .filter((page) => !page.routeKey.startsWith("admin"))
      .map((page) => ({
        url: `${siteUrl}${page.path}`,
        lastModified: page.updatedAt,
        changeFrequency: "weekly",
        priority: page.routeKey === "home" ? 1 : 0.7,
      }));
  } catch {
    return locales.flatMap((locale) =>
      routeKeys.filter((key) => !key.startsWith("admin")).map((key) => {
        const slug = routeMap[key][locale];
        const path = slug ? `/${locale}/${slug}` : `/${locale}`;
        return {
          url: `${siteUrl}${path}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: key === "home" ? 1 : 0.7,
        };
      }),
    );
  }
}
