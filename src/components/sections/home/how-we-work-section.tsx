import Link from "next/link";
import type { HowWeWorkContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";

type Props = {
  content: HowWeWorkContent;
  locale: Locale;
};

const STEP_COLORS = [
  { num: "from-[#d9111e] to-[#8b0a12]", dot: "#d9111e" },
  { num: "from-[#c0102a] to-[#1a3a5c]", dot: "#b5102a" },
  { num: "from-[#1a3a5c] to-[#0d2744]", dot: "#1a3a5c" },
  { num: "from-[#0d2744] to-[#1a3a5c]", dot: "#0d2744" },
  { num: "from-[#d9111e] to-[#8b0a12]", dot: "#d9111e" },
] as const;

export function HowWeWorkSection({ content, locale }: Props) {
  return (
    <section
      className="relative overflow-hidden py-[120px]"
      style={{
        background: "linear-gradient(135deg,#07111f 0%,#0c1e36 55%,#150810 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle,#d9111e,transparent 65%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle,#1a3a5c,transparent 65%)" }}
        aria-hidden
      />
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px)",
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
            className="font-extrabold leading-none text-white"
            style={{
              fontSize: "clamp(36px,5vw,64px)",
              letterSpacing: "-0.055em",
            }}
          >
            {content.title}
          </h2>
          {content.subtitle && (
            <p
              className="mx-auto mt-6 max-w-xl text-base font-medium leading-[1.8]"
              style={{ color: "rgba(255,255,255,.52)" }}
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
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(217,17,30,.35) 15%,rgba(26,58,92,.6) 50%,rgba(217,17,30,.35) 85%,transparent)",
            }}
            aria-hidden
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-5 md:gap-4">
            {content.steps.map((step, i) => {
              const col = STEP_COLORS[i] ?? STEP_COLORS[0];
              return (
                <div key={step.number} className="group flex flex-col">
                  {/* Number bubble */}
                  <div className="relative mb-8 flex items-center md:justify-center">
                    <div
                      className={`relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${col.num} shadow-[0_0_28px_rgba(217,17,30,.35)]`}
                    >
                      <span className="text-sm font-extrabold text-white">{step.number}</span>
                    </div>
                    {/* mobile connector */}
                    <div
                      className="ml-4 h-px flex-1 md:hidden"
                      style={{ background: "rgba(255,255,255,.08)" }}
                      aria-hidden
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-2xl p-px transition duration-300 group-hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg,${col.dot}55,rgba(255,255,255,.06),rgba(26,58,92,.4))`,
                    }}
                  >
                    <div
                      className="h-full rounded-[15px] p-6"
                      style={{
                        background:
                          "linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.02))",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <h3
                        className="mb-3 font-bold leading-snug text-white"
                        style={{ fontSize: "15px", letterSpacing: "-0.02em" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-[13px] font-medium leading-[1.7]"
                        style={{ color: "rgba(255,255,255,.52)" }}
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
            className="inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-sm font-extrabold text-white shadow-[0_0_40px_rgba(217,17,30,.3)] nmd-transition hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(217,17,30,.45)]"
            href={localizedPath(locale, "contact")}
            style={{
              background: "linear-gradient(135deg,#d9111e,#8b0a12)",
              letterSpacing: "-0.01em",
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
