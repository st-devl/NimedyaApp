import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { PortfolioDetailSections } from "@/components/sections/portfolio/portfolio-detail-page";
import { getManagedCaseStudies } from "@/lib/cms/public-content";
import { getPortfolioContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type RouteParams = { locale: string; slug: string };

export const dynamic = 'force-dynamic';

export default async function PortfolioDetailPage({ params }: { params: Promise<RouteParams> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const caseStudies = await getManagedCaseStudies(resolvedLocale);
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) notFound();

  const related = caseStudies.filter((c) => c.slug !== slug).slice(0, 2);

  return (
    <>
      <TopNav active="portfolio" locale={resolvedLocale} />
      <PortfolioDetailSections caseStudy={caseStudy} locale={resolvedLocale} related={related} />
      <Footer locale={resolvedLocale} />
    </>
  );
}

export function generateStaticParams() {
  const studies = getPortfolioContent("en").caseStudies ?? [];
  return studies.map((c) => ({ locale: "en", slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const caseStudies = await getManagedCaseStudies(locale as Locale);
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.client} — ${caseStudy.sector}`,
    description: caseStudy.challenge,
    alternates: {
      languages: {
        tr: `/tr/islerimiz/${caseStudy.slug}`,
        en: `/en/portfolio/${caseStudy.slug}`,
      },
    },
    openGraph: {
      title: `${caseStudy.client} — ${caseStudy.sector}`,
      description: caseStudy.challenge,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "article",
    },
  };
}
