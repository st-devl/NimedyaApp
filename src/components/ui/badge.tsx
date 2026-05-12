import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "success" | "warning" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[color:var(--surface-container-low)] text-[color:var(--app-muted)]",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", variantClasses[variant], className)} {...props} />;
}
