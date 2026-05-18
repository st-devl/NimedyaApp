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
  howWeWork: { tr: "nasil-calisiyoruz", en: "how-we-work" },
  pricing: { tr: "fiyatlar", en: "pricing" },
  blog: { tr: "blog", en: "blog" },
  trabzonWebTasarim: { tr: "trabzon-web-tasarim", en: "trabzon-web-design" },
  trabzonSeo: { tr: "trabzon-seo", en: "trabzon-seo" },
  trabzonFotografcilik: { tr: "trabzon-fotografcilik", en: "trabzon-photography" },
  trabzonTanitimFilmi: { tr: "trabzon-tanitim-filmi", en: "trabzon-video" },
  trabzonKurumsalKimlik: { tr: "trabzon-kurumsal-kimlik", en: "trabzon-brand-identity" },
  trabzonSosyalMedya: { tr: "trabzon-sosyal-medya", en: "trabzon-social-media" },
  serviceGuide: { tr: "hizmet-rehberi", en: "service-guide" },
  admin: { tr: "admin", en: "admin" },
  adminSettings: { tr: "admin/ayarlar", en: "admin/settings" },
  adminMedia: { tr: "admin/medya", en: "admin/media" },
  adminSeo: { tr: "admin/seo", en: "admin/seo" },
  adminContent: { tr: "admin/icerik", en: "admin/content" },
  adminBrands: { tr: "admin/markalar", en: "admin/brands" },
  adminMessages: { tr: "admin/mesajlar", en: "admin/messages" },
  adminSlider: { tr: "admin/slider", en: "admin/slider" },
  adminUsers: { tr: "admin/kullanicilar", en: "admin/users" },
  adminAiSettings: { tr: "admin/ai-ayarlari", en: "admin/ai-settings" },
  adminServices: { tr: "admin/kreatif-cozumler", en: "admin/creative-solutions" },
  adminServiceDetails: { tr: "admin/hizmet-detaylari", en: "admin/service-details" },
  adminCaseStudies: { tr: "admin/vaka-calismalari", en: "admin/case-studies" },
  adminLogin: { tr: "admin/login", en: "admin/login" },
} as const;

export type RouteKey = keyof typeof routeMap;

export function localizedPath(locale: Locale, key: RouteKey): string {
  const slug = routeMap[key][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}
