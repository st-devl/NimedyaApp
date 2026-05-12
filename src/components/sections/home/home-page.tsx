import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { imageManifest } from "@/config/image-manifest";

type HomePageSectionsProps = {
  locale: Locale;
  content: HomeContent;
};

export function HomePageSections({ locale, content }: HomePageSectionsProps) {
  return (
    <main>
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

      <section className="nmd-container nmd-page-x py-[120px]">
        <div className="mb-16">
          <span className="nmd-label-sm uppercase tracking-widest text-[color:var(--secondary)]">{content.sectionLabel}</span>
          <h2 className="nmd-headline-xl mt-4 text-[color:var(--primary)]">{content.sectionTitle}</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group flex flex-col gap-8 rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-12 shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl md:col-span-2 md:flex-row md:items-center">
            <div className="md:w-1/2">
              <h3 className="nmd-headline-md mb-4 text-[color:var(--primary)]">Profesyonel Fotografcilik</h3>
              <p className="nmd-body-md text-[color:var(--app-muted)]">Markanizin ruhunu yakalayan, yuksek produksiyonlu studyo ve dis cekimlerle hikayenizi gorsellestiriyoruz.</p>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg md:w-1/2">
              <Image alt="Photography" className="object-cover nmd-transition group-hover:scale-105" fill quality={imageManifest.serviceFeatured1.quality} sizes={imageManifest.serviceFeatured1.sizes} src={imageManifest.serviceFeatured1.src} />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-10 shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl">
            <div>
              <h3 className="nmd-headline-md mb-4 text-[color:var(--primary)]">Tanitim Filmi</h3>
              <p className="nmd-body-md text-[color:var(--app-muted)]">Sinematik bakis acisiyla markanizi anlatan etkileyici video icerikler uretiyoruz.</p>
            </div>
            <span className="nmd-label-sm mt-8 text-[color:var(--secondary)]">KESFET</span>
          </div>

          <div className="rounded-xl bg-[color:var(--primary)] p-10 text-[color:var(--on-primary)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl">
            <h3 className="nmd-headline-md mb-4">Web Tasarim</h3>
            <p className="nmd-body-md text-[color:var(--primary-container)]">Kullanici deneyimi odakli, hizli ve modern web arayuzleri ile dijital yuzunuzu tasarliyoruz.</p>
          </div>

          <div className="flex flex-col overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--surface-container)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl md:col-span-2 md:flex-row">
            <div className="p-12 md:w-1/2">
              <h3 className="nmd-headline-md mb-4 text-[color:var(--primary)]">Marka Kimligi</h3>
              <p className="nmd-body-md text-[color:var(--app-muted)]">Logodan renk paletine markanizin tum gorsel dilini tutarli ve akilda kalici bicimde insa ediyoruz.</p>
            </div>
            <div className="relative h-72 md:h-auto md:w-1/2">
              <Image alt="Brand Identity" className="object-cover grayscale nmd-transition hover:grayscale-0" fill quality={imageManifest.portfolio3.quality} sizes={imageManifest.portfolio3.sizes} src={imageManifest.portfolio3.src} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--app-card)] py-[120px]">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-10 text-[color:var(--primary)]">{content.featured}</h2>
          {content.featuredProjects.length > 0 ? (
            <div className="space-y-6">
              {content.featuredProjects.map((project, index) => (
                <article className="group relative overflow-hidden rounded-2xl border border-[color:var(--app-border)]/30 bg-black shadow-lg" key={project.title}>
                  <div className="relative h-[320px] md:h-[360px]">
                    <Image
                      alt={project.title}
                      className="object-cover opacity-75 nmd-transition duration-500 group-hover:scale-105 group-hover:opacity-60"
                      fill
                      quality={imageManifest[project.image].quality}
                      sizes="100vw"
                      src={imageManifest[project.image].src}
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
                        <div className="text-sm font-semibold text-white/90">
                          {locale === "tr" ? "Case Study" : "Case Study"}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[color:var(--app-muted)]">Henuz one cikan proje eklenmedi.</p>
          )}
        </div>
      </section>

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
                        quality={imageManifest[reference.image].quality}
                        sizes={imageManifest[reference.image].sizes}
                        src={imageManifest[reference.image].src}
                      />
                    </div>
                    <div className="flex flex-col justify-between p-6 md:p-7">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--secondary)]">{reference.sector}</p>
                        <h3 className="mt-3 text-xl font-semibold text-[color:var(--primary)]">{reference.name}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-[color:var(--app-muted)]">“{reference.summary}”</p>
                      </div>
                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-[color:var(--outline)]">
                        {locale === "tr" ? "Uzun Donem Is Ortagi" : "Long-Term Partner"}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[color:var(--app-muted)]">Henuz referans eklenmedi.</p>
          )}
        </div>
      </section>

      <section className="bg-[color:var(--app-card)] py-[120px]">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-10 text-[color:var(--primary)]">{content.blog}</h2>
          {content.blogHighlights.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              <article className="group overflow-hidden rounded-2xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-bg)] shadow-sm md:col-span-7">
                <div className="relative h-72 overflow-hidden md:h-[420px]">
                  <Image
                    alt={content.blogHighlights[0].title}
                    className="object-cover nmd-transition duration-500 group-hover:scale-105"
                    fill
                    quality={imageManifest[content.blogHighlights[0].image].quality}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    src={imageManifest[content.blogHighlights[0].image].src}
                  />
                </div>
                <div className="space-y-4 p-7 md:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--secondary)]">{content.blogHighlights[0].category}</p>
                  <h3 className="text-2xl font-semibold leading-tight text-[color:var(--primary)] md:text-3xl">{content.blogHighlights[0].title}</h3>
                  <p className="nmd-body-md max-w-2xl text-[color:var(--app-muted)]">{content.blogHighlights[0].excerpt}</p>
                </div>
              </article>

              <div className="space-y-5 md:col-span-5">
                {content.blogHighlights.slice(1).map((post) => (
                  <article className="flex gap-4 rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--surface-container-low)] p-4 shadow-sm" key={post.title}>
                    <div className="relative h-24 w-28 flex-none overflow-hidden rounded-lg">
                      <Image
                        alt={post.title}
                        className="object-cover"
                        fill
                        quality={imageManifest[post.image].quality}
                        sizes="180px"
                        src={imageManifest[post.image].src}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--secondary)]">{post.category}</p>
                      <h3 className="line-clamp-2 text-base font-semibold leading-snug text-[color:var(--primary)]">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-[color:var(--app-muted)]">{post.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-[color:var(--app-muted)]">Henuz blog icerigi eklenmedi.</p>
          )}
        </div>
      </section>
    </main>
  );
}
