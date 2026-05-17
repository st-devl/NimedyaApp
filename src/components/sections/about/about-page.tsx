import Image from "next/image";
import Link from "next/link";
import type { AboutContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { imageManifest } from "@/config/image-manifest";
import { localizedPath } from "@/lib/i18n/routes";

type AboutPageSectionsProps = {
  content: AboutContent;
  locale: Locale;
};

export function AboutPageSections({ content, locale }: AboutPageSectionsProps) {
  return (
    <main>
      <section className="flex min-h-[820px] flex-col md:flex-row">
        <div className="w-full px-6 py-[120px] md:w-1/2 md:px-20">
          <span className="nmd-label-sm mb-4 block uppercase tracking-widest text-[color:var(--secondary)]">{content.pretitle}</span>
          <h1 className="nmd-display-lg mb-8 text-[color:var(--primary)]">{content.title}</h1>
          <p className="nmd-body-lg max-w-xl text-[color:var(--app-muted)]">{content.text}</p>
        </div>
        <div className="relative min-h-[420px] w-full md:w-1/2">
          <Image alt="Team" className="object-cover" fill priority quality={imageManifest.aboutHero.quality} sizes={imageManifest.aboutHero.sizes} src={imageManifest.aboutHero.src} />
        </div>
      </section>

      <section className="bg-[color:var(--app-card)] py-[120px]">
        <div className="nmd-container nmd-page-x grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="nmd-label-sm mb-4 block uppercase tracking-widest text-[color:var(--secondary)]">{content.positioningTitle}</span>
            <h2 className="nmd-headline-xl text-[color:var(--primary)]">{content.differentiatorsTitle}</h2>
          </div>
          <div className="md:col-span-7">
            <p className="nmd-body-lg mb-12 text-[color:var(--app-text)]">{content.positioning}</p>
            <ul className="space-y-8 border-l-2 border-[color:var(--secondary)]/30 pl-6">
              {content.differentiators.map((item, i) => (
                <li key={`${item.title}-${i}`}>
                  <h3 className="nmd-headline-md mb-2 text-[color:var(--primary)]">{item.title}</h3>
                  <p className="nmd-body-md text-[color:var(--app-muted)]">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--surface-container-low)] py-[120px]">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-16 text-center text-[color:var(--primary)]">{content.valuesTitle}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.values.map((item, i) => (
              <article className="rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-10 shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl" key={`${item.title}-${i}`}>
                <h3 className="nmd-headline-md mb-4 text-[color:var(--primary)]">{item.title}</h3>
                <p className="nmd-body-md text-[color:var(--app-muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-[color:var(--primary)] py-24">
        <div className="nmd-container nmd-page-x text-center">
          <p className="nmd-label-sm mb-4 uppercase tracking-widest text-[color:var(--on-primary)]/60">
            {locale === "tr" ? "Birlikte Üretelim" : "Let's Work Together"}
          </p>
          <h2 className="nmd-headline-xl mb-6 text-[color:var(--on-primary)]">
            {locale === "tr"
              ? "Markanız için doğru ekiple tanışın"
              : "Meet the right team for your brand"}
          </h2>
          <p className="nmd-body-lg mx-auto mb-10 max-w-xl text-[color:var(--on-primary)]/70">
            {locale === "tr"
              ? "Projenizi birlikte değerlendirelim. İlk görüşme ücretsiz ve taahhütsüzdür."
              : "Let's explore your project together. The first conversation is free and obligation-free."}
          </p>
          <Link
            className="inline-flex rounded-xl bg-[color:var(--on-primary)] px-10 py-4 text-sm font-semibold text-[color:var(--primary)] nmd-transition hover:-translate-y-1 hover:opacity-90"
            href={localizedPath(locale, "contact")}
          >
            {locale === "tr" ? "İletişime Geç" : "Get in Touch"}
          </Link>
        </div>
      </section>
    </main>
  );
}
