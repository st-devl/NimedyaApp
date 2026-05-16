"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ThemeMode } from "@/lib/theme/types";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "nimedya-theme";

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with "light" so SSR and client initial render match.
  // useEffect below syncs the real value (already applied by the inline script in layout.tsx).
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    // Sync React state with what the inline script already applied to the DOM.
    // A lazy useState initializer would cause SSR/client hydration mismatch,
    // so we intentionally read the DOM after hydration and update once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(document.documentElement.classList.contains("dark") ? "dark" : "light");

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = (e: MediaQueryListEvent) => {
        const next: ThemeMode = e.matches ? "dark" : "light";
        setThemeState(next);
        applyTheme(next);
      };
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }
  }, []);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme, toggleTheme }), [setTheme, theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
