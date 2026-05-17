import Image from "next/image";
import Link from "next/link";
import type { HomeContent, HomeServicesContent, HowWeWorkContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { imageManifest, resolveImageMeta } from "@/config/image-manifest";
import type { PublicSliderItem } from "@/lib/cms/public-content";
import { HeroSlider } from "@/components/sections/home/hero-slider";
import { BrandsSection } from "@/components/sections/home/brands-section";
import { FadeIn } from "@/components/ui/fade-in";
import { CountUp } from "@/components/ui/count-up";

type HomePageSectionsProps = {
  locale: Locale;
  content: HomeContent;
  sliderItems: PublicSliderItem[];
  sliderIntervalSeconds?: number;
  servicesContent: HomeServicesContent;
  howWeWorkContent: HowWeWorkContent;
};

export function HomePageSections({ locale, content, sliderItems, sliderIntervalSeconds, servicesContent, howWeWorkContent }: HomePageSectionsProps) {
  return (
    <main>
      {sliderItems.length > 0 ? (
        <HeroSlider items={sliderItems} intervalSeconds={sliderIntervalSeconds} />
      ) : (
        <section className="flex min-h-[calc(100vh-80px)] flex-col md:flex-row">
          <div className="w-full bg-[color:var(--app-bg)] px-6 py-[120px] md:w-1/2 md:px-20">
            <div className="max-w-xl">
              <h1 className="nmd-display-lg mb-6 text-[color:var(--primary)]">
                {content.heroTitleA} <br />
                <span className="text-[color:var(--secondary)]">{content.heroTitleB}</span>
              </h1>
              <p className="nmd-body-lg mb-10 text-[color:var(--app-muted)]">{content.heroText}</p>
              <div className="flex flex-wrap gap-4">
                <Link className="nmd-label-sm rounded-xl bg-[color:var(--primary)] px-10 py-5 text-[color:var(--on-primary)] nmd-transition hover:-translate-y-1 hover:opacity-90" href={localizedPath(locale, "contact")}>{content.ctaA}</Link>
                <Link className="nmd-label-sm rounded-xl border-2 border-[color:var(--primary)] px-10 py-5 text-[color:var(--primary)] nmd-transition hover:bg-[color:var(--primary)] hover:text-[color:var(--on-primary)]" href={localizedPath(locale, "portfolio")}>{content.ctaB}</Link>
              </div>
            </div>
          </div>
          <div className="relative min-h-[420px] w-full overflow-hidden md:w-1/2">
            <Image alt="Creative Studio" className="object-cover" fill priority quality={imageManifest.homeHero.quality} sizes={imageManifest.homeHero.sizes} src={imageManifest.homeHero.src} />
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="bg-[color:var(--primary)] py-20">
        <div className="nmd-container nmd-page-x">
          <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--on-primary)]/60">{content.statsTitle}</p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {content.stats.map((stat, i) => (
              <FadeIn delay={([0, 100, 200, 300] as const)[i] ?? 0} key={stat.label}>
                <div className="text-center">
                  <p className="text-4xl font-bold tracking-tight text-[color:var(--on-primary)] md:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-[color:var(--on-primary)]/70">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <BrandsSection brands={content.brands} brandsTitle={content.brandsTitle} />

      {/* Services */}
      <section className="nmd-container nmd-page-x py-[120px]">
        <div className="mb-16">
          <span className="nmd-label-sm uppercase tracking-widest text-[color:var(--secondary)]">{servicesContent.sectionLabel}</span>
          <h2 className="nmd-headline-xl mt-4 text-[color:var(--primary)]">{servicesContent.sectionTitle}</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group flex flex-col gap-8 rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-12 shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl md:col-span-2 md:flex-row md:items-center">
            <div className="md:w-1/2">
              <h3 className="nmd-headline-md mb-4 text-[color:var(--primary)]">{servicesContent.services[0].title}</h3>
              <p className="nmd-body-md text-[color:var(--app-muted)]">{servicesContent.services[0].description}</p>
            </div>
            {servicesContent.services[0].imageUrl && (
              <div className="relative h-64 overflow-hidden rounded-lg md:w-1/2">
                <Image alt={servicesContent.services[0].title} className="object-cover nmd-transition group-hover:scale-105" fill sizes="(min-width: 768px) 25vw, 100vw" src={resolveImageMeta(servicesContent.services[0].imageUrl, "(min-width: 768px) 25vw, 100vw").src} />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-10 shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl">
            <div>
              <h3 className="nmd-headline-md mb-4 text-[color:var(--primary)]">{servicesContent.services[1].title}</h3>
              <p className="nmd-body-md text-[color:var(--app-muted)]">{servicesContent.services[1].description}</p>
            </div>
            {servicesContent.services[1].cta && <span className="nmd-label-sm mt-8 text-[color:var(--secondary)]">{servicesContent.services[1].cta}</span>}
          </div>

          <div className="rounded-xl bg-[color:var(--primary)] p-10 text-[color:var(--on-primary)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl">
            <h3 className="nmd-headline-md mb-4">{servicesContent.services[2].title}</h3>
            <p className="nmd-body-md opacity-80">{servicesContent.services[2].description}</p>
          </div>

          <div className="flex flex-col overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--surface-container)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl md:col-span-2 md:flex-row">
            <div className="p-12 md:w-1/2">
              <h3 className="nmd-headline-md mb-4 text-[color:var(--primary)]">{servicesContent.services[3].title}</h3>
              <p className="nmd-body-md text-[color:var(--app-muted)]">{servicesContent.services[3].description}</p>
            </div>
            {servicesContent.services[3].imageUrl && (
              <div className="relative h-72 md:h-auto md:w-1/2">
                <Image alt={servicesContent.services[3].title} className="object-cover grayscale nmd-transition hover:grayscale-0" fill sizes="(min-width: 768px) 25vw, 100vw" src={resolveImageMeta(servicesContent.services[3].imageUrl, "(min-width: 768px) 25vw, 100vw").src} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-[color:var(--app-card)] py-[120px]">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-10 text-[color:var(--primary)]">{content.featured}</h2>
          {content.featuredProjects.length > 0 ? (
            <div className="space-y-6">
              {content.featuredProjects.map((project, index) => (
                <FadeIn delay={index === 0 ? 0 : index === 1 ? 100 : 200} key={project.title}>
                  <article className="group relative overflow-hidden rounded-2xl border border-[color:var(--app-border)]/30 bg-black shadow-lg">
                    <div className="relative h-[320px] md:h-[360px]">
                      <Image
                        alt={project.title}
                        className="object-cover opacity-75 nmd-transition duration-500 group-hover:scale-105 group-hover:opacity-60"
                        fill
                        quality={resolveImageMeta(project.image, "100vw").quality}
                        sizes="100vw"
                        src={resolveImageMeta(project.image, "100vw").src}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
                      <div className="absolute left-6 top-6 rounded-full border border-white/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 md:left-8 md:top-8">
                        {project.tag}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="grid items-end gap-4 md:grid-cols-[1fr_auto]">
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                              {locale === "tr" ? `Proje ${String(index + 1).padStart(2, "0")}` : `Project ${String(index + 1).padStart(2, "0")}`}
                            </p>
                            <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">{project.title}</h3>
                            <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">{project.description}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {project.metric && (
                              <span className="rounded-full bg-[color:var(--secondary)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--on-secondary)] shadow-md">
                                {project.metric}
                              </span>
                            )}
                            <Link
                              className="text-sm font-semibold text-white/90 nmd-transition hover:text-white"
                              href={localizedPath(locale, "portfolio")}
                            >
                              {locale === "tr" ? "Tümünü Gör →" : "View All →"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[color:var(--app-muted)]">{locale === "tr" ? "Henüz öne çıkan proje eklenmedi." : "No featured projects yet."}</p>
          )}
        </div>
      </section>

      {/* Testimonials */}
      {content.testimonials.length > 0 && (
        <section className="py-[120px]">
          <div className="nmd-container nmd-page-x">
            <h2 className="nmd-headline-xl mb-16 text-center text-[color:var(--primary)]">{content.testimonialsTitle}</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {content.testimonials.map((t, i) => (
                <FadeIn delay={([0, 100, 200] as const)[i] ?? 0} key={t.name}>
                  <article className="flex h-full flex-col rounded-2xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-8 shadow-sm">
                    <p className="mb-1 text-4xl font-bold leading-none text-[color:var(--secondary)]">&ldquo;</p>
                    <p className="nmd-body-md flex-1 text-[color:var(--app-text)]">{t.quote}</p>
                    <div className="mt-8 border-t border-[color:var(--app-border)]/40 pt-6">
                      <p className="text-sm font-semibold text-[color:var(--primary)]">{t.name}</p>
                      <p className="text-xs text-[color:var(--app-muted)]">{t.title} · {t.company}</p>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* References */}
      <section className="bg-[color:var(--surface-container)] py-[120px]">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-10 text-[color:var(--primary)]">{content.refs}</h2>
          {content.references.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              {content.references.map((reference, index) => (
                <article
                  className={`relative overflow-hidden rounded-2xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] ${
                    index === 0 ? "md:col-span-7" : "md:col-span-5"
                  }`}
                  key={reference.name}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-56 md:h-full">
                      <Image
                        alt={reference.name}
                        className="object-cover"
                        fill
                        quality={resolveImageMeta(reference.image, "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw").quality}
                        sizes={resolveImageMeta(reference.image, "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw").sizes}
                        src={resolveImageMeta(reference.image, "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw").src}
                      />
                    </div>
                    <div className="flex flex-col justify-between p-6 md:p-7">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--secondary)]">{reference.sector}</p>
                        <h3 className="mt-3 text-xl font-semibold text-[color:var(--primary)]">{reference.name}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-[color:var(--app-muted)]">&ldquo;{reference.summary}&rdquo;</p>
                      </div>
                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-[color:var(--outline)]">
                        {locale === "tr" ? "Uzun Dönem İş Ortağı" : "Long-Term Partner"}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[color:var(--app-muted)]">{locale === "tr" ? "Henüz referans eklenmedi." : "No references yet."}</p>
          )}
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-[color:var(--app-card)] py-[120px]">
        <div className="nmd-container nmd-page-x">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="nmd-label-sm uppercase tracking-widest text-[color:var(--secondary)]">{howWeWorkContent.pretitle}</span>
            <h2 className="nmd-headline-xl mt-4 text-[color:var(--primary)]">{howWeWorkContent.title}</h2>
            <p className="nmd-body-md mt-4 text-[color:var(--app-muted)]">{howWeWorkContent.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {howWeWorkContent.steps.map((step, i) => (
              <FadeIn delay={([0, 100, 200, 300, 400] as const)[i] ?? 0} key={step.number}>
                <div className="rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-bg)] p-6 shadow-sm">
                  <p className="mb-3 text-3xl font-bold text-[color:var(--secondary)]/30">{step.number}</p>
                  <h3 className="mb-2 text-sm font-semibold text-[color:var(--primary)]">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-[color:var(--app-muted)]">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              className="inline-flex rounded-xl bg-[color:var(--primary)] px-10 py-4 text-sm font-semibold text-[color:var(--on-primary)] nmd-transition hover:-translate-y-1 hover:opacity-90"
              href={localizedPath(locale, "contact")}
            >
              {howWeWorkContent.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
