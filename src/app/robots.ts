import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms/settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const siteUrl = settings.baseUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      ...(settings.robotsAllowIndex ? { allow: "/", disallow: ["/api/", "/tr/admin", "/en/admin"] } : { disallow: "/" }),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
