import Image from "next/image";
import Link from "next/link";
import type { ServiceDetailContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { resolveImageMeta } from "@/config/image-manifest";
import { QuoteWidget } from "@/components/ui/quote-widget";
import { TestimonialsStrip } from "@/components/ui/testimonials-strip";

const serviceTestimonials = {
  tr: {
    heading: "Müşterilerimiz Ne Diyor?",
    items: [
      {
        quote: "Nimedya ile çalışmak sürecin her aşamasında profesyonellik ve şeffaflık demek. Projeyi zamanında ve beklentilerin üzerinde teslim ettiler.",
        name: "Ahmet Yılmaz",
        title: "Genel Müdür",
        company: "Lunessa Home",
      },
      {
        quote: "Ürün görselleri ve web sitemiz için doğru adresteyiz. Yaratıcı yaklaşımları ve teknik bilgileri rakipsiz.",
        name: "Selin Kaya",
        title: "Pazarlama Direktörü",
        company: "Atlas Klinik",
      },
      {
        quote: "Trabzon'da bu kalitede kreatif hizmet bulmak gerçekten zordu. Nimedya ile tanışmak markamız için bir dönüm noktası oldu.",
        name: "Murat Demir",
        title: "Kurucu",
        company: "Mira Beauty",
      },
    ],
  },
  en: {
    heading: "What Our Clients Say",
    items: [
      {
        quote: "Working with Nimedya means professionalism and transparency at every stage of the process. They delivered the project on time and beyond expectations.",
        name: "Ahmet Yilmaz",
        title: "General Manager",
        company: "Lunessa Home",
      },
      {
        quote: "We've found the right partner for our product visuals and website. Their creative approach and technical knowledge are unmatched.",
        name: "Selin Kaya",
        title: "Marketing Director",
        company: "Atlas Clinic",
      },
      {
        quote: "Finding creative services of this quality in Trabzon was truly difficult. Meeting Nimedya was a turning point for our brand.",
        name: "Murat Demir",
        title: "Founder",
        company: "Mira Beauty",
      },
    ],
  },
} as const;

type ServiceDetailSectionsProps = {
  locale: Locale;
  content: ServiceDetailContent;
};

export function ServiceDetailSections({ locale, content }: ServiceDetailSectionsProps) {
  const hero = resolveImageMeta(content.image, "(min-width: 1024px) 50vw, 100vw");
  const contactHref = `${localizedPath(locale, "contact")}?hizmet=${encodeURIComponent(content.title)}`;
  const servicesHref = localizedPath(locale, "services");

  return (
    <main>
      {/* Hero */}
      <section className="flex min-h-[640px] flex-col md:flex-row">
        <div className="w-full bg-[color:var(--app-bg)] px-6 py-[100px] md:w-1/2 md:px-20 md:py-[120px]">
          <Link
            className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--app-muted)] nmd-transition hover:text-[color:var(--primary)]"
            href={servicesHref}
          >
            ← {locale === "tr" ? "Tüm Hizmetler" : "All Services"}
          </Link>
          <span className="nmd-label-sm mb-4 block uppercase tracking-widest text-[color:var(--secondary)]">{content.label}</span>
          <h1 className="nmd-display-lg mb-6 text-[color:var(--primary)]">{content.title}</h1>
          <p className="nmd-body-lg mb-10 max-w-xl text-[color:var(--app-muted)]">{content.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="nmd-label-sm inline-flex min-h-[44px] items-center rounded-xl bg-[color:var(--primary)] px-10 py-4 text-[color:var(--on-primary)] nmd-transition hover:-translate-y-1 hover:opacity-90"
              href={contactHref}
            >
              {content.heroCta}
            </Link>
            <a
              className="nmd-label-sm inline-flex min-h-[44px] items-center rounded-xl border-2 border-[color:var(--primary)] px-10 py-4 text-[color:var(--primary)] nmd-transition hover:bg-[color:var(--primary)] hover:text-[color:var(--on-primary)]"
              href="#process"
            >
              {locale === "tr" ? "Süreci İncele" : "See the Process"}
            </a>
          </div>
        </div>
        <div className="relative min-h-[420px] w-full md:w-1/2">
          <Image
            alt={content.title}
            className="object-cover"
            fill
            priority
            quality={hero.quality}
            sizes={hero.sizes}
            src={hero.src}
          />
        </div>
      </section>

      {/* About */}
      <section className="nmd-container nmd-page-x py-[100px] md:py-[120px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="nmd-headline-xl text-[color:var(--primary)]">{content.aboutTitle}</h2>
          </div>
          <div className="md:col-span-7">
            <p className="nmd-body-lg mb-6 font-semibold text-[color:var(--primary)]">{content.aboutLead}</p>
            <p className="nmd-body-md text-[color:var(--app-muted)]">{content.aboutBody}</p>
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
            {content.processSteps.map((step, i) => (
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
                ? "Her çalışma sonunda elinizde kalan somut çıktılar."
                : "What you actually take home at the end of an engagement."}
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
      <section className="bg-[color:var(--surface-container-low)] py-[100px] md:py-[120px]">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-12 text-[color:var(--primary)]">{content.faqTitle}</h2>
          <div className="mx-auto max-w-3xl space-y-3">
            {content.faq.map((item, i) => (
              <details
                className="group rounded-xl border border-[color:var(--app-border)]/40 bg-[color:var(--app-card)] p-6 shadow-sm"
                key={item.question}
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[color:var(--primary)] [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="text-2xl font-light text-[color:var(--secondary)] nmd-transition group-open:rotate-45">+</span>
                </summary>
                <p className="nmd-body-md mt-4 text-[color:var(--app-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsStrip heading={serviceTestimonials[locale].heading} items={[...serviceTestimonials[locale].items]} />

      {/* Final CTA + Inline Quote Form */}
      <section className="bg-[color:var(--primary)] py-24">
        <div className="nmd-container nmd-page-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <div className="text-[color:var(--on-primary)]">
              <h2 className="nmd-headline-xl mb-6">{content.ctaTitle}</h2>
              <p className="nmd-body-lg mb-8 text-[color:var(--on-primary)]/70">{content.ctaSubtitle}</p>
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
                  {locale === "tr" ? "Trabzon'da yüz yüze görüşme imkânı" : "In-person meetings available in Trabzon"}
                </li>
              </ul>
            </div>
            <QuoteWidget
              locale={locale}
              preselectedService={content.key}
              title={content.ctaButton}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
