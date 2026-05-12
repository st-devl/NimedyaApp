import type { Metadata } from "next";
import { env } from "@/config/env";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

export function buildLocaleMetadata(locale: Locale, title: string, description: string): Metadata {
  const baseUrl = new URL(env.NEXT_PUBLIC_SITE_URL);

  return {
    title,
    description,
    metadataBase: baseUrl,
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en", "x-default": `/${defaultLocale}` },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "Nimedya",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}
