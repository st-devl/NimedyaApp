import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { FaqSection } from "@/components/ui/faq-section";
import { QuoteWidget } from "@/components/ui/quote-widget";
import { resolveImageMeta } from "@/config/image-manifest";
import type { ImageManifestKey } from "@/config/image-manifest";

export type TrabzonLandingContent = {
  label: string;
  h1: string;
  intro: string;
  ctaPrimary: string;
  heroBadge?: string;
  image: ImageManifestKey;
  localContext: {
    title: string;
    lead: string;
    body: string;
  };
  benefits: { title: string; description: string }[];
  benefitsTitle: string;
  process: { title: string; description: string }[];
  processTitle: string;
  deliverables: string[];
  deliverablesTitle: string;
  faqTitle: string;
  faq: { question: string; answer: string }[];
  ctaSection: { title: string; subtitle: string; button: string };
  serviceKey: string;
};

type Props = {
  locale: Locale;
  content: TrabzonLandingContent;
  relatedServiceSlug?: { tr: string; en: string };
};

export function TrabzonLandingSection({ locale, content, relatedServiceSlug }: Props) {
  const hero = resolveImageMeta(content.image, "(min-width: 1024px) 50vw, 100vw");
  const contactHref = `${localizedPath(locale, "contact")}?hizmet=${encodeURIComponent(content.h1)}`;
  const servicesHref = localizedPath(locale, "services");
  const relatedHref = relatedServiceSlug
    ? `/${locale}/${locale === "tr" ? "hizmetler" : "services"}/${relatedServiceSlug[locale]}`
    : servicesHref;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.h1,
    description: content.intro,
    provider: {
      "@type": "LocalBusiness",
      name: "Nimedya",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Trabzon",
        addressCountry: "TR",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Trabzon",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "tr" ? "Ana Sayfa" : "Home", item: `https://nimedya.com/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "tr" ? "Hizmetler" : "Services", item: `https://nimedya.com${servicesHref}` },
      { "@type": "ListItem", position: 3, name: content.h1 },
    ],
  };

  return (
    <main>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />

      {/* Hero */}
      <section className="flex min-h-[640px] flex-col md:flex-row">
        <div className="w-full bg-[color:var(--app-bg)] px-6 py-[100px] md:w-1/2 md:px-20 md:py-[120px]">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[color:var(--app-muted)]">
              <li>
                <Link className="nmd-transition hover:text-[color:var(--primary)]" href={`/${locale}`}>
                  {locale === "tr" ? "Ana Sayfa" : "Home"}
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link className="nmd-transition hover:text-[color:var(--primary)]" href={servicesHref}>
                  {locale === "tr" ? "Hizmetler" : "Services"}
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-[color:var(--primary)]">{content.h1}</li>
            </ol>
          </nav>

          {content.heroBadge && (
            <span className="mb-4 inline-block rounded-full bg-[color:var(--secondary)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--secondary)]">
              {content.heroBadge}
            </span>
          )}
          <span className="nmd-label-sm mb-4 block uppercase tracking-widest text-[color:var(--secondary)]">{content.label}</span>
          <h1 className="nmd-display-lg mb-6 text-[color:var(--primary)]">{content.h1}</h1>
          <p className="nmd-body-lg mb-10 max-w-xl text-[color:var(--app-muted)]">{content.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="nmd-label-sm min-h-[48px] rounded-xl bg-[color:var(--secondary)] px-10 py-4 text-[color:var(--on-secondary)] nmd-transition hover:-translate-y-1 hover:opacity-90"
              href={contactHref}
            >
              {content.ctaPrimary}
            </Link>
            <Link
              className="nmd-label-sm min-h-[48px] rounded-xl border-2 border-[color:var(--primary)] px-10 py-4 text-[color:var(--primary)] nmd-transition hover:bg-[color:var(--primary)] hover:text-[color:var(--on-primary)]"
              href={relatedHref}
            >
              {locale === "tr" ? "Hizmet Detayları →" : "Service Details →"}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[420px] w-full md:w-1/2">
          <Image
            alt={content.h1}
            className="object-cover"
            fill
            priority
            quality={hero.quality}
            sizes={hero.sizes}
            src={hero.src}
          />
        </div>
      </section>

      {/* Local Context */}
      <section className="nmd-container nmd-page-x py-[100px] md:py-[120px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="nmd-headline-xl text-[color:var(--primary)]">{content.localContext.title}</h2>
          </div>
          <div className="md:col-span-7">
            <p className="nmd-body-lg mb-6 font-semibold text-[color:var(--primary)]">{content.localContext.lead}</p>
            <p className="nmd-body-md text-[color:var(--app-muted)]">{content.localContext.body}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[color:var(--app-card)] py-[100px] md:py-[120px]">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-16 text-[color:var(--primary)]">{content.benefitsTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {content.benefits.map((benefit, i) => (
              <article
                className="rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-bg)] p-8 shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl"
                key={benefit.title}
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--secondary)]/15 text-sm font-bold text-[color:var(--secondary)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[color:var(--primary)]">{benefit.title}</h3>
                <p className="nmd-body-md text-[color:var(--app-muted)]">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[color:var(--primary)] py-[100px] text-[color:var(--on-primary)] md:py-[120px]" id="process">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-16 text-[color:var(--on-primary)]">{content.processTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.process.map((step, i) => (
              <article className="rounded-xl border border-[color:var(--on-primary)]/15 bg-[color:var(--on-primary)]/5 p-8" key={step.title}>
                <p className="mb-4 text-3xl font-bold text-[color:var(--secondary)]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mb-3 text-lg font-semibold text-[color:var(--on-primary)]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[color:var(--on-primary)]/70">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="nmd-container nmd-page-x py-[100px] md:py-[120px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="nmd-headline-xl text-[color:var(--primary)]">{content.deliverablesTitle}</h2>
            <p className="nmd-body-md mt-4 text-[color:var(--app-muted)]">
              {locale === "tr"
                ? "Trabzon'daki her projede size teslim ettiğimiz somut çıktılar."
                : "Concrete deliverables we hand over in every Trabzon project."}
            </p>
          </div>
          <ul className="space-y-3 md:col-span-7">
            {content.deliverables.map((item) => (
              <li
                className="flex items-start gap-3 rounded-lg border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-4"
                key={item}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--secondary)] text-[10px] font-bold text-[color:var(--on-secondary)]">
                  ✓
                </span>
                <span className="nmd-body-md text-[color:var(--app-text)]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        items={content.faq}
        title={content.faqTitle}
      />

      {/* Inline Quote Form + CTA */}
      <section className="bg-[color:var(--primary)] py-24">
        <div className="nmd-container nmd-page-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <div className="text-[color:var(--on-primary)]">
              <h2 className="nmd-headline-xl mb-6">{content.ctaSection.title}</h2>
              <p className="nmd-body-lg mb-8 text-[color:var(--on-primary)]/70">{content.ctaSection.subtitle}</p>
              <ul className="space-y-3 text-sm text-[color:var(--on-primary)]/80">
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--secondary)] text-[10px] font-bold text-[color:var(--on-secondary)]">✓</span>
                  {locale === "tr" ? "48 saat içinde yanıt" : "Response within 48 hours"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--secondary)] text-[10px] font-bold text-[color:var(--on-secondary)]">✓</span>
                  {locale === "tr" ? "Ücretsiz keşif görüşmesi" : "Free discovery call"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--secondary)] text-[10px] font-bold text-[color:var(--on-secondary)]">✓</span>
                  {locale === "tr" ? "Trabzon'da yüz yüze görüşme imkânı" : "In-person meetings available"}
                </li>
              </ul>
            </div>
            <QuoteWidget
              locale={locale}
              preselectedService={content.serviceKey}
              subtitle={locale === "tr" ? "48 saat içinde geri dönüş garantisi." : "We respond within 48 hours."}
              title={content.ctaSection.button}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
