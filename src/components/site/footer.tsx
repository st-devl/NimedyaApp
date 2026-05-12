import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { getSiteSettings } from "@/lib/cms/settings";
import Link from "next/link";

export async function Footer({ locale }: { locale: Locale }) {
  const settings = await getSiteSettings();
  const t = locale === "tr"
    ? {
        desc: "Markalar icin fotograf, video ve web odakli stratejik kreatif cozumler.",
        nav: "Site Haritasi",
        contact: "Iletisim",
        legal: "Yasal",
        rights: "Tum haklari saklidir.",
        policy: "Gizlilik",
        terms: "Kullanim",
        follow: "Bizi Takip Edin",
      }
    : {
        desc: "Strategic creative solutions focused on photography, video, and web for modern brands.",
        nav: "Sitemap",
        contact: "Contact",
        legal: "Legal",
        rights: "All rights reserved.",
        policy: "Privacy",
        terms: "Terms",
        follow: "Follow Us",
        ctaTitle: "Ready to build your next digital story?",
        ctaButton: "Start a Project",
      };

  const cta = locale === "tr"
    ? { title: "Yeni dijital hikayenizi birlikte kuralim", button: "Proje Baslatalim" }
    : { title: "Ready to build your next digital story?", button: "Start a Project" };

  return (
    <footer className="mt-0 border-t border-[color:var(--app-border)]/40 bg-[color:var(--primary)] text-[color:var(--on-primary)]">
      <div className="nmd-container nmd-page-x py-12">
        <div className="mb-10 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-transparent p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="text-2xl font-semibold tracking-tight md:text-3xl">{cta.title}</p>
            <Link
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--on-primary)] px-6 py-3 text-sm font-semibold text-[color:var(--primary)] nmd-transition hover:-translate-y-0.5 hover:opacity-90"
              href={localizedPath(locale, "contact")}
            >
              {cta.button}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-4">
            <p className="text-2xl font-bold tracking-tight">{settings.siteName}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--primary-container)]">{t.desc}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              {settings.socialLinks.filter((item) => item.url).map((item) => (
                <a className="rounded-full border border-white/30 px-3 py-1.5 hover:bg-white/10" href={item.url} key={item.label} rel="noreferrer" target="_blank">{item.label}</a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--primary-container)]">{t.nav}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link className="hover:opacity-80" href={localizedPath(locale, "home")}>{locale === "tr" ? "Anasayfa" : "Home"}</Link>
              <Link className="hover:opacity-80" href={localizedPath(locale, "services")}>{locale === "tr" ? "Hizmetler" : "Services"}</Link>
              <Link className="hover:opacity-80" href={localizedPath(locale, "portfolio")}>{locale === "tr" ? "Portfolyo" : "Portfolio"}</Link>
              <Link className="hover:opacity-80" href={localizedPath(locale, "about")}>{locale === "tr" ? "Hakkimizda" : "About"}</Link>
              <Link className="hover:opacity-80" href={localizedPath(locale, "contact")}>{locale === "tr" ? "Iletisim" : "Contact"}</Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--primary-container)]">{t.contact}</p>
            <div className="mt-4 space-y-2 text-sm">
              {settings.contactEmail ? <p>{settings.contactEmail}</p> : null}
              {settings.contactPhone ? <p>{settings.contactPhone}</p> : null}
              {settings.contactLocation ? <p>{settings.contactLocation}</p> : null}
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--primary-container)]">{t.follow}</p>
            <div className="mt-4 space-y-3 rounded-xl border border-white/15 bg-white/5 p-4 text-sm">
              <p className="font-semibold text-white/90">{locale === "tr" ? "Haftalik kreatif notlar" : "Weekly creative notes"}</p>
              <p className="text-white/70">
                {locale === "tr"
                  ? "Kisa strateji notlari, performans odakli fikirler ve ilham veren proje ozetleri."
                  : "Short strategy notes, performance-first ideas, and inspiring project summaries."}
              </p>
              <Link
                className="inline-flex text-sm font-semibold text-white underline underline-offset-4 hover:opacity-80"
                href={localizedPath(locale, "contact")}
              >
                {locale === "tr" ? "Abonelik talep et" : "Request subscription"}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-[color:var(--primary-container)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {settings.siteName}. {t.rights}</p>
          <div className="flex items-center gap-4">
            <span>{t.legal}</span>
            <Link className="hover:opacity-80" href={localizedPath(locale, "privacy")}>{t.policy}</Link>
            <Link className="hover:opacity-80" href={localizedPath(locale, "terms")}>{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
