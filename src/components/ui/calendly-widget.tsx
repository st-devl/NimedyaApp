"use client";

import { useEffect } from "react";

type Props = {
  url: string;
  locale?: string;
};

const labels = {
  tr: {
    heading: "Ücretsiz Keşif Görüşmesi Planla",
    subtitle: "Randevu alın, projenizi konuşalım. 30 dakikalık ücretsiz görüşme.",
  },
  en: {
    heading: "Schedule a Free Discovery Call",
    subtitle: "Book a slot and let's talk about your project. 30-minute free consultation.",
  },
};

export function CalendlyWidget({ url, locale = "tr" }: Props) {
  const t = labels[locale as keyof typeof labels] ?? labels.tr;

  useEffect(() => {
    const existing = document.querySelector('script[data-calendly-widget]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.setAttribute("data-calendly-widget", "true");
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-[color:var(--surface-container)] py-20">
      <div className="nmd-container nmd-page-x">
        <div className="mb-10 text-center">
          <h2 className="nmd-headline-md text-[color:var(--primary)]">{t.heading}</h2>
          <p className="nmd-body-md mt-3 text-[color:var(--app-muted)]">{t.subtitle}</p>
        </div>
        <div
          className="calendly-inline-widget mx-auto overflow-hidden rounded-2xl border border-[color:var(--app-border)]/30 bg-white shadow-sm"
          data-auto-load="false"
          data-url={url}
          style={{ minWidth: "320px", height: "700px" }}
        />
      </div>
    </section>
  );
}
