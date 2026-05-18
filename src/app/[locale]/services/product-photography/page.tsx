import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { FaqSection } from "@/components/ui/faq-section";
import { getManagedProductPhotographyContent } from "@/lib/cms/public-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { localizedPath } from "@/lib/i18n/routes";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { imageManifest } from "@/config/image-manifest";

export const dynamic = 'force-dynamic';

const faqItems = {
  tr: [
    {
      question: "Trabzon'da ürün fotoğraf çekimi için stüdyonuz var mı?",
      answer: "Evet, Trabzon'da tam donanımlı bir stüdyomuz bulunmaktadır. Aynı zamanda ürünleri işyerinizde veya belirlediğiniz lokasyonda da çekebiliriz.",
    },
    {
      question: "Kaç ürün için fotoğraf çekimi yapabilirsiniz?",
      answer: "Tek bir üründen yüzlerce SKU'ya kadar her ölçekte çekim yapıyoruz. Büyük katalog projeleri için özel iş akışı ve teslim takvimi oluşturuyoruz.",
    },
    {
      question: "Fotoğraflar ne zaman teslim edilir?",
      answer: "Standart çekimlerde düzenlenmiş görseller 3–5 iş günü içinde teslim edilir. Acil projeler için ekspres teslim seçeneği de mevcuttur.",
    },
    {
      question: "Hangi formatlarda görsel teslim alabilirim?",
      answer: "JPEG, PNG, TIFF ve WebP formatlarında yüksek çözünürlüklü görseller teslim edilir. E-ticaret platformlarına (Trendyol, Hepsiburada, Amazon) özel boyut ve format ayarlaması yapılır.",
    },
  ],
  en: [
    {
      question: "Do you have a studio in Trabzon for product photography?",
      answer: "Yes, we have a fully equipped studio in Trabzon. We can also shoot products at your premises or a location of your choice.",
    },
    {
      question: "How many products can you photograph?",
      answer: "We handle shoots of any scale, from a single product to hundreds of SKUs. For large catalog projects, we create a custom workflow and delivery schedule.",
    },
    {
      question: "When will photos be delivered?",
      answer: "Edited visuals from standard shoots are delivered within 3–5 business days. Express delivery is also available for urgent projects.",
    },
    {
      question: "In what formats will I receive the images?",
      answer: "High-resolution images are delivered in JPEG, PNG, TIFF and WebP formats. We also handle size and format adjustments specific to e-commerce platforms (Trendyol, Hepsiburada, Amazon).",
    },
  ],
};

