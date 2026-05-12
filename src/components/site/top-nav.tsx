"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath, type RouteKey } from "@/lib/i18n/routes";
import { ThemeToggleButton } from "@/components/site/theme-toggle-button";

type TopNavProps = {
  locale: Locale;
  active?: "home" | "services" | "portfolio" | "about" | "contact";
  siteName: string;
  logoUrl: string | null;
};

const labels = {
  tr: { home: "Anasayfa", services: "Hizmetler", portfolio: "Islerimiz", about: "Hakkimizda", contact: "Iletisim", cta: "Let's Talk" },
  en: { home: "Home", services: "Services", portfolio: "Portfolio", about: "About", contact: "Contact", cta: "Let's Talk" },
};

const keyToRoute: Record<NonNullable<TopNavProps["active"]>, RouteKey> = {
  home: "home",
  services: "services",
  portfolio: "portfolio",
  about: "about",
  contact: "contact",
};

const navKeys: Array<NonNullable<TopNavProps["active"]>> = ["home", "services", "portfolio", "about", "contact"];

export function TopNav({ locale, active = "home", siteName, logoUrl }: TopNavProps) {
  const t = labels[locale];
  const currentRoute = keyToRoute[active];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const localeSwitchItems: Array<{ code: Locale; label: string }> = [
    { code: "tr", label: "TR" },
    { code: "en", label: "EN" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[color:var(--outline-variant)] bg-[color:var(--surface-container-low)]/80 shadow-sm backdrop-blur-xl">
      <div className="nmd-container nmd-page-x flex items-center justify-between py-4">
        {/* Logo */}
        <Link className="nmd-headline-md flex items-center gap-3 font-bold text-[color:var(--primary)]" href={localizedPath(locale, "home")}>
          {logoUrl ? <Image alt={siteName} height={36} src={logoUrl} width={36} /> : null}
          <span>{siteName}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navKeys.map((key) => (
            <Link
              aria-current={active === key ? "page" : undefined}
              className={`nmd-body-md nmd-transition ${active === key ? "text-[color:var(--secondary)]" : "text-[color:var(--app-text)] hover:text-[color:var(--secondary)]"}`}
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
            className="flex items-center rounded-full border border-[color:var(--outline)] bg-[color:var(--surface-container)] p-1"
            role="group"
          >
            {localeSwitchItems.map((item) => {
              const isActive = locale === item.code;
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide nmd-transition ${
                    isActive
                      ? "bg-[color:var(--primary)] text-[color:var(--on-primary)] shadow-sm"
                      : "text-[color:var(--app-muted)] hover:text-[color:var(--app-text)]"
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

          <ThemeToggleButton />

          {/* CTA — desktop only */}
          <Link
            className="hidden rounded-lg bg-[color:var(--primary)] px-8 py-3 text-sm font-semibold text-[color:var(--on-primary)] nmd-transition hover:-translate-y-1 hover:opacity-90 md:block"
            href={localizedPath(locale, "contact")}
          >
            {t.cta}
          </Link>

          {/* Hamburger button — mobile only */}
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
          >
            <span className={`block h-0.5 w-6 bg-[color:var(--primary)] transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[color:var(--primary)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[color:var(--primary)] transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-t border-[color:var(--outline-variant)] bg-[color:var(--surface-container-low)] shadow-xl md:hidden">
          <div className="nmd-container nmd-page-x flex flex-col gap-1 py-4">
            {navKeys.map((key) => (
              <Link
                aria-current={active === key ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-base font-medium nmd-transition ${
                  active === key
                    ? "bg-[color:var(--surface-container)] text-[color:var(--secondary)]"
                    : "text-[color:var(--app-text)] hover:bg-[color:var(--surface-container)]"
                }`}
                href={localizedPath(locale, keyToRoute[key])}
                key={key}
              >
                {t[key]}
              </Link>
            ))}
            <div className="mt-3 border-t border-[color:var(--outline-variant)] pt-3">
              <Link
                className="block w-full rounded-lg bg-[color:var(--primary)] px-4 py-3 text-center text-sm font-semibold text-[color:var(--on-primary)] nmd-transition hover:opacity-90"
                href={localizedPath(locale, "contact")}
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
