import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { HomePageSections } from "@/components/sections/home/home-page";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getManagedHomeContent } from "@/lib/cms/public-content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const content = await getManagedHomeContent(resolvedLocale);

  return (
    <>
      <TopNav active="home" locale={resolvedLocale} />
      <HomePageSections content={content} locale={resolvedLocale} />
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
  return buildPageMetadata(locale, "home");
}
