import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms/settings";

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nimedya.com";
  let allowIndex = true;

  try {
    const settings = await getSiteSettings();
    siteUrl = settings.baseUrl.replace(/\/$/, "");
    allowIndex = settings.robotsAllowIndex;
  } catch {
    // DB not available — use safe defaults
  }

  return {
    rules: {
      userAgent: "*",
      ...(allowIndex
        ? { allow: "/", disallow: ["/api/", "/tr/admin", "/en/admin"] }
        : { disallow: "/" }),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
