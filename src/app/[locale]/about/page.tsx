import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { AboutPageSections } from "@/components/sections/about/about-page";
import { getManagedAboutContent } from "@/lib/cms/public-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const content = await getManagedAboutContent(resolvedLocale);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: resolvedLocale === "tr" ? "Ana Sayfa" : "Home", item: `https://nimedya.com/${resolvedLocale}` },
      { "@type": "ListItem", position: 2, name: resolvedLocale === "tr" ? "Hakkımızda" : "About", item: `https://nimedya.com/${resolvedLocale}/${resolvedLocale === "tr" ? "hakkimizda" : "about"}` },
    ],
  };

  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://nimedya.com/#organization",
    name: "Nimedya",
    foundingDate: "2017",
    url: "https://nimedya.com",
    member: content.team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      ...(member.link ? { sameAs: member.link } : {}),
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <TopNav active="about" locale={resolvedLocale} />
      <AboutPageSections content={content} locale={resolvedLocale} />
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
  return buildManagedMetadata(locale, "about");
}
