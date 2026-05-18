import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { ServiceDetailSections } from "@/components/sections/services/service-detail-page";
import { getServiceDetailsContent } from "@/content";
import { getManagedServiceDetailsContent } from "@/lib/cms/public-content";
import { getSiteSettings } from "@/lib/cms/settings";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type RouteParams = { locale: string; slug: string };

export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({ params }: { params: Promise<RouteParams> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const services = await getManagedServiceDetailsContent(resolvedLocale);
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const base = resolvedLocale === "tr" ? "hizmetler" : "services";
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://nimedya.com/#organization",
      name: "Nimedya",
    },
    areaServed: [
      { "@type": "City", name: "Trabzon" },
      { "@type": "Country", name: "Türkiye" },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: resolvedLocale === "tr" ? "Ana Sayfa" : "Home", item: `https://nimedya.com/${resolvedLocale}` },
      { "@type": "ListItem", position: 2, name: resolvedLocale === "tr" ? "Hizmetler" : "Services", item: `https://nimedya.com/${resolvedLocale}/${base}` },
      { "@type": "ListItem", position: 3, name: service.title, item: `https://nimedya.com/${resolvedLocale}/${base}/${slug}` },
    ],
  };

  const faqSchema = service.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      {faqSchema && (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
          type="application/ld+json"
        />
      )}
      <TopNav active="services" locale={resolvedLocale} />
      <ServiceDetailSections content={service} locale={resolvedLocale} />
      <Footer locale={resolvedLocale} />
    </>
  );
}

export function generateStaticParams() {
  // Canonical EN URLs only (TR canonical lives under /hizmetler)
  return getServiceDetailsContent("en").map((service) => ({
    locale: "en",
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const [services, settings] = await Promise.all([
    getManagedServiceDetailsContent(locale as Locale),
    getSiteSettings(),
  ]);
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const trServices = await getManagedServiceDetailsContent("tr");
  const enServices = await getManagedServiceDetailsContent("en");
  const trService = trServices.find((s) => s.key === service.key);
  const enService = enServices.find((s) => s.key === service.key);

  const base = settings.baseUrl.replace(/\/$/, "");
  const canonicalPath =
    locale === "tr"
      ? `/tr/hizmetler/${trService?.slug ?? service.slug}`
      : `/en/services/${enService?.slug ?? service.slug}`;

  const ogImageUrl = settings.defaultOgImageUrl
    ? (settings.defaultOgImageUrl.startsWith("http") ? settings.defaultOgImageUrl : `${base}${settings.defaultOgImageUrl}`)
    : undefined;

  const titleSuffix = locale === "tr" ? " | Trabzon — Nimedya" : " in Trabzon | Nimedya";
  return {
    title: `${service.title}${titleSuffix}`,
    description: service.intro,
    metadataBase: new URL(base),
    alternates: {
      canonical: canonicalPath,
      languages: {
        tr: trService ? `/tr/hizmetler/${trService.slug}` : undefined,
        en: enService ? `/en/services/${enService.slug}` : undefined,
        "x-default": trService ? `/tr/hizmetler/${trService.slug}` : undefined,
      },
    },
    openGraph: {
      title: service.title,
      description: service.intro,
      url: `${base}${canonicalPath}`,
      siteName: settings.siteName,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: service.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.intro,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: service.title }] : undefined,
    },
  };
}
