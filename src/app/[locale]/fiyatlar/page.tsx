import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { localizedPath } from "@/lib/i18n/routes";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pricingContent } from "@/content/pricing";

export const dynamic = "force-dynamic";

export default async function FiyatlarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const t = pricingContent[resolvedLocale];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: resolvedLocale === "tr" ? "Ana Sayfa" : "Home", item: `https://nimedya.com/${resolvedLocale}` },
      { "@type": "ListItem", position: 2, name: t.title, item: `https://nimedya.com/${resolvedLocale}/${resolvedLocale === "tr" ? "fiyatlar" : "pricing"}` },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <TopNav locale={resolvedLocale} />
      <main>
        {/* Hero */}
        <section className="nmd-container nmd-page-x py-[120px] text-center">
          <h1 className="nmd-headline-xl mb-4 text-[color:var(--primary)]">{t.title}</h1>
          <p className="nmd-body-lg mx-auto max-w-2xl text-[color:var(--app-muted)]">{t.subtitle}</p>
        </section>

        {/* Packages */}
        {t.categories.map((category) => (
          <section className="nmd-container nmd-page-x pb-20" key={category.title}>
            <div className="mb-10 flex items-center gap-3">
              <span aria-hidden="true" className="text-3xl">{category.icon}</span>
              <h2 className="nmd-headline-md text-[color:var(--primary)]">{category.title}</h2>
            </div>
            <div className="-mx-4 overflow-x-auto px-4 md:overflow-x-visible md:px-0">
            <div className="grid min-w-[640px] grid-cols-3 gap-6 md:min-w-0">
              {category.packages.map((pkg) => (
                <article
                  className={`relative flex flex-col rounded-2xl border p-8 ${
                    pkg.highlighted
                      ? "border-[color:var(--secondary)] bg-[color:var(--primary)] text-[color:var(--on-primary)] shadow-2xl"
                      : "border-[color:var(--app-border)]/30 bg-[color:var(--app-card)]"
                  }`}
                  key={pkg.name}
                >
                  {pkg.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--secondary)] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {resolvedLocale === "tr" ? "Popüler" : "Popular"}
                    </span>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold ${pkg.highlighted ? "text-white" : "text-[color:var(--primary)]"}`}>{pkg.name}</h3>
                    <p className={`mt-1 text-sm ${pkg.highlighted ? "text-white/70" : "text-[color:var(--app-muted)]"}`}>{pkg.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className={`text-3xl font-extrabold ${pkg.highlighted ? "text-white" : "text-[color:var(--primary)]"}`}>{pkg.price}</span>
                    <span className={`ml-2 text-sm ${pkg.highlighted ? "text-white/60" : "text-[color:var(--app-muted)]"}`}>/ {pkg.priceNote}</span>
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {pkg.features.map((feature) => (
                      <li className="flex items-start gap-2.5" key={feature}>
                        <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${pkg.highlighted ? "bg-[color:var(--secondary)] text-white" : "bg-[color:var(--secondary)]/15 text-[color:var(--secondary)]"}`}>✓</span>
                        <span className={`text-sm ${pkg.highlighted ? "text-white/85" : "text-[color:var(--app-muted)]"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    className={`flex min-h-[44px] items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold nmd-transition hover:-translate-y-0.5 ${
                      pkg.highlighted
                        ? "bg-[color:var(--secondary)] text-white hover:opacity-90"
                        : "border border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-[color:var(--on-primary)]"
                    }`}
                    href={localizedPath(resolvedLocale, "contact")}
                  >
                    {pkg.cta}
                  </Link>
                </article>
              ))}
            </div>
            </div>
          </section>
        ))}

        {/* Notes */}
        <section className="bg-[color:var(--surface-container)] py-16">
          <div className="nmd-container nmd-page-x">
            <h2 className="nmd-headline-sm mb-6 text-[color:var(--primary)]">{t.noteSectionTitle}</h2>
            <ul className="space-y-2">
              {t.notes.map((note) => (
                <li className="flex items-start gap-2 text-sm text-[color:var(--app-muted)]" key={note}>
                  <span aria-hidden="true" className="mt-0.5 text-[color:var(--secondary)]">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[color:var(--primary)] py-24 text-center">
          <div className="nmd-container nmd-page-x">
            <h2 className="nmd-headline-xl mb-4 text-[color:var(--on-primary)]">{t.ctaTitle}</h2>
            <p className="nmd-body-lg mx-auto mb-10 max-w-2xl text-[color:var(--on-primary)]/70">{t.ctaSubtitle}</p>
            <Link
              className="inline-flex min-h-[44px] items-center rounded-xl bg-[color:var(--secondary)] px-10 py-4 text-sm font-semibold text-white nmd-transition hover:-translate-y-1 hover:opacity-90"
              href={localizedPath(resolvedLocale, "contact")}
            >
              {t.ctaButton}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={resolvedLocale} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "pricing");
}
