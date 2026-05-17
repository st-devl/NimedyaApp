"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function FaqSection({ items, title }: { items: FaqItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="nmd-container nmd-page-x py-20">
      {title && (
        <h2 className="mb-10 text-center text-3xl font-bold text-[color:var(--primary)] md:text-4xl">
          {title}
        </h2>
      )}
      <div className="mx-auto max-w-3xl divide-y divide-[color:var(--app-border)]">
        {items.map((item, idx) => (
          <div key={idx}>
            <button
              aria-expanded={open === idx}
              className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-[color:var(--primary)] nmd-transition hover:text-[color:var(--secondary)]"
              onClick={() => setOpen(open === idx ? null : idx)}
              type="button"
            >
              <span>{item.question}</span>
              <svg
                className={`h-5 w-5 shrink-0 nmd-transition ${open === idx ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open === idx && (
              <p className="pb-5 text-sm leading-relaxed text-[color:var(--app-muted)]">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
