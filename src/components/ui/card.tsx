import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return <div className={cn("rounded-xl border border-[color:var(--app-border)] bg-[color:var(--app-card)] shadow-sm", className)} {...props} />;
}
