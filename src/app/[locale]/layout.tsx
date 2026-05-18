import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/cms/settings";
import { isLocale, locales } from "@/lib/i18n/config";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const settings = await getSiteSettings();
  const base = settings.baseUrl.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${base}/#organization`,
        name: settings.siteName,
        url: base,
        logo: settings.logoUrl ? `${base}${settings.logoUrl}` : undefined,
        image: settings.logoUrl ? `${base}${settings.logoUrl}` : undefined,
        email: settings.contactEmail ?? undefined,
        telephone: settings.contactPhone ?? undefined,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Trabzon",
          addressRegion: "Trabzon",
          addressCountry: "TR",
          ...(settings.contactLocation ? { streetAddress: settings.contactLocation } : {}),
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 41.0027,
          longitude: 39.7168,
        },
        areaServed: [
          { "@type": "City", name: "Trabzon" },
          { "@type": "AdministrativeArea", name: "Ortahisar, Trabzon" },
          { "@type": "AdministrativeArea", name: "Akçaabat, Trabzon" },
          { "@type": "AdministrativeArea", name: "Yomra, Trabzon" },
          { "@type": "AdministrativeArea", name: "Araklı, Trabzon" },
          { "@type": "AdministrativeArea", name: "Sürmene, Trabzon" },
          { "@type": "Country", name: "Türkiye" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        priceRange: "$$",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "tr" ? "Hizmetlerimiz" : "Our Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "tr" ? "Ürün Fotoğrafçılığı" : "Product Photography" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "tr" ? "Tanıtım Filmi & Marka Belgeseli" : "Promotional Film & Brand Documentary" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "tr" ? "Web Tasarım & E-Ticaret Geliştirme" : "Web Design & E-Commerce Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "tr" ? "Marka Kimliği & Logo Sistemi" : "Brand Identity & Logo System" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "tr" ? "Sosyal Medya İçerik Üretimi" : "Social Media Content Production" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "tr" ? "SEO & İçerik Stratejisi" : "SEO & Content Strategy" } },
          ],
        },
        sameAs: settings.socialLinks.map((item) => item.url).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: settings.siteName,
        url: base,
        publisher: { "@id": `${base}/#organization` },
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${base}/tr/islerimiz?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb]">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      {children}
      {settings.whatsappPhone && <WhatsAppButton locale={locale} phone={settings.whatsappPhone} />}
    </div>
  );
}
