import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { ServiceDetailSections } from "@/components/sections/services/service-detail-page";
import { getServiceDetailsContent } from "@/content";
import { getManagedServiceDetailsContent } from "@/lib/cms/public-content";
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

  return (
    <>
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
  const services = await getManagedServiceDetailsContent(locale as Locale);
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const trServices = await getManagedServiceDetailsContent("tr");
  const enServices = await getManagedServiceDetailsContent("en");
  const trService = trServices.find((s) => s.key === service.key);
  const enService = enServices.find((s) => s.key === service.key);

  return {
    title: service.title,
    description: service.intro,
    alternates: {
      languages: {
        tr: trService ? `/tr/hizmetler/${trService.slug}` : undefined,
        en: enService ? `/en/services/${enService.slug}` : undefined,
      },
    },
    openGraph: {
      title: service.title,
      description: service.intro,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}
