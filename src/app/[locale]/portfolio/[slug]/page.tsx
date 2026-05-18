import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { PortfolioDetailSections } from "@/components/sections/portfolio/portfolio-detail-page";
import { getManagedCaseStudies } from "@/lib/cms/public-content";
import { getSiteSettings } from "@/lib/cms/settings";
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

  const base = resolvedLocale === "tr" ? "islerimiz" : "portfolio";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: resolvedLocale === "tr" ? "Ana Sayfa" : "Home", item: `https://nimedya.com/${resolvedLocale}` },
      { "@type": "ListItem", position: 2, name: resolvedLocale === "tr" ? "İşlerimiz" : "Portfolio", item: `https://nimedya.com/${resolvedLocale}/${base}` },
      { "@type": "ListItem", position: 3, name: caseStudy.client, item: `https://nimedya.com/${resolvedLocale}/${base}/${slug}` },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
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
  const [caseStudies, settings] = await Promise.all([
    getManagedCaseStudies(locale as Locale),
    getSiteSettings(),
  ]);
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) return {};

  const base = settings.baseUrl.replace(/\/$/, "");
  const canonicalPath =
    locale === "tr"
      ? `/tr/islerimiz/${caseStudy.slug}`
      : `/en/portfolio/${caseStudy.slug}`;

  const ogImageUrl = settings.defaultOgImageUrl
    ? (settings.defaultOgImageUrl.startsWith("http") ? settings.defaultOgImageUrl : `${base}${settings.defaultOgImageUrl}`)
    : undefined;

  const ogTitle = `${caseStudy.client} — ${caseStudy.sector} | Nimedya`;

  return {
    title: ogTitle,
    description: caseStudy.challenge,
    metadataBase: new URL(base),
    alternates: {
      canonical: canonicalPath,
      languages: {
        tr: `/tr/islerimiz/${caseStudy.slug}`,
        en: `/en/portfolio/${caseStudy.slug}`,
        "x-default": `/tr/islerimiz/${caseStudy.slug}`,
      },
    },
    openGraph: {
      title: ogTitle,
      description: caseStudy.challenge,
      url: `${base}${canonicalPath}`,
      siteName: settings.siteName,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "article",
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: caseStudy.challenge,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }] : undefined,
    },
  };
}
