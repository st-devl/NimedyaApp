import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  // Filled dark — shape: solid rectangle
  primary: "bg-[color:var(--primary)] text-[color:var(--on-primary)] hover:opacity-90",
  // Filled accent — shape: solid rectangle, different hue AND different icon weight helps color-blind users
  secondary: "bg-[color:var(--secondary)] text-[color:var(--on-secondary)] hover:opacity-90 underline-offset-2",
  // Outlined — shape: bordered rectangle, distinguishable by border alone (no fill), + underline on hover
  outline: "border-2 border-[color:var(--primary)] bg-transparent text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-[color:var(--on-primary)]",
  ghost: "bg-[color:var(--surface-container-low)] text-[color:var(--primary)] hover:bg-[color:var(--surface-container)]",
  danger: "bg-[color:var(--error)] text-white hover:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "nmd-transition inline-flex items-center justify-center rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