export default async function ProductPhotographyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  const t = await getManagedProductPhotographyContent(resolvedLocale);

  const faqs = faqItems[resolvedLocale];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: resolvedLocale === "tr" ? "Ürün Fotoğrafçılığı" : "Product Photography",
    description: resolvedLocale === "tr"
      ? "Trabzon'da profesyonel ürün fotoğrafçılığı — e-ticaret ve katalog için yüksek kaliteli görüntü paketi."
      : "Professional product photography in Trabzon — high-quality image packages for e-commerce and catalogues.",
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
      { "@type": "ListItem", position: 2, name: resolvedLocale === "tr" ? "Hizmetler" : "Services", item: `https://nimedya.com/${resolvedLocale}/${resolvedLocale === "tr" ? "hizmetler" : "services"}` },
      { "@type": "ListItem", position: 3, name: resolvedLocale === "tr" ? "Ürün Fotoğrafçılığı" : "Product Photography", item: `https://nimedya.com/${resolvedLocale}/${resolvedLocale === "tr" ? "hizmetler" : "services"}/product-photography` },
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

  const altHero = resolvedLocale === "tr"
    ? "Trabzon profesyonel ürün fotoğraf çekimi — Nimedya"
    : "Professional product photography in Trabzon — Nimedya";

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
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <TopNav active="services" locale={resolvedLocale} />
      <main>
        <section className="flex min-h-[820px] flex-col md:flex-row">
          <div className="w-full bg-[color:var(--app-bg)] px-6 py-[120px] md:w-1/2 md:px-20">
            <span className="nmd-label-sm mb-4 block uppercase tracking-widest text-[color:var(--secondary)]">{t.label}</span>
            <h1 className="nmd-display-lg mb-8 text-[color:var(--primary)]">{t.title}</h1>
            <p className="nmd-body-lg mb-10 max-w-xl text-[color:var(--app-muted)]">{t.desc}</p>
            <Link className="inline-block rounded-lg bg-[color:var(--secondary)] px-10 py-4 text-sm font-semibold text-white nmd-transition hover:-translate-y-1" href={localizedPath(resolvedLocale, "contact")}>{t.cta}</Link>
          </div>
          <div className="relative min-h-[420px] w-full md:w-1/2">
            <Image alt={altHero} className="object-cover" fill priority quality={imageManifest.productServiceHero.quality} sizes={imageManifest.productServiceHero.sizes} src={imageManifest.productServiceHero.src} />
          </div>
        </section>

        <section className="nmd-container nmd-page-x py-[120px]">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="nmd-headline-xl mb-6 text-[color:var(--primary)]">{t.aboutTitle}</h2>
              <p className="nmd-body-lg mb-6 text-[color:var(--app-muted)]">{resolvedLocale === "tr" ? "Nimedya olarak ürün fotoğrafçılığını sadece deklanşöre basmak olarak görmüyoruz." : "At Nimedya, we don't see product photography as simply pressing a shutter."}</p>
              <p className="nmd-body-md text-[color:var(--app-muted)]">{resolvedLocale === "tr" ? "Işığın matematiğini, kompozisyonun sanatıyla birleştiriyor; e-ticaret ve kataloglar için premium görüntü paketleri üretiyoruz." : "We combine the mathematics of light with the art of composition to produce premium image packages for e-commerce and catalogues."}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-6 md:col-start-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[color:var(--surface-container)]">
                <Image
                  alt={resolvedLocale === "tr" ? "Trabzon ürün fotoğrafçılığı — detay çekim" : "Product photography in Trabzon — detail shot"}
                  className="object-cover grayscale nmd-transition hover:grayscale-0"
                  fill
                  quality={imageManifest.serviceFeatured1.quality}
                  sizes={imageManifest.serviceFeatured1.sizes}
                  src={imageManifest.serviceFeatured1.src}
                />
              </div>
              <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-xl bg-[color:var(--surface-container)]">
                <Image
                  alt={resolvedLocale === "tr" ? "Trabzon ürün fotoğrafçılığı — lifestyle çekim" : "Product photography in Trabzon — lifestyle shot"}
                  className="object-cover grayscale nmd-transition hover:grayscale-0"
                  fill
                  quality={imageManifest.serviceFeatured2.quality}
                  sizes={imageManifest.serviceFeatured2.sizes}
                  src={imageManifest.serviceFeatured2.src}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[color:var(--primary)] py-[120px] text-white">
          <div className="nmd-container nmd-page-x">
            <div className="mb-16 text-center">
              <h2 className="nmd-headline-xl text-[color:var(--accent-light)]">{t.processTitle}</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {t.processSteps.map((step, idx) => (
                <article className="text-center" key={step}>
                  <div className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[color:var(--primary)] ${idx === 1 ? "bg-[color:var(--secondary)]" : "bg-[color:var(--primary-container)]"}`}>
                    <span className="text-2xl font-bold">0{idx + 1}</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold">{step}</h3>
                  <p className="nmd-body-md text-[color:var(--primary-container)]">{resolvedLocale === "tr" ? "Fikirden teslime disiplinli ve şeffaf bir süreç." : "A disciplined and transparent process from concept to delivery."}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <FaqSection
          items={faqs}
          title={resolvedLocale === "tr" ? "Ürün Fotoğrafçılığı Hakkında SSS" : "Product Photography FAQ"}
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
  return buildManagedMetadata(locale, "productPhotography");
}
