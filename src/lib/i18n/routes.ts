import type { Locale } from "./config";

export const routeMap = {
  home: { tr: "", en: "" },
  services: { tr: "hizmetler", en: "services" },
  productPhotography: { tr: "hizmetler/urun-fotografciligi", en: "services/product-photography" },
  portfolio: { tr: "islerimiz", en: "portfolio" },
  about: { tr: "hakkimizda", en: "about" },
  contact: { tr: "iletisim", en: "contact" },
  privacy: { tr: "gizlilik", en: "privacy" },
  terms: { tr: "kullanim-kosullari", en: "terms" },
  admin: { tr: "admin", en: "admin" },
  adminSettings: { tr: "admin/ayarlar", en: "admin/settings" },
  adminMedia: { tr: "admin/medya", en: "admin/media" },
  adminSeo: { tr: "admin/seo", en: "admin/seo" },
  adminContent: { tr: "admin/icerik", en: "admin/content" },
  adminMessages: { tr: "admin/mesajlar", en: "admin/messages" },
  adminSlider: { tr: "admin/slider", en: "admin/slider" },
  adminUsers: { tr: "admin/kullanicilar", en: "admin/users" },
  adminLogin: { tr: "admin/login", en: "admin/login" },
} as const;

export type RouteKey = keyof typeof routeMap;

export function localizedPath(locale: Locale, key: RouteKey): string {
  const slug = routeMap[key][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}
