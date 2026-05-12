"use client";

import { useTheme } from "@/components/providers/theme-provider";

export function ThemeToggleButton() {
  const { toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className="nmd-transition rounded p-2 text-[color:var(--primary)] hover:text-[color:var(--secondary)]"
      onClick={toggleTheme}
      title="Theme"
      type="button"
    >
      <svg fill="none" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7"/>
      </svg>
    </button>
  );
}
