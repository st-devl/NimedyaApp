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
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { value: "2017", label: locale === "tr" ? "Kuruluş Yılı" : "Founded" },
              { value: "200+", label: locale === "tr" ? "Tamamlanan Proje" : "Projects Completed" },
              { value: "4", label: locale === "tr" ? "Uzman Ekip" : "Core Specialists" },
            ].map((stat) => (
              <div className="text-center" key={stat.label}>
                <p className="text-3xl font-extrabold text-[color:var(--primary)]">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--app-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
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

      {/* Team */}
      {content.team.length > 0 && (
        <section className="nmd-container nmd-page-x py-[120px]">
          <h2 className="nmd-headline-xl mb-16 text-center text-[color:var(--primary)]">{content.teamTitle}</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {content.team.map((member) => (
              <article className="group rounded-2xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-8 shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-xl" key={member.name}>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--secondary)]/10 text-2xl font-bold text-[color:var(--secondary)]">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-[color:var(--primary)]">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--secondary)]">{member.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--app-muted)]">{member.bio}</p>
                {member.link && (
                  <a
                    aria-label={`${member.name} LinkedIn`}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--secondary)] nmd-transition hover:opacity-70"
                    href={member.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <svg fill="currentColor" height="14" viewBox="0 0 24 24" width="14"><path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.095v1.561h.046c.431-.815 1.482-1.675 3.049-1.675 3.261 0 3.863 2.147 3.863 4.939v6.627zM5.337 7.433a1.795 1.795 0 1 1 0-3.59 1.795 1.795 0 0 1 0 3.59zM6.951 20.452H3.722V9h3.229v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                    LinkedIn
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

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
            className="inline-flex min-h-[44px] items-center rounded-xl bg-[color:var(--on-primary)] px-10 py-4 text-sm font-semibold text-[color:var(--primary)] nmd-transition hover:-translate-y-1 hover:opacity-90"
            href={localizedPath(locale, "contact")}
          >
            {locale === "tr" ? "Projenizi Konuşalım" : "Start Your Project"}
          </Link>
        </div>
      </section>
    </main>
  );
}
