import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { HowWeWorkPageSections } from "@/components/sections/how-we-work/how-we-work-page";
import { getManagedHowWeWorkContent } from "@/lib/cms/public-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export default async function NasilCalisiyoruzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const content = await getManagedHowWeWorkContent(resolvedLocale);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: resolvedLocale === "tr" ? "Ana Sayfa" : "Home", item: `https://nimedya.com/${resolvedLocale}` },
      { "@type": "ListItem", position: 2, name: resolvedLocale === "tr" ? "Nasıl Çalışıyoruz" : "How We Work", item: `https://nimedya.com/${resolvedLocale}/${resolvedLocale === "tr" ? "nasil-calisiyoruz" : "how-we-work"}` },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <TopNav locale={resolvedLocale} />
      <HowWeWorkPageSections content={content} locale={resolvedLocale} />
      <Footer locale={resolvedLocale} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "howWeWork");
}
