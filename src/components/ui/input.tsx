import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("w-full rounded-lg border border-[color:var(--outline)] bg-[color:var(--app-card)] px-4 py-3 text-[color:var(--app-text)] focus:border-[color:var(--primary-container)] focus:outline-none", className)} {...props} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("w-full rounded-lg border border-[color:var(--outline)] bg-[color:var(--app-card)] px-4 py-3 text-[color:var(--app-text)] focus:border-[color:var(--primary-container)] focus:outline-none", className)} {...props} />;
}
