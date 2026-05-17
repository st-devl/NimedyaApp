import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { getSiteSettings } from "@/lib/cms/settings";
import Link from "next/link";
import Image from "next/image";

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase().replace(/\s/g, "");
  if (key.includes("instagram"))
    return (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    );
  if (key.includes("linkedin"))
    return (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    );
  if (key.includes("behance"))
    return (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-.16 1.35-.49.35-1.05.61-1.69.78-.63.17-1.29.25-1.98.25H0V4.51l6.938-.007zm-.23 5.404c.56 0 1.02-.12 1.39-.37s.55-.65.55-1.2c0-.3-.06-.55-.16-.75-.11-.2-.26-.37-.45-.5-.19-.13-.41-.22-.67-.28-.26-.05-.53-.08-.82-.08H3.5v3.19l3.21-.002zm.15 5.698c.32 0 .62-.04.9-.1.28-.07.52-.18.73-.33.2-.15.37-.35.49-.6.12-.25.18-.56.18-.94 0-.75-.21-1.29-.62-1.62-.42-.33-.97-.49-1.66-.49H3.5v4.08h3.358zm11.112-1.76c.18.51.56.93 1.15 1.27.59.33 1.22.5 1.9.5.66 0 1.24-.14 1.75-.43.51-.28.84-.66.98-1.15h2.47c-.39 1.28-1.05 2.2-1.96 2.76-.91.56-2.02.84-3.32.84-.9 0-1.71-.15-2.43-.44-.72-.3-1.33-.71-1.84-1.25-.5-.54-.88-1.18-1.14-1.93-.26-.75-.39-1.57-.39-2.45 0-.86.13-1.66.4-2.4.27-.74.65-1.38 1.14-1.92.5-.54 1.1-.96 1.81-1.26.71-.3 1.5-.46 2.37-.46 1.0 0 1.87.2 2.6.59.73.4 1.33.93 1.78 1.6.46.67.79 1.44.99 2.3.1.44.15.9.15 1.38v.7h-7.5c.02.65.13 1.2.31 1.71zm3.94-5.72c-.5 0-.94.1-1.31.31-.37.21-.67.47-.9.78-.23.3-.4.64-.52.99-.06.19-.11.38-.14.58h5.28c-.07-.73-.32-1.34-.74-1.82-.42-.5-.99-.74-1.67-.84z"/></svg>
    );
  if (key.includes("twitter") || key.includes("x.com") || key === "x")
    return (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    );
  if (key.includes("facebook"))
    return (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    );
  if (key.includes("youtube"))
    return (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
    );
  if (key.includes("tiktok"))
    return (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
    );
  if (key.includes("github"))
    return (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    );
  /* fallback: generic link icon */
  return (
    <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  );
}

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
          <div className="md:col-span-4">
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
              <Link className="nmd-transition hover:text-white" href={localizedPath(locale, "contact")}>{t.navLinks.contact}</Link>
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
          <div className="md:col-span-4">
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
