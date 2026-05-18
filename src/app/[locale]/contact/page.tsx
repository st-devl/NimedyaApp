import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { ContactPageSections } from "@/components/sections/contact/contact-page";
import { FaqSection } from "@/components/ui/faq-section";
import { CalendlyWidget } from "@/components/ui/calendly-widget";
import { getManagedContactContent } from "@/lib/cms/public-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { getSiteSettings } from "@/lib/cms/settings";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

const faqItems = {
  tr: [
    {
      question: "Trabzon'da yüz yüze görüşme yapabilir miyiz?",
      answer: "Evet, Trabzon'daki ofisimizde veya size uygun bir lokasyonda yüz yüze görüşme düzenleyebiliriz. İletişim formunu doldurduğunuzda sizinle en kısa sürede iletişime geçeceğiz.",
    },
    {
      question: "Mesaj gönderdikten sonra ne kadar sürede geri dönüş alırım?",
      answer: "Hafta içi mesai saatleri (09:00–18:00) içinde gönderilen mesajlara genellikle aynı gün veya en geç bir sonraki iş günü içinde dönüş yapıyoruz.",
    },
    {
      question: "Hangi hizmetler için teklif isteyebilirim?",
      answer: "Ürün fotoğrafçılığı, tanıtım filmi, marka kimliği, web tasarım ve özel yazılım geliştirme projelerinin tamamı için teklif alabilirsiniz. Formdaki hizmet alanını işaretlemeniz yeterlidir.",
    },
    {
      question: "Trabzon dışından da proje gönderebilir miyim?",
      answer: "Evet. Türkiye'nin her şehrinden ve yurt dışından müşteri kabul ediyoruz. Video konferans üzerinden keşif görüşmesi yaparak projeye başlayabiliriz.",
    },
  ],
  en: [
    {
      question: "Can we meet in person in Trabzon?",
      answer: "Yes, we can arrange an in-person meeting at our Trabzon office or a location convenient for you. After you fill in the contact form, we'll reach out as soon as possible.",
    },
    {
      question: "How soon will I hear back after sending a message?",
      answer: "We typically respond on the same day or by the next business day for messages sent during business hours (09:00–18:00) on weekdays.",
    },
    {
      question: "Which services can I request a quote for?",
      answer: "You can request a quote for all our services: product photography, promotional video, brand identity, web design and custom software development. Simply indicate the service in the form.",
    },
    {
      question: "Can I send a project from outside Trabzon?",
      answer: "Yes. We accept clients from across Turkey and internationally. We can start the project with a video conference discovery call.",
    },
  ],
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const [content, settings] = await Promise.all([
    getManagedContactContent(resolvedLocale),
    getSiteSettings(),
  ]);

  const faqs = faqItems[resolvedLocale];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: resolvedLocale === "tr" ? "Ana Sayfa" : "Home", item: `https://nimedya.com/${resolvedLocale}` },
      { "@type": "ListItem", position: 2, name: resolvedLocale === "tr" ? "İletişim" : "Contact", item: `https://nimedya.com/${resolvedLocale}/${resolvedLocale === "tr" ? "iletisim" : "contact"}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <TopNav active="contact" locale={resolvedLocale} />
      <main>
        <ContactPageSections content={content} locale={resolvedLocale} />
        {process.env.NEXT_PUBLIC_CALENDLY_URL && (
          <CalendlyWidget locale={resolvedLocale} url={process.env.NEXT_PUBLIC_CALENDLY_URL} />
        )}
        <FaqSection
          items={faqs}
          title={resolvedLocale === "tr" ? "İletişim Hakkında Sık Sorulan Sorular" : "Contact FAQ"}
        />
      </main>
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
