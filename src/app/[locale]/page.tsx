import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { HomePageSections } from "@/components/sections/home/home-page";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getManagedHomeContent, getActiveSliderItems, getManagedHomeServicesContent, getManagedHowWeWorkContent } from "@/lib/cms/public-content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const [content, sliderItems, servicesContent, howWeWorkContent] = await Promise.all([
    getManagedHomeContent(resolvedLocale),
    getActiveSliderItems(resolvedLocale),
    getManagedHomeServicesContent(resolvedLocale),
    getManagedHowWeWorkContent(resolvedLocale),
  ]);

  return (
    <>
      <TopNav active="home" locale={resolvedLocale} />
      <HomePageSections content={content} howWeWorkContent={howWeWorkContent} locale={resolvedLocale} sliderItems={sliderItems} servicesContent={servicesContent} />
      <Footer locale={resolvedLocale} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "home");
}
