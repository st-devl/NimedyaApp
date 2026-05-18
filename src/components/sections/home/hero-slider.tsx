"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import type { PublicSliderItem } from "@/lib/cms/public-content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import { BadgeIcon } from "@/lib/slider-icons";

type HeroSliderProps = {
  items: PublicSliderItem[];
  locale: Locale;
  intervalSeconds?: number;
};

const fallback = {
  tr: {
    pretitle: "DİJİTAL YARATICILIK",
    badge: "4K Sinematik",
    badgeSub: "Prodüksiyon Standardı",
  },
  en: {
    pretitle: "DIGITAL CREATIVITY",
    badge: "4K Cinematic",
    badgeSub: "Production Standard",
  },
} as const;

const labels = {
  tr: { cta: "Projeleri İncele", secondary: "Biz Kimiz?", prev: "Önceki", next: "Sonraki", slide: "Slayt" },
  en: { cta: "View Projects", secondary: "About Us", prev: "Previous", next: "Next", slide: "Slide" },
} as const;

const DEFAULT_SECONDARY = { tr: "Biz Kimiz?", en: "About Us" } as const;

export function HeroSlider({ items, locale, intervalSeconds = 6 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const t = labels[locale];
  const fb = fallback[locale];

  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(next, intervalSeconds * 1000);
    return () => clearInterval(id);
  }, [items.length, next, intervalSeconds]);

  if (items.length === 0) return null;

  const activePretitle = items[current].pretitle ?? fb.pretitle;

  return (
    <section className="bg-white py-14 md:py-20 nmd-page-x min-h-svh md:min-h-0 flex flex-col justify-center">
      <div className="nmd-container mx-auto grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">

        {/* Left: Text — order 2 on mobile (below image), order 1 on desktop */}
        <div className="order-2 md:order-1">
          {/* Pretitle — uses active slide's value (changes per slide) */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-5 w-[3px] shrink-0 rounded-full bg-[#d9111e]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#d9111e]">
              {activePretitle}
            </span>
          </div>

          {/* Grid-stack: all slides rendered in same cell, opacity-switched — no height jump */}
          <div className="grid">
            {items.map((item, i) => {
              const HeadingTag = i === 0 ? "h1" : "h2";
              return (
              <div
                key={item.id}
                aria-hidden={i !== current}
                className="col-start-1 row-start-1 transition-opacity duration-500"
                style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
              >
                <HeadingTag
                  className="font-extrabold leading-[1.06] text-[#001a2b]"
                  style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", letterSpacing: "-0.03em" }}
                >
                  {item.title}
                </HeadingTag>
                <p className="mt-5 max-w-lg text-[15px] font-medium leading-[1.75] text-[#001a2b]/58 md:text-base">
                  {item.description}
                </p>

                {/* Buttons */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  {item.linkUrl && (
                    <Link
                      className="min-h-[48px] rounded-xl bg-[#d9111e] px-7 py-3.5 text-sm font-semibold text-white nmd-transition hover:-translate-y-0.5 hover:opacity-90"
                      href={item.linkUrl}
                      tabIndex={i !== current ? -1 : 0}
                    >
                      {t.cta}
                    </Link>
                  )}
                  <Link
                    className="flex items-center gap-1.5 text-sm font-semibold text-[#001a2b]/55 nmd-transition hover:text-[#001a2b]"
                    href={localizedPath(locale, "about")}
                    tabIndex={i !== current ? -1 : 0}
                  >
                    {item.ctaSecondary ?? DEFAULT_SECONDARY[locale]}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            );
            })}
          </div>

          {/* Navigation dots + arrows */}
          {items.length > 1 && (
            <div className="mt-10 flex items-center gap-4">
              <button
                aria-label={t.prev}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#001a2b]/15 text-[#001a2b]/45 nmd-transition hover:border-[#001a2b]/40 hover:text-[#001a2b]"
                onClick={prev}
                type="button"
              >
                ‹
              </button>
              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`${t.slide} ${i + 1}`}
                    className={`h-1.5 rounded-full nmd-transition ${i === current ? "w-7 bg-[#d9111e]" : "w-1.5 bg-[#001a2b]/20 hover:bg-[#001a2b]/40"}`}
                    onClick={() => setCurrent(i)}
                    type="button"
                  />
                ))}
              </div>
              <button
                aria-label={t.next}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#001a2b]/15 text-[#001a2b]/45 nmd-transition hover:border-[#001a2b]/40 hover:text-[#001a2b]"
                onClick={next}
                type="button"
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Right: Image — order 1 on mobile (on top), order 2 on desktop */}
        <div className="order-1 md:order-2">
          <div className="relative">
            {/* Image container */}
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "4 / 3" }}
            >
              {items.map((slide, i) => (
                <div
                  key={slide.id}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === current ? 1 : 0 }}
                >
                  {slide.imageUrl ? (
                    <Image
                      alt={slide.title}
                      className="object-cover"
                      fill
                      priority={i === 0}
                      sizes="(min-width: 768px) 45vw, 100vw"
                      src={slide.imageUrl}
                    />
                  ) : (
                    <div className="h-full w-full bg-[#0c1e36]" />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/20 to-transparent" />
                </div>
              ))}

              {/* Play button — optional per slide */}
              {items[current].showPlayButton && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <svg fill="#001a2b" height="16" viewBox="0 0 24 24" width="16">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Badge card */}
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_4px_24px_rgba(0,26,43,0.12)]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#d9111e]/10">
                <BadgeIcon iconKey={items[current].badgeIcon ?? "monitor"} size={18} stroke="#d9111e" />
              </div>
              <div>
                <p className="text-[13px] font-bold leading-tight text-[#001a2b]">{items[current].badge ?? fb.badge}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-[#001a2b]/50">{items[current].badgeSub ?? fb.badgeSub}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
