import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/cms/settings";
import { isLocale, locales } from "@/lib/i18n/config";

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${settings.baseUrl}/#organization`,
        name: settings.siteName,
        url: settings.baseUrl,
        logo: settings.logoUrl ? `${settings.baseUrl.replace(/\/$/, "")}${settings.logoUrl}` : undefined,
        email: settings.contactEmail ?? undefined,
        telephone: settings.contactPhone ?? undefined,
        address: settings.contactLocation ?? undefined,
        sameAs: settings.socialLinks.map((item) => item.url).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${settings.baseUrl}/#website`,
        name: settings.siteName,
        url: settings.baseUrl,
        publisher: { "@id": `${settings.baseUrl}/#organization` },
        inLanguage: locale,
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
    </div>
  );
}
