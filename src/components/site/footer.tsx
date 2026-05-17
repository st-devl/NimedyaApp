import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { getSiteSettings } from "@/lib/cms/settings";
import Link from "next/link";

const translations = {
  tr: {
    desc: "Markalar için fotoğraf, video ve web odaklı stratejik kreatif çözümler.",
    ctaTitle: "Yeni dijital hikayenizi birlikte kuralım",
    ctaButton: "Proje Başlatalım",
    nav: "Site Haritası",
    navLinks: {
      home: "Ana Sayfa",
      services: "Hizmetler",
      portfolio: "Portfolyo",
      about: "Hakkımızda",
      contact: "İletişim",
    },
    contact: "İletişim",
    follow: "Çalışma Bilgileri",
    newsletterTitle: "Pazartesi – Cuma",
    newsletterDesc: "09:00 – 18:00 saatleri arasında aktifiz. Acil talepler için e-posta ile ulaşabilirsiniz.",
    newsletterCta: "E-posta gönder",
    legal: "Yasal",
    rights: "Tüm hakları saklıdır.",
    policy: "Gizlilik",
    terms: "Kullanım",
  },
  en: {
    desc: "Strategic creative solutions focused on photography, video, and web for modern brands.",
    ctaTitle: "Ready to build your next digital story?",
    ctaButton: "Start a Project",
    nav: "Sitemap",
    navLinks: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
    },
    contact: "Contact",
    follow: "Working Hours",
    newsletterTitle: "Monday – Friday",
    newsletterDesc: "We're active between 09:00 – 18:00. For urgent requests, reach us via email.",
    newsletterCta: "Send an email",
    legal: "Legal",
    rights: "All rights reserved.",
    policy: "Privacy",
    terms: "Terms",
  },
} as const satisfies Record<Locale, object>;

export async function Footer({ locale }: { locale: Locale }) {
  const settings = await getSiteSettings();
  const t = translations[locale];

  return (
    <footer className="mt-0 border-t border-[#001a2b]/10 bg-white text-[#001a2b] dark:border-white/10 dark:bg-[#07111f] dark:text-white">
      <div className="nmd-container nmd-page-x py-12">

        {/* CTA Banner */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-[#001a2b]/10 bg-gradient-to-r from-[#001a2b]/5 via-[#001a2b]/[0.03] to-transparent p-6 dark:border-white/20 dark:bg-none dark:bg-gradient-to-r dark:from-white/10 dark:via-white/5 dark:to-transparent md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="text-2xl font-semibold tracking-tight md:text-3xl">{t.ctaTitle}</p>
            <Link
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold nmd-transition hover:-translate-y-0.5 hover:opacity-90 bg-[#d9111e] text-white dark:bg-white dark:text-[#001a2b]"
              href={localizedPath(locale, "contact")}
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-12">

          {/* Brand col */}
          <div className="md:col-span-4">
            <p className="text-2xl font-bold tracking-tight">{settings.siteName}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#001a2b]/60 dark:text-white/70">{t.desc}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              {settings.socialLinks.filter((item) => item.url).map((item) => (
                <a
                  className="rounded-full border border-[#001a2b]/20 px-3 py-1.5 text-[#001a2b] nmd-transition hover:bg-[#001a2b]/5 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                  href={item.url}
                  key={item.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b90c17] dark:text-[#cae6ff]">{t.nav}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-[#001a2b]/75 dark:text-white">
              <Link className="nmd-transition hover:text-[#001a2b] dark:hover:opacity-80" href={localizedPath(locale, "home")}>{t.navLinks.home}</Link>
              <Link className="nmd-transition hover:text-[#001a2b] dark:hover:opacity-80" href={localizedPath(locale, "services")}>{t.navLinks.services}</Link>
              <Link className="nmd-transition hover:text-[#001a2b] dark:hover:opacity-80" href={localizedPath(locale, "portfolio")}>{t.navLinks.portfolio}</Link>
              <Link className="nmd-transition hover:text-[#001a2b] dark:hover:opacity-80" href={localizedPath(locale, "about")}>{t.navLinks.about}</Link>
              <Link className="nmd-transition hover:text-[#001a2b] dark:hover:opacity-80" href={localizedPath(locale, "contact")}>{t.navLinks.contact}</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b90c17] dark:text-[#cae6ff]">{t.contact}</p>
            <div className="mt-4 space-y-2 text-sm text-[#001a2b]/75 dark:text-white">
              {settings.contactEmail ? <p>{settings.contactEmail}</p> : null}
              {settings.contactPhone ? <p>{settings.contactPhone}</p> : null}
              {settings.contactLocation ? <p>{settings.contactLocation}</p> : null}
            </div>
          </div>

          {/* Working hours */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b90c17] dark:text-[#cae6ff]">{t.follow}</p>
            <div className="mt-4 space-y-3 rounded-xl border border-[#001a2b]/8 bg-[#001a2b]/[0.03] p-4 text-sm dark:border-white/15 dark:bg-white/5">
              <p className="font-semibold text-[#001a2b]/90 dark:text-white/90">{t.newsletterTitle}</p>
              <p className="text-[#001a2b]/60 dark:text-white/70">{t.newsletterDesc}</p>
              <a
                className="inline-flex text-sm font-semibold text-[#d9111e] underline underline-offset-4 nmd-transition hover:opacity-80 dark:text-white"
                href={settings.contactEmail ? `mailto:${settings.contactEmail}` : localizedPath(locale, "contact")}
              >
                {t.newsletterCta}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#001a2b]/10 pt-6 text-xs text-[#001a2b]/50 dark:border-white/15 dark:text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {settings.siteName}. {t.rights}</p>
          <div className="flex items-center gap-4">
            <span>{t.legal}</span>
            <Link className="nmd-transition hover:opacity-80" href={localizedPath(locale, "privacy")}>{t.policy}</Link>
            <Link className="nmd-transition hover:opacity-80" href={localizedPath(locale, "terms")}>{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
