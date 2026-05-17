import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { ServicesPageSections } from "@/components/sections/services/services-page";
import { FaqSection } from "@/components/ui/faq-section";
import { getManagedServicesContent } from "@/lib/cms/public-content";
import { getServiceDetailsContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

const faqItems = {
  tr: [
    {
      question: "Trabzon'da ürün fotoğraf çekimi için ne kadar süre ayırmalıyım?",
      answer: "Standart bir ürün fotoğraf çekimi genellikle 1–2 iş günü sürer. Ürün sayısı ve istenilen kompozisyon çeşitliliğine göre süre değişebilir. Keşif görüşmesinde size özel bir plan oluştururuz.",
    },
    {
      question: "Trabzon'da tanıtım filmi yaptırmak ne kadar sürer?",
      answer: "Kurumsal tanıtım filmleri genellikle çekim + kurgu dahil 1–3 hafta sürer. Kapsamlı projeler (marka belgeseli, dizi içerik vb.) için daha uzun prodüksiyon takvimi öngörülebilir.",
    },
    {
      question: "Web tasarım ve yazılım hizmetleriniz Trabzon dışını kapsıyor mu?",
      answer: "Evet, web tasarım ve yazılım hizmetlerimiz Türkiye genelinde ve yurt dışı müşterilere de sunulmaktadır. Trabzon ve çevresindeki müşterilerimize yüz yüze toplantı imkânı sağlıyoruz.",
    },
    {
      question: "Proje başlamadan önce teklif alabilir miyim?",
      answer: "Evet. İletişim formunu doldurarak veya doğrudan arayarak ücretsiz keşif görüşmesi talep edebilirsiniz. Projenizi dinledikten sonra kapsamlı bir teklif hazırlarız.",
    },
    {
      question: "Hizmetleriniz için ön ödeme gerekiyor mu?",
      answer: "Projelerimizde genellikle başlangıçta belirli bir ön ödeme alınır; kalan tutar proje tesliminde tahsil edilir. Ödeme takvimi proje kapsamına göre birlikte belirlenir.",
    },
  ],
  en: [
    {
      question: "How long does a product photo shoot take in Trabzon?",
      answer: "A standard product photo shoot typically takes 1–2 business days. The duration varies based on the number of products and desired composition variety. We'll build a custom plan during your discovery call.",
    },
    {
      question: "How long does a promotional video production take?",
      answer: "Corporate promotional videos generally take 1–3 weeks including shooting and editing. Larger projects (brand documentaries, series content, etc.) may require a longer production timeline.",
    },
    {
      question: "Do your web design and software services cover areas outside Trabzon?",
      answer: "Yes, our web design and software services are available across Turkey and internationally. For clients in Trabzon and surrounding areas, we offer in-person meetings.",
    },
    {
      question: "Can I get a quote before starting a project?",
      answer: "Yes. You can request a free discovery call by filling out the contact form or calling us directly. After hearing about your project, we'll prepare a comprehensive quote.",
    },
    {
      question: "Is an upfront payment required for your services?",
      answer: "Our projects typically require a deposit upfront with the remainder due upon project delivery. The payment schedule is determined together based on project scope.",
    },
  ],
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const [content, serviceDetails] = await Promise.all([
    getManagedServicesContent(resolvedLocale),
    Promise.resolve(getServiceDetailsContent(resolvedLocale)),
  ]);

  const faqs = faqItems[resolvedLocale];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <TopNav active="services" locale={resolvedLocale} />
      <ServicesPageSections content={content} locale={resolvedLocale} serviceDetails={serviceDetails} />
      <FaqSection
        items={faqs}
        title={resolvedLocale === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      />
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
