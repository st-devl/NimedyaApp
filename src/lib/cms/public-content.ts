import {
  getAboutContent,
  getContactContent,
  getHomeContent,
  getPortfolioContent,
  getProductPhotographyContent,
  getServicesContent,
} from "@/content";
import type { AboutContent, ContactContent, HomeContent, PortfolioContent, ProductPhotographyContent, ServicesContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { getPublishedContentBlock } from "@/lib/cms/content";

async function getManagedContent<T>(key: Parameters<typeof getPublishedContentBlock<T>>[0], locale: Locale, fallback: T): Promise<T> {
  return (await getPublishedContentBlock<T>(key, locale)) ?? fallback;
}

export function getManagedHomeContent(locale: Locale): Promise<HomeContent> {
  return getManagedContent("home", locale, getHomeContent(locale));
}

export function getManagedServicesContent(locale: Locale): Promise<ServicesContent> {
  return getManagedContent("services", locale, getServicesContent(locale));
}

export function getManagedProductPhotographyContent(locale: Locale): Promise<ProductPhotographyContent> {
  return getManagedContent("productPhotography", locale, getProductPhotographyContent(locale));
}

export function getManagedPortfolioContent(locale: Locale): Promise<PortfolioContent> {
  return getManagedContent("portfolio", locale, getPortfolioContent(locale));
}

export function getManagedAboutContent(locale: Locale): Promise<AboutContent> {
  return getManagedContent("about", locale, getAboutContent(locale));
}

export function getManagedContactContent(locale: Locale): Promise<ContactContent> {
  return getManagedContent("contact", locale, getContactContent(locale));
}
