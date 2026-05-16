import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { ServicesPageSections } from "@/components/sections/services/services-page";
import { getManagedServicesContent } from "@/lib/cms/public-content";
import { getServiceDetailsContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const content = await getManagedServicesContent(resolvedLocale);
  const serviceDetails = getServiceDetailsContent(resolvedLocale);

  return (
    <>
      <TopNav active="services" locale={resolvedLocale} />
      <ServicesPageSections content={content} locale={resolvedLocale} serviceDetails={serviceDetails} />
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
  return buildManagedMetadata(locale, "services");
}
