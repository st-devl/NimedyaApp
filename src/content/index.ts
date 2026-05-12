import { defaultLocale, type Locale } from "@/lib/i18n/config";
import type {
  AboutContent,
  AdminDashboardContent,
  AdminSliderContent,
  ContactContent,
  HomeContent,
  PortfolioContent,
  ProductPhotographyContent,
  ServicesContent,
} from "@/types/content";
import { enAboutContent } from "@/content/en/about";
import { enAdminDashboardContent, enAdminSliderContent } from "@/content/en/admin";
import { enContactContent } from "@/content/en/contact";
import { enHomeContent } from "@/content/en/home";
import { enPortfolioContent } from "@/content/en/portfolio";
import { enProductPhotographyContent } from "@/content/en/product-photography";
import { enServicesContent } from "@/content/en/services";
import { trAboutContent } from "@/content/tr/about";
import { trAdminDashboardContent, trAdminSliderContent } from "@/content/tr/admin";
import { trContactContent } from "@/content/tr/contact";
import { trHomeContent } from "@/content/tr/home";
import { trPortfolioContent } from "@/content/tr/portfolio";
import { trProductPhotographyContent } from "@/content/tr/product-photography";
import { trServicesContent } from "@/content/tr/services";

const contentRegistry = {
  home: { tr: trHomeContent, en: enHomeContent },
  services: { tr: trServicesContent, en: enServicesContent },
  productPhotography: { tr: trProductPhotographyContent, en: enProductPhotographyContent },
  portfolio: { tr: trPortfolioContent, en: enPortfolioContent },
  about: { tr: trAboutContent, en: enAboutContent },
  contact: { tr: trContactContent, en: enContactContent },
  adminDashboard: { tr: trAdminDashboardContent, en: enAdminDashboardContent },
  adminSlider: { tr: trAdminSliderContent, en: enAdminSliderContent },
} as const;

type ContentNamespace = keyof typeof contentRegistry;

function resolveContent<T>(namespace: ContentNamespace, locale: Locale): T {
  const localized = contentRegistry[namespace][locale];
  if (localized) {
    return localized as T;
  }

  return contentRegistry[namespace][defaultLocale] as T;
}

export function getHomeContent(locale: Locale): HomeContent {
  return resolveContent<HomeContent>("home", locale);
}

export function getServicesContent(locale: Locale): ServicesContent {
  return resolveContent<ServicesContent>("services", locale);
}

export function getProductPhotographyContent(locale: Locale): ProductPhotographyContent {
  return resolveContent<ProductPhotographyContent>("productPhotography", locale);
}

export function getPortfolioContent(locale: Locale): PortfolioContent {
  return resolveContent<PortfolioContent>("portfolio", locale);
}

export function getAboutContent(locale: Locale): AboutContent {
  return resolveContent<AboutContent>("about", locale);
}

export function getContactContent(locale: Locale): ContactContent {
  return resolveContent<ContactContent>("contact", locale);
}

export function getAdminDashboardContent(locale: Locale) {
  return resolveContent<AdminDashboardContent>("adminDashboard", locale);
}

export function getAdminSliderContent(locale: Locale) {
  return resolveContent<AdminSliderContent>("adminSlider", locale);
}
