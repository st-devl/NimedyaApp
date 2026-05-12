import type { Locale } from "@/lib/i18n/config";
import type { RouteKey } from "@/lib/i18n/routes";

export type SeoDefaults = {
  title: string;
  description: string;
};

export const seoDefaults: Record<RouteKey, Record<Locale, SeoDefaults>> = {
  home: {
    tr: { title: "Nimedya | Ana Sayfa", description: "Nimedya dijital ajans ana sayfasi." },
    en: { title: "Nimedya | Home", description: "Nimedya digital agency homepage." },
  },
  services: {
    tr: { title: "Nimedya | Hizmetler", description: "Nimedya hizmetleri." },
    en: { title: "Nimedya | Services", description: "Nimedya services." },
  },
  productPhotography: {
    tr: { title: "Nimedya | Urun Fotografciligi", description: "Urun fotografciligi hizmet detayi." },
    en: { title: "Nimedya | Product Photography", description: "Product photography service detail." },
  },
  portfolio: {
    tr: { title: "Nimedya | Islerimiz", description: "Nimedya portfolyo projeleri." },
    en: { title: "Nimedya | Portfolio", description: "Nimedya portfolio projects." },
  },
  about: {
    tr: { title: "Nimedya | Hakkimizda", description: "Nimedya hakkimizda." },
    en: { title: "Nimedya | About", description: "About Nimedya." },
  },
  contact: {
    tr: { title: "Nimedya | Iletisim", description: "Nimedya iletisime gecin." },
    en: { title: "Nimedya | Contact", description: "Contact Nimedya." },
  },
  admin: {
    tr: { title: "Nimedya Admin | Dashboard", description: "Nimedya admin dashboard." },
    en: { title: "Nimedya Admin | Dashboard", description: "Nimedya admin dashboard." },
  },
  adminSettings: {
    tr: { title: "Nimedya Admin | Ayarlar", description: "Nimedya site ayarlari." },
    en: { title: "Nimedya Admin | Settings", description: "Nimedya site settings." },
  },
  adminMedia: {
    tr: { title: "Nimedya Admin | Medya", description: "Nimedya medya kutuphanesi." },
    en: { title: "Nimedya Admin | Media", description: "Nimedya media library." },
  },
  adminSeo: {
    tr: { title: "Nimedya Admin | SEO", description: "Nimedya SEO yonetimi." },
    en: { title: "Nimedya Admin | SEO", description: "Nimedya SEO management." },
  },
  adminContent: {
    tr: { title: "Nimedya Admin | Icerik", description: "Nimedya icerik yonetimi." },
    en: { title: "Nimedya Admin | Content", description: "Nimedya content management." },
  },
  adminMessages: {
    tr: { title: "Nimedya Admin | Mesajlar", description: "Nimedya iletisim talepleri." },
    en: { title: "Nimedya Admin | Messages", description: "Nimedya contact requests." },
  },
  adminSlider: {
    tr: { title: "Nimedya Admin | Slider", description: "Nimedya slider yonetimi." },
    en: { title: "Nimedya Admin | Slider", description: "Nimedya slider management." },
  },
  adminLogin: {
    tr: { title: "Nimedya Admin | Giris", description: "Nimedya admin giris sayfasi." },
    en: { title: "Nimedya Admin | Login", description: "Nimedya admin login page." },
  },
};
