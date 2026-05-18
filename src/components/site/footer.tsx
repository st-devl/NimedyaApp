import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { getSiteSettings } from "@/lib/cms/settings";
import { SocialIcon } from "@/lib/social-icons";
import Link from "next/link";
import Image from "next/image";

const translations = {
  tr: {
    desc: "Markalar için fotoğraf, video ve web odaklı stratejik kreatif çözümler.",
    ctaTitle: "Yeni dijital hikayenizi birlikte kuralım",
    ctaButton: "Proje Başlatalım",
    nav: "Sayfalar",
    navLinks: {
      home: "Ana Sayfa",
      services: "Hizmetler",
      portfolio: "Portfolyo",
      about: "Hakkımızda",
      contact: "İletişim",
      blog: "Blog",
      pricing: "Fiyatlar",
      howWeWork: "Nasıl Çalışıyoruz",
    },
    serviceLinks: "Hizmetler",
    serviceItems: [
      { label: "Ürün Fotoğrafçılığı", key: "productPhotography" as const },
      { label: "Trabzon Web Tasarım", key: "trabzonWebTasarim" as const },
      { label: "Trabzon SEO", key: "trabzonSeo" as const },
      { label: "Trabzon Tanıtım Filmi", key: "trabzonTanitimFilmi" as const },
      { label: "Marka Kimliği", key: "trabzonKurumsalKimlik" as const },
    ],
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
    nav: "Pages",
    navLinks: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
      blog: "Blog",
      pricing: "Pricing",
      howWeWork: "How We Work",
    },
    serviceLinks: "Services",
    serviceItems: [
      { label: "Product Photography", key: "productPhotography" as const },
      { label: "Web Design Trabzon", key: "trabzonWebTasarim" as const },
      { label: "SEO Trabzon", key: "trabzonSeo" as const },
      { label: "Video Production Trabzon", key: "trabzonTanitimFilmi" as const },
      { label: "Brand Identity Trabzon", key: "trabzonKurumsalKimlik" as const },
    ],
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

  // Always-dark footer: prefer white logo, fall back to dark logo, then text
  const logoSrc = settings.logoWhiteUrl ?? settings.logoUrl;

  return (
    <footer className="mt-0 border-t border-white/10 bg-[#07111f] text-white">
      <div className="nmd-container nmd-page-x py-12">

        {/* CTA Banner */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-white/8 via-white/4 to-transparent p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="text-2xl font-semibold tracking-tight md:text-3xl">{t.ctaTitle}</p>
            <Link
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white nmd-transition hover:-translate-y-0.5 hover:opacity-90"
              href={localizedPath(locale, "contact")}
              style={{ background: "linear-gradient(135deg,#d9111e,#8b0a12)" }}
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-12">

          {/* Brand col */}
          <div className="md:col-span-3">
            {logoSrc ? (
              <Image
                alt={settings.siteName}
                className="mb-4 h-10 w-auto object-contain"
                height={40}
                src={logoSrc}
                width={200}
              />
            ) : (
              <p className="mb-4 text-2xl font-bold tracking-tight">{settings.siteName}</p>
            )}
            <p className="max-w-xl text-sm leading-relaxed text-white/65">{t.desc}</p>
            {settings.socialLinks.filter((item) => item.url).length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {settings.socialLinks.filter((item) => item.url).map((item) => (
                  <a
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/8 text-white nmd-transition hover:border-white/60 hover:bg-white/18"
                    href={item.url}
                    key={item.label}
                    rel="noreferrer"
                    target="_blank"
                    title={item.label}
                  >
                    <SocialIcon label={item.label} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#cae6ff]">{t.nav}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              <Link className="nmd-transition hover:text-white" href={localizedPath(locale, "home")}>{t.navLinks.home}</Link>
              <Link className="nmd-transition hover:text-white" href={localizedPath(locale, "services")}>{t.navLinks.services}</Link>
              <Link className="nmd-transition hover:text-white" href={localizedPath(locale, "portfolio")}>{t.navLinks.portfolio}</Link>
              <Link className="nmd-transition hover:text-white" href={localizedPath(locale, "about")}>{t.navLinks.about}</Link>
              <Link className="nmd-transition hover:text-white" href={localizedPath(locale, "howWeWork")}>{t.navLinks.howWeWork}</Link>
              <Link className="nmd-transition hover:text-white" href={localizedPath(locale, "blog")}>{t.navLinks.blog}</Link>
              <Link className="nmd-transition hover:text-white" href={localizedPath(locale, "pricing")}>{t.navLinks.pricing}</Link>
              <Link className="nmd-transition hover:text-white" href={localizedPath(locale, "contact")}>{t.navLinks.contact}</Link>
            </div>
          </div>

          {/* Service links */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#cae6ff]">{t.serviceLinks}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              {t.serviceItems.map((item) => (
                <Link className="nmd-transition hover:text-white" href={localizedPath(locale, item.key)} key={item.key}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#cae6ff]">{t.contact}</p>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {settings.contactEmail ? <p>{settings.contactEmail}</p> : null}
              {settings.contactPhone ? <p>{settings.contactPhone}</p> : null}
              {settings.contactLocation ? <p>{settings.contactLocation}</p> : null}
            </div>
          </div>

          {/* Working hours */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#cae6ff]">{t.follow}</p>
            <div className="mt-4 space-y-3 rounded-xl border border-white/12 bg-white/5 p-4 text-sm">
              <p className="font-semibold text-white/90">{t.newsletterTitle}</p>
              <p className="text-white/65">{t.newsletterDesc}</p>
              <a
                className="inline-flex text-sm font-semibold text-white underline underline-offset-4 nmd-transition hover:opacity-80"
                href={settings.contactEmail ? `mailto:${settings.contactEmail}` : localizedPath(locale, "contact")}
              >
                {t.newsletterCta}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/12 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {settings.siteName}. {t.rights}</p>
          <div className="flex items-center gap-4">
            <span>{t.legal}</span>
            <Link className="nmd-transition hover:text-white/80" href={localizedPath(locale, "privacy")}>{t.policy}</Link>
            <Link className="nmd-transition hover:text-white/80" href={localizedPath(locale, "terms")}>{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
