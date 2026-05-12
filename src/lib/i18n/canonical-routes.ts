import type { Locale } from "./config";
import { routeMap } from "./routes";

function stripSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

const localizedValues = Object.values(routeMap);

export function canonicalizeLocalePath(locale: Locale, rawPath: string): string | null {
  const path = stripSlashes(rawPath);

  if (path.length === 0) {
    return null;
  }

  for (const item of localizedValues) {
    const localeValue = stripSlashes(item[locale]);
    if (localeValue.length === 0) {
      continue;
    }

    if (path === localeValue) {
      return null;
    }

    const otherLocale = locale === "tr" ? "en" : "tr";
    const otherValue = stripSlashes(item[otherLocale]);
    if (otherValue.length > 0 && path === otherValue) {
      return localeValue;
    }
  }

  return null;
}
