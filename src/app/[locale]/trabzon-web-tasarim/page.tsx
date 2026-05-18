import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { TrabzonLandingSection } from "@/components/sections/trabzon/trabzon-landing";
import { trabzonWebTasarimContent } from "@/content/tr/trabzon-pages";

export const dynamic = "force-dynamic";

export default async function TrabzonWebTasarimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;

  return (
    <>
      <TopNav active="services" locale={resolvedLocale} />
      <TrabzonLandingSection
        content={trabzonWebTasarimContent}
        locale={resolvedLocale}
        relatedServiceSlug={{ tr: "web-tasarim", en: "web-design" }}
      />
      <Footer locale={resolvedLocale} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "trabzonWebTasarim");
}
