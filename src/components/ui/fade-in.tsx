"use client";

import { useInView } from "@/hooks/use-in-view";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 100 | 200 | 300 | 400;
};

const delayClass: Record<number, string> = {
  0: "delay-0",
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
};

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={[
        "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
        delayClass[delay] ?? "delay-0",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
