import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { resolveImageMeta } from "@/config/image-manifest";

type PortfolioDetailSectionsProps = {
  locale: Locale;
  caseStudy: CaseStudy;
  related: CaseStudy[];
};

export function PortfolioDetailSections({ locale, caseStudy, related }: PortfolioDetailSectionsProps) {
  const hero = resolveImageMeta(caseStudy.image, "100vw");
  const portfolioHref = localizedPath(locale, "portfolio");

  const labels = {
    tr: {
      back: "← Tüm Çalışmalar",
      pretitle: "Vaka Çalışması",
      meta: {
        sector: "Sektör",
        duration: "Süre",
        year: "Yıl",
        scope: "Kapsam",
        services: "Hizmetler",
      },
      challenge: "Zorluk",
      approach: "Yaklaşımımız",
      result: "Sonuç",
      results: "Sonuç Metrikleri",
      gallery: "Çalışmadan Kareler",
      relatedTitle: "Diğer Vaka Çalışmaları",
      ctaTitle: "Benzer bir hikayeyi birlikte yazalım",
      ctaSubtitle: "Markanız için kreatif üretimden ölçülebilir sonuçlara giden yolu birlikte planlayalım. İlk görüşme ücretsiz.",
      ctaButton: "Projenizi Konuşalım",
      viewAll: "Tüm İşlerimizi Gör",
    },
    en: {
      back: "← All Work",
      pretitle: "Case Study",
      meta: {
        sector: "Sector",
        duration: "Duration",
        year: "Year",
        scope: "Scope",
        services: "Services",
      },
      challenge: "Challenge",
      approach: "Our Approach",
      result: "Outcome",
      results: "Result Metrics",
      gallery: "From the Project",
      relatedTitle: "Other Case Studies",
      ctaTitle: "Let's write a similar story together",
      ctaSubtitle: "From creative production to measurable outcomes — let's map the path for your brand. The first conversation is free.",
      ctaButton: "Start a Conversation",
      viewAll: "View All Work",
    },
  } as const;
  const t = labels[locale];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] w-full overflow-hidden">
        <Image
          alt={caseStudy.client}
          className="object-cover"
          fill
          priority
          quality={hero.quality}
          sizes="100vw"
          src={hero.src}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-20 md:pb-20">
          <div className="nmd-container">
            <Link
              className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 nmd-transition hover:text-white"
              href={portfolioHref}
            >
              {t.back}
            </Link>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--secondary)]">
              {t.pretitle} · {caseStudy.sector}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">{caseStudy.client}</h1>
          </div>
        </div>
      </section>

      {/* Project meta */}
      <section className="border-b border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] py-10">
        <div className="nmd-container nmd-page-x grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--app-muted)]">{t.meta.sector}</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--primary)]">{caseStudy.sector}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--app-muted)]">{t.meta.duration}</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--primary)]">{caseStudy.duration}</p>
          </div>
          {caseStudy.year && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--app-muted)]">{t.meta.year}</p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--primary)]">{caseStudy.year}</p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--app-muted)]">{t.meta.services}</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--primary)]">
              {(caseStudy.services ?? caseStudy.scope).join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="nmd-container nmd-page-x py-[100px] md:py-[120px]">
        <div className="mx-auto max-w-3xl">
          {[
            { num: "01", label: t.challenge, text: caseStudy.challenge, accent: "var(--secondary)" },
            { num: "02", label: t.approach, text: caseStudy.approach, accent: "var(--primary)" },
            { num: "03", label: t.result, text: caseStudy.result, accent: "var(--secondary)" },
          ].map((step, i) => (
            <div className="relative flex gap-6 pb-16 last:pb-0" key={step.num}>
              {/* Connector line */}
              {i < 2 && (
                <div
                  aria-hidden="true"
                  className="absolute left-6 top-14 bottom-0 w-px"
                  style={{ background: `color-mix(in srgb, ${step.accent} 20%, transparent)` }}
                />
              )}
              {/* Step badge */}
              <div
                className="relative z-10 mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xs font-bold tracking-[0.12em]"
                style={{ background: `color-mix(in srgb, ${step.accent} 12%, transparent)`, color: `var(--secondary)` }}
              >
                {step.num}
              </div>
              <div className="pt-2">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--secondary)]">{step.label}</p>
                <p className={i === 0 ? "text-xl font-semibold leading-relaxed text-[color:var(--primary)] md:text-2xl" : "nmd-body-lg text-[color:var(--app-text)]"}>
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-[color:var(--primary)] py-[100px] text-[color:var(--on-primary)]">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-16 text-center text-[color:var(--on-primary)]">{t.results}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {caseStudy.metrics.map((metric) => (
              <div className="text-center" key={metric.label}>
                <p className="text-5xl font-bold tracking-tight text-[color:var(--secondary)] md:text-6xl">{metric.value}</p>
                <p className="mt-3 text-sm font-medium uppercase tracking-wide text-[color:var(--on-primary)]/70">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="nmd-container nmd-page-x py-[100px] md:py-[120px]">
          <h2 className="nmd-headline-lg mb-12 text-[color:var(--primary)]">{t.gallery}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {caseStudy.gallery.map((image, i) => {
              const img = resolveImageMeta(image, "(min-width: 768px) 33vw, 100vw");
              return (
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[color:var(--surface-container)]" key={`${image}-${i}`}>
                  <Image
                    alt={`${caseStudy.client} — ${i + 1}`}
                    className="object-cover nmd-transition hover:scale-105"
                    fill
                    quality={img.quality}
                    sizes={img.sizes}
                    src={img.src}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="bg-[color:var(--surface-container-low)] py-[100px] md:py-[120px]">
          <div className="nmd-container nmd-page-x">
            <figure className="mx-auto max-w-3xl text-center">
              <p className="mb-6 text-6xl font-bold leading-none text-[color:var(--secondary)]">&ldquo;</p>
              <blockquote className="text-2xl font-medium leading-relaxed text-[color:var(--primary)] md:text-3xl">
                {caseStudy.testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 text-sm text-[color:var(--app-muted)]">
                <span className="font-semibold text-[color:var(--primary)]">{caseStudy.testimonial.author}</span>
                {caseStudy.testimonial.role && <span> · {caseStudy.testimonial.role}</span>}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Related case studies */}
      {related.length > 0 && (
        <section className="bg-[color:var(--app-card)] py-[100px] md:py-[120px]">
          <div className="nmd-container nmd-page-x">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <h2 className="nmd-headline-lg text-[color:var(--primary)]">{t.relatedTitle}</h2>
              <Link
                className="text-sm font-semibold text-[color:var(--secondary)] nmd-transition hover:gap-2"
                href={portfolioHref}
              >
                {t.viewAll} →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {related.map((other) => {
                const img = resolveImageMeta(other.image, "(min-width: 768px) 50vw, 100vw");
                const detailHref = locale === "tr" ? `/tr/islerimiz/${other.slug}` : `/en/portfolio/${other.slug}`;
                return (
                  <Link
                    className="group relative block overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-bg)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl"
                    href={detailHref}
                    key={other.slug}
                  >
                    <div className="relative h-72">
                      <Image
                        alt={other.client}
                        className="object-cover nmd-transition group-hover:scale-105"
                        fill
                        quality={img.quality}
                        sizes={img.sizes}
                        src={img.src}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{other.sector}</p>
                        <h3 className="text-2xl font-semibold text-white">{other.client}</h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-[color:var(--primary)] py-24">
        <div className="nmd-container nmd-page-x text-center">
          <h2 className="nmd-headline-xl mb-6 text-[color:var(--on-primary)]">{t.ctaTitle}</h2>
          <p className="nmd-body-lg mx-auto mb-10 max-w-2xl text-[color:var(--on-primary)]/70">{t.ctaSubtitle}</p>
          <Link
            className="inline-flex min-h-[44px] items-center rounded-xl bg-[color:var(--on-primary)] px-10 py-4 text-sm font-semibold text-[color:var(--primary)] nmd-transition hover:-translate-y-1 hover:opacity-90"
            href={localizedPath(locale, "contact")}
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
