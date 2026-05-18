import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { TrabzonLandingSection } from "@/components/sections/trabzon/trabzon-landing";
import { trabzonFotografcilikContent } from "@/content/tr/trabzon-pages";

export const dynamic = "force-dynamic";

export default async function TrabzonFotografcilikPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;

  return (
    <>
      <TopNav active="services" locale={resolvedLocale} />
      <TrabzonLandingSection
        content={trabzonFotografcilikContent}
        locale={resolvedLocale}
        relatedServiceSlug={{ tr: "urun-fotografciligi", en: "product-photography" }}
      />
      <Footer locale={resolvedLocale} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "trabzonFotografcilik");
}
