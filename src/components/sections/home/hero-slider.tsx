"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import type { PublicSliderItem } from "@/lib/cms/public-content";

type HeroSliderProps = {
  items: PublicSliderItem[];
};

export function HeroSlider({ items }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [items.length, next]);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <section className="px-6 pb-[100px] pt-6 md:px-20 md:pt-8">
      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--app-border)]/30 shadow-sm md:h-[560px] md:flex-row">
        {/* Sol: metin */}
        <div className="relative z-10 flex w-full items-center overflow-hidden bg-[color:var(--app-bg)] px-6 py-12 md:w-1/2 md:px-14 md:py-16">
          <div className="w-full max-w-xl">
            <div
              key={current}
              className="animate-fade-in"
            >
              <h1 className="mb-6 line-clamp-2 text-4xl font-bold leading-tight tracking-tight text-[color:var(--primary)] md:text-5xl">{item.title}</h1>
              <p className="nmd-body-lg mb-10 line-clamp-3 text-[color:var(--app-muted)]">{item.description}</p>
              {item.linkUrl && (
                <Link
                  className="nmd-label-sm rounded-xl bg-[color:var(--primary)] px-10 py-5 text-[color:var(--on-primary)] nmd-transition hover:-translate-y-1 hover:opacity-90"
                  href={item.linkUrl}
                >
                  Daha Fazla
                </Link>
              )}
            </div>

            {/* Navigasyon */}
            {items.length > 1 && (
              <div className="mt-12 flex items-center gap-4">
                <button
                  aria-label="Önceki"
                  className="rounded-full border border-[color:var(--app-border)] p-2 text-[color:var(--primary)] transition hover:bg-[color:var(--surface-container)]"
                  onClick={prev}
                  type="button"
                >
                  ‹
                </button>
                <div className="flex gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Slayt ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-[color:var(--primary)]" : "w-2 bg-[color:var(--app-border)]"}`}
                      onClick={() => setCurrent(i)}
                      type="button"
                    />
                  ))}
                </div>
                <button
                  aria-label="Sonraki"
                  className="rounded-full border border-[color:var(--app-border)] p-2 text-[color:var(--primary)] transition hover:bg-[color:var(--surface-container)]"
                  onClick={next}
                  type="button"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sağ: görsel */}
        <div className="relative min-h-[280px] w-full overflow-hidden md:w-1/2">
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
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src={slide.imageUrl}
                />
              ) : (
                <div className="h-full w-full bg-[color:var(--surface-container)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
