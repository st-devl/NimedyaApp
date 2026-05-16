import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { ContactPageSections } from "@/components/sections/contact/contact-page";
import { getManagedContactContent } from "@/lib/cms/public-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { getSiteSettings } from "@/lib/cms/settings";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const [content, settings] = await Promise.all([
    getManagedContactContent(resolvedLocale),
    getSiteSettings(),
  ]);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${settings.baseUrl}/#local-business`,
    name: settings.siteName,
    url: settings.baseUrl,
    ...(settings.contactEmail && { email: settings.contactEmail }),
    ...(settings.contactPhone && { telephone: settings.contactPhone }),
    ...(settings.contactLocation && {
      address: {
        "@type": "PostalAddress",
        addressLocality: settings.contactLocation,
      },
    }),
    ...(settings.logoUrl && { image: `${settings.baseUrl.replace(/\/$/, "")}${settings.logoUrl}` }),
    sameAs: settings.socialLinks.map((l) => l.url).filter(Boolean),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <TopNav active="contact" locale={resolvedLocale} />
      <ContactPageSections content={content} locale={resolvedLocale} />
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
  return buildManagedMetadata(locale, "contact");
}
