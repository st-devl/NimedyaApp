import type { Locale } from "@/lib/i18n/config";
import type { RouteKey } from "@/lib/i18n/routes";
import { buildManagedMetadata } from "@/lib/cms/seo";

export function buildPageMetadata(locale: Locale, routeKey: RouteKey) {
  return buildManagedMetadata(locale, routeKey);
}
