"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath, type RouteKey } from "@/lib/i18n/routes";

type TopNavProps = {
  locale: Locale;
  active?: "home" | "services" | "portfolio" | "about" | "contact";
  siteName: string;
  logoUrl: string | null;
  logoWhiteUrl: string | null;
};

const labels = {
  tr: { home: "Anasayfa", services: "Hizmetler", portfolio: "İşlerimiz", about: "Hakkımızda", contact: "İletişim", cta: "Ücretsiz Teklif Al" },
  en: { home: "Home", services: "Services", portfolio: "Portfolio", about: "About", contact: "Contact", cta: "Get a Free Quote" },
};

const keyToRoute: Record<NonNullable<TopNavProps["active"]>, RouteKey> = {
  home: "home",
  services: "services",
  portfolio: "portfolio",
  about: "about",
  contact: "contact",
};

const navKeys: Array<NonNullable<TopNavProps["active"]>> = ["home", "services", "portfolio", "about", "contact"];

export function TopNav({ locale, active = "home", siteName, logoUrl, logoWhiteUrl }: TopNavProps) {
  const t = labels[locale];
  const currentRoute = keyToRoute[active];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const localeSwitchItems: Array<{ code: Locale; label: string }> = [
    { code: "tr", label: "TR" },
    { code: "en", label: "EN" },
  ];

  // Always-dark navbar: prefer white logo, fall back to dark logo, then text
  const logoSrc = logoWhiteUrl ?? logoUrl;

  return (
    <nav aria-label={locale === "tr" ? "Ana gezinme" : "Main navigation"} className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07111f] shadow-sm backdrop-blur-xl">
      <div className="nmd-container nmd-page-x flex items-center justify-between py-4">
        {/* Logo */}
        <Link className="flex items-center gap-3 text-xl font-bold text-white" href={localizedPath(locale, "home")}>
          {logoSrc
            ? <Image alt={siteName} className="h-10 w-auto object-contain" height={40} src={logoSrc} width={200} />
            : <span>{siteName}</span>}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navKeys.map((key) => (
            <Link
              aria-current={active === key ? "page" : undefined}
              className={`text-sm font-medium nmd-transition ${active === key ? "text-[#d9111e]" : "text-white/70 hover:text-white"}`}
              href={localizedPath(locale, keyToRoute[key])}
              key={key}
            >
              {t[key]}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Locale switcher */}
          <div
            aria-label={locale === "tr" ? "Dil secimi" : "Language switch"}
            className="flex items-center rounded-full border border-white/20 bg-white/5 p-1"
            role="group"
          >
            {localeSwitchItems.map((item) => {
              const isActive = locale === item.code;
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide nmd-transition ${
                    isActive ? "bg-[#d9111e] text-white shadow-sm" : "text-white/60 hover:text-white"
                  }`}
                  href={localizedPath(item.code, currentRoute)}
                  key={item.code}
                  lang={item.code}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA — desktop only */}
          <Link
            className="hidden rounded-xl px-8 py-3 text-sm font-semibold text-white nmd-transition hover:-translate-y-1 hover:opacity-90 md:block"
            href={localizedPath(locale, "contact")}
            style={{ background: "linear-gradient(135deg,#d9111e,#8b0a12)" }}
          >
            {t.cta}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
          >
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-t border-white/10 bg-[#07111f] shadow-xl md:hidden">
          <div className="nmd-container nmd-page-x flex flex-col gap-1 py-4">
            {navKeys.map((key) => (
              <Link
                aria-current={active === key ? "page" : undefined}
                className={`flex min-h-[44px] items-center rounded-lg px-4 py-3 text-base font-medium nmd-transition ${
                  active === key ? "bg-white/10 text-[#d9111e]" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
                href={localizedPath(locale, keyToRoute[key])}
                key={key}
              >
                {t[key]}
              </Link>
            ))}
            <div className="mt-3 border-t border-white/10 pt-3">
              <Link
                className="flex min-h-[44px] w-full items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-semibold text-white nmd-transition hover:opacity-90"
                href={localizedPath(locale, "contact")}
                style={{ background: "linear-gradient(135deg,#d9111e,#8b0a12)" }}
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
