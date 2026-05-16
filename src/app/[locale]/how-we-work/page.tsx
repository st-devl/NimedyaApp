import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { HowWeWorkPageSections } from "@/components/sections/how-we-work/how-we-work-page";
import { getManagedHowWeWorkContent } from "@/lib/cms/public-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export default async function HowWeWorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const content = await getManagedHowWeWorkContent(resolvedLocale);

  return (
    <>
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
