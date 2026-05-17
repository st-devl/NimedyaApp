"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import type { PublicSliderItem } from "@/lib/cms/public-content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";

type HeroSliderProps = {
  items: PublicSliderItem[];
  locale: Locale;
  intervalSeconds?: number;
};

const labels = {
  tr: {
    pretitle: "DİJİTAL YARATICILIK",
    cta: "Projeleri İncele",
    secondary: "Biz Kimiz?",
    badge: "4K Sinematik",
    badgeSub: "Prodüksiyon Standardı",
    prev: "Önceki",
    next: "Sonraki",
    slide: "Slayt",
  },
  en: {
    pretitle: "DIGITAL CREATIVITY",
    cta: "View Projects",
    secondary: "About Us",
    badge: "4K Cinematic",
    badgeSub: "Production Standard",
    prev: "Previous",
    next: "Next",
    slide: "Slide",
  },
} as const;

export function HeroSlider({ items, locale, intervalSeconds = 6 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const t = labels[locale];

  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(next, intervalSeconds * 1000);
    return () => clearInterval(id);
  }, [items.length, next, intervalSeconds]);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <section className="bg-white py-14 md:py-20 nmd-page-x">
      <div className="nmd-container mx-auto grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">

        {/* Left: Text — order 2 on mobile (below image), order 1 on desktop */}
        <div className="order-2 md:order-1">
          {/* Pretitle */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-5 w-[3px] shrink-0 rounded-full bg-[#d9111e]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#d9111e]">
              {t.pretitle}
            </span>
          </div>

          {/* Heading + body — keyed to animate on slide change */}
          <div key={current}>
            <h1
              className="font-extrabold leading-[1.06] text-[#001a2b]"
              style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", letterSpacing: "-0.03em" }}
            >
              {item.title}
            </h1>
            <p className="mt-5 max-w-lg text-[15px] font-medium leading-[1.75] text-[#001a2b]/58 md:text-base">
              {item.description}
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {item.linkUrl && (
                <Link
                  className="rounded-xl bg-[#001a2b] px-7 py-3.5 text-sm font-semibold text-white nmd-transition hover:-translate-y-0.5 hover:opacity-90"
                  href={item.linkUrl}
                >
                  {t.cta}
                </Link>
              )}
              <Link
                className="flex items-center gap-1.5 text-sm font-semibold text-[#001a2b]/55 nmd-transition hover:text-[#001a2b]"
                href={localizedPath(locale, "about")}
              >
                {t.secondary}
                <span aria-hidden>→</span>
              </Link>
            </div>
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

              {/* Play button */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <svg fill="#001a2b" height="16" viewBox="0 0 24 24" width="16">
                    <polygon points="6,3 20,12 6,21" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Badge card */}
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_4px_24px_rgba(0,26,43,0.12)]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#d9111e]/10">
                <svg
                  fill="none"
                  height="18"
                  stroke="#d9111e"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <rect height="14" rx="2" width="20" x="2" y="4" />
                  <path d="M8 20h8M12 18v2" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-bold leading-tight text-[#001a2b]">{t.badge}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-[#001a2b]/50">{t.badgeSub}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
