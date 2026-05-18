import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import type { HowWeWorkContent } from "@/types/content";

type HowWeWorkPageProps = {
  locale: Locale;
  content: HowWeWorkContent;
};

export function HowWeWorkPageSections({ locale, content }: HowWeWorkPageProps) {
  return (
    <main>
      <section className="nmd-container nmd-page-x py-[120px]">
        <div className="mb-20 max-w-3xl">
          <span className="nmd-label-sm uppercase tracking-widest text-[color:var(--secondary)]">{content.pretitle}</span>
          <h1 className="nmd-headline-xl mt-4 text-[color:var(--primary)]">{content.title}</h1>
          <p className="nmd-body-lg mt-6 text-[color:var(--app-muted)]">{content.subtitle}</p>
        </div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[22px] top-0 hidden h-full w-px bg-[color:var(--app-border)]/40 md:block" aria-hidden="true" />

          <ol className="space-y-12">
            {content.steps.map((step) => (
              <li className="group relative flex gap-8 md:gap-12" key={step.number}>
                {/* Step number bubble */}
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--primary)] bg-[color:var(--app-bg)] text-sm font-bold text-[color:var(--primary)] nmd-transition group-hover:bg-[color:var(--primary)] group-hover:text-[color:var(--on-primary)]">
                  {step.number}
                </div>
                <div className="pt-1.5 pb-2">
                  <h2 className="nmd-headline-md mb-3 text-[color:var(--primary)]">{step.title}</h2>
                  <p className="nmd-body-md max-w-2xl text-[color:var(--app-muted)]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 rounded-2xl bg-[color:var(--primary)] px-10 py-14 text-center">
          <h2 className="nmd-headline-lg mb-4 text-[color:var(--on-primary)]">
            {locale === "tr" ? "Projenizi birlikte hayata geçirelim." : "Let's bring your project to life together."}
          </h2>
          <p className="nmd-body-md mx-auto mb-8 max-w-xl text-[color:var(--on-primary)]/75">
            {locale === "tr"
              ? "İlk görüşme ücretsizdir. Markanız için doğru adımı birlikte belirleyelim."
              : "The first consultation is free. Let's determine the right step for your brand together."}
          </p>
          <Link
            className="inline-flex min-h-[44px] items-center rounded-lg bg-[color:var(--on-primary)] px-10 py-4 text-sm font-semibold text-[color:var(--primary)] nmd-transition hover:-translate-y-1 hover:opacity-90"
            href={localizedPath(locale, "contact")}
          >
            {content.ctaLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
