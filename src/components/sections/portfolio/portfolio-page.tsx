"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { imageManifest, resolveImageMeta } from "@/config/image-manifest";

type PortfolioPageSectionsProps = {
  content: PortfolioContent;
  locale: Locale;
};

function caseStudyHref(locale: Locale, slug: string): string {
  const base = locale === "tr" ? "islerimiz" : "portfolio";
  return `/${locale}/${base}/${slug}`;
}

export function PortfolioPageSections({ content, locale }: PortfolioPageSectionsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const allLabel = locale === "tr" ? "Tümü" : "All";
  const categories = [allLabel, ...content.categories];

  const filtered = activeCategory === "" || activeCategory === allLabel
    ? content.projects
    : content.projects.filter((p) => p.category === activeCategory);

  const labels = {
    tr: { challenge: "Zorluk", approach: "Yaklaşımımız", result: "Sonuç", scope: "Kapsam", duration: "Süre", readCase: "Vaka Çalışmasını Oku →", viewProject: "Projeyi İncele →" },
    en: { challenge: "Challenge", approach: "Our Approach", result: "Outcome", scope: "Scope", duration: "Duration", readCase: "Read Case Study →", viewProject: "View Project →" },
  } as const;
  const t = labels[locale];

  const caseStudies = content.caseStudies ?? [];

  function projectDetailSlug(project: PortfolioContent["projects"][number]): string | null {
    const match = caseStudies.find((cs) => project.title.toLowerCase().includes(cs.client.toLowerCase()));
    return match?.slug ?? null;
  }

  return (
    <main>
      <section className="nmd-container nmd-page-x py-[120px]">
        <div className="mb-16 text-center">
          <h1 className="nmd-headline-xl text-[color:var(--primary)]">{content.title}</h1>
          <p className="nmd-body-lg mt-4 text-[color:var(--app-muted)]">{content.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isActive = category === allLabel ? activeCategory === "" : activeCategory === category;
              return (
                <button
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[color:var(--primary)] text-[color:var(--on-primary)]"
                      : "border border-[color:var(--app-border)] bg-[color:var(--app-card)] text-[color:var(--primary)] hover:bg-[color:var(--surface-container)]"
                  }`}
                  key={category}
                  onClick={() => setActiveCategory(category === allLabel ? "" : category)}
                  type="button"
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project, index) => {
              const detailSlug = projectDetailSlug(project);
              const img = resolveImageMeta(project.image, imageManifest.portfolio1.sizes);
              const card = (
                <>
                  <div className="relative h-64">
                    <Image
                      alt={project.title}
                      className="object-cover nmd-transition group-hover:scale-105"
                      fill
                      priority={index === 0}
                      quality={img.quality}
                      sizes={img.sizes}
                      src={img.src}
                    />
                  </div>
                  <div className="p-6">
                    {project.category && (
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--secondary)]">{project.category}</p>
                    )}
                    <h3 className="text-xl font-semibold text-[color:var(--primary)]">{project.title}</h3>
                    <p className="mt-2 text-sm text-[color:var(--app-muted)]">{project.description}</p>
                    {detailSlug && (
                      <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--secondary)] nmd-transition group-hover:gap-2">
                        {t.viewProject}
                      </p>
                    )}
                  </div>
                </>
              );

              return detailSlug ? (
                <Link
                  aria-label={`${project.title} ${locale === "tr" ? "vaka çalışmasını oku" : "case study"}`}
                  className="group block overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl"
                  href={caseStudyHref(locale, detailSlug)}
                  key={project.title}
                >
                  {card}
                </Link>
              ) : (
                <article
                  className="group overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl"
                  key={project.title}
                >
                  {card}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-sm text-[color:var(--app-muted)]">
            {locale === "tr" ? "Bu kategoride proje bulunamadı." : "No projects found in this category."}
          </p>
        )}
      </section>

      {/* Mid-page CTA */}
      <section className="bg-[color:var(--surface-container)] py-20">
        <div className="nmd-container nmd-page-x flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="nmd-headline-lg text-[color:var(--primary)]">
              {locale === "tr" ? "Projeniz için bir sonraki adımı atalım" : "Ready to start your next project?"}
            </h2>
            <p className="nmd-body-md mt-2 text-[color:var(--app-muted)]">
              {locale === "tr"
                ? "Her çalışma bir strateji görüşmesiyle başlar. Ücretsiz danışın."
                : "Every engagement starts with a strategy conversation. Let's talk — no commitment required."}
            </p>
          </div>
          <Link
            className="shrink-0 rounded-xl bg-[color:var(--primary)] px-10 py-4 text-sm font-semibold text-[color:var(--on-primary)] nmd-transition hover:-translate-y-1 hover:opacity-90"
            href={localizedPath(locale, "contact")}
          >
            {locale === "tr" ? "Projenizi Konuşalım" : "Start a Conversation"}
          </Link>
        </div>
      </section>

      {content.caseStudies && content.caseStudies.length > 0 && (
        <section className="bg-[color:var(--app-card)] py-[120px]">
          <div className="nmd-container nmd-page-x">
            <div className="mx-auto mb-20 max-w-3xl text-center">
              <h2 className="nmd-headline-xl text-[color:var(--primary)]">{content.caseStudiesTitle}</h2>
              {content.caseStudiesSubtitle && (
                <p className="nmd-body-lg mt-4 text-[color:var(--app-muted)]">{content.caseStudiesSubtitle}</p>
              )}
            </div>

            <div className="space-y-16">
              {content.caseStudies.map((cs, idx) => (
                <article
                  className="grid grid-cols-1 gap-10 overflow-hidden rounded-2xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-bg)] p-8 shadow-sm md:grid-cols-12 md:p-12"
                  key={cs.client}
                >
                  <div className="md:col-span-5">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        alt={cs.client}
                        className="object-cover"
                        fill
                        quality={resolveImageMeta(cs.image, "(min-width: 768px) 40vw, 100vw").quality}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        src={resolveImageMeta(cs.image, "(min-width: 768px) 40vw, 100vw").src}
                      />
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-[color:var(--app-border)]/40 p-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--app-muted)]">{t.duration}</p>
                        <p className="mt-1 text-sm font-semibold text-[color:var(--primary)]">{cs.duration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--app-muted)]">{t.scope}</p>
                        <p className="mt-1 text-sm font-semibold text-[color:var(--primary)]">{cs.scope.join(" · ")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--secondary)]">
                      {String(idx + 1).padStart(2, "0")} · {cs.sector}
                    </p>
                    <h3 className="nmd-headline-lg mt-3 text-[color:var(--primary)]">{cs.client}</h3>

                    <div className="mt-8 space-y-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">{t.challenge}</p>
                        <p className="nmd-body-md mt-2 text-[color:var(--app-text)]">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">{t.approach}</p>
                        <p className="nmd-body-md mt-2 text-[color:var(--app-text)]">{cs.approach}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">{t.result}</p>
                        <p className="nmd-body-md mt-2 text-[color:var(--app-text)]">{cs.result}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[color:var(--app-border)]/40 pt-6">
                      {cs.metrics.map((m) => (
                        <div className="text-center" key={m.label}>
                          <p className="text-2xl font-bold tracking-tight text-[color:var(--secondary)] md:text-3xl">{m.value}</p>
                          <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[color:var(--app-muted)]">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--secondary)] nmd-transition hover:gap-2"
                        href={caseStudyHref(locale, cs.slug)}
                      >
                        {locale === "tr" ? `${cs.client} Vaka Çalışmasını Oku →` : `Read ${cs.client} Case Study →`}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
