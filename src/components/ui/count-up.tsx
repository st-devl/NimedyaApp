"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  duration?: number;
};

function parseValue(raw: string): { prefix: string; number: number; suffix: string } {
  const match = raw.match(/^([^0-9]*)(\d+(?:\.\d+)?)([^0-9]*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw };
  return { prefix: match[1] ?? "", number: parseFloat(match[2] ?? "0"), suffix: match[3] ?? "" };
}

export function CountUp({ value, duration = 1800 }: CountUpProps) {
  const { prefix, number, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * number));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [number, duration]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
