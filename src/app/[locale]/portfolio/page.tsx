import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { PortfolioPageSections } from "@/components/sections/portfolio/portfolio-page";
import { getManagedPortfolioContent } from "@/lib/cms/public-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const content = await getManagedPortfolioContent(resolvedLocale);

  return (
    <>
      <TopNav active="portfolio" locale={resolvedLocale} />
      <PortfolioPageSections content={content} />
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
  return buildPageMetadata(locale, "portfolio");
}
