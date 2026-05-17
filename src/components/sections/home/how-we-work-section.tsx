import Link from "next/link";
import type { HowWeWorkContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";

type Props = {
  content: HowWeWorkContent;
  locale: Locale;
};

const STEP_COLORS = [
  { num: "from-[#d9111e] to-[#8b0a12]", border: "var(--hww-card-border-1)", dot: "#d9111e" },
  { num: "from-[#c0102a] to-[#1a3a5c]", border: "var(--hww-card-border-2)", dot: "#b5102a" },
  { num: "from-[#1a3a5c] to-[#0d2744]", border: "var(--hww-card-border-3)", dot: "#1a3a5c" },
  { num: "from-[#0d2744] to-[#1a3a5c]", border: "var(--hww-card-border-4)", dot: "#0d2744" },
  { num: "from-[#d9111e] to-[#8b0a12]", border: "var(--hww-card-border-1)", dot: "#d9111e" },
] as const;

function parseStepTitle(raw: string): { title: string; tag: string | null } {
  const m = raw.match(/^(.*?)\s*\(([^)]+)\)$/);
  return m ? { title: m[1].trim(), tag: m[2].trim() } : { title: raw, tag: null };
}

export function HowWeWorkSection({ content, locale }: Props) {
  return (
    <section
      className="relative overflow-hidden py-[120px]"
      style={{ background: "var(--hww-bg)" }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle,#d9111e,transparent 65%)",
          opacity: "var(--hww-blob-opacity)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle,#1a3a5c,transparent 65%)",
          opacity: "var(--hww-blob-opacity)",
        }}
        aria-hidden
      />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--hww-grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--hww-grid-line) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="nmd-container nmd-page-x relative">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span
            className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.18em]"
            style={{ color: "#d9111e" }}
          >
            <span className="h-px w-8 shrink-0" style={{ background: "#d9111e" }} />
            {content.pretitle}
            <span className="h-px w-8 shrink-0" style={{ background: "#d9111e" }} />
          </span>
          <h2
            className="font-extrabold leading-none"
            style={{
              fontSize: "clamp(36px,5vw,64px)",
              letterSpacing: "-0.055em",
              color: "var(--hww-title)",
            }}
          >
            {content.title}
          </h2>
          {content.subtitle && (
            <p
              className="mx-auto mt-6 max-w-xl text-base font-medium leading-[1.8]"
              style={{ color: "var(--hww-subtitle)" }}
            >
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="absolute left-0 right-0 top-[52px] hidden h-px md:block"
            style={{ background: "var(--hww-timeline)" }}
            aria-hidden
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-5 md:gap-4">
            {content.steps.map((step, i) => {
              const col = STEP_COLORS[i] ?? STEP_COLORS[0];
              const { title, tag } = parseStepTitle(step.title);
              return (
                <div key={step.number} className="group flex flex-col">
                  {/* Number bubble */}
                  <div className="relative mb-8 flex items-center md:justify-center">
                    <div
                      className={`relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${col.num}`}
                      style={{ boxShadow: "var(--hww-bubble-shadow)" }}
                    >
                      <span className="text-sm font-extrabold text-white">{step.number}</span>
                    </div>
                    {/* mobile connector */}
                    <div
                      className="ml-4 h-px flex-1 md:hidden"
                      style={{ background: "var(--hww-mobile-line)" }}
                      aria-hidden
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-2xl p-px transition duration-300 group-hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg,${col.border},var(--hww-card-border-mid),var(--hww-card-border-end))`,
                      boxShadow: "var(--hww-card-shadow)",
                    }}
                  >
                    <div
                      className="h-full rounded-[15px] p-6"
                      style={{
                        background: "var(--hww-card-inner)",
                        backdropFilter: "var(--hww-card-backdrop)",
                      }}
                    >
                      {/* Week tag */}
                      {tag && (
                        <div className="mb-3 flex items-center gap-1.5">
                          <span
                            className="h-1 w-1 rounded-full"
                            style={{ background: col.dot }}
                          />
                          <span
                            className="text-[10px] font-extrabold uppercase tracking-[0.16em]"
                            style={{ color: col.dot }}
                          >
                            {tag}
                          </span>
                        </div>
                      )}
                      <h3
                        className="mb-3 font-bold leading-snug"
                        style={{
                          fontSize: "15px",
                          letterSpacing: "-0.02em",
                          color: "var(--hww-card-title)",
                        }}
                      >
                        {title}
                      </h3>
                      <div
                        className="mb-3 h-px w-8"
                        style={{ background: col.dot, opacity: 0.3 }}
                      />
                      <p
                        className="text-[13px] font-medium leading-[1.75]"
                        style={{ color: "var(--hww-card-desc)" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            className="inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-sm font-extrabold text-white nmd-transition hover:-translate-y-1"
            href={localizedPath(locale, "contact")}
            style={{
              background: "linear-gradient(135deg,#d9111e,#8b0a12)",
              letterSpacing: "-0.01em",
              boxShadow: "var(--hww-cta-shadow)",
            }}
          >
            {content.ctaLabel}
            <span className="text-white/70">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
