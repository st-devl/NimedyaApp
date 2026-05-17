import { cache } from "react";
import { prisma } from "@/lib/db/prisma";

export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettingsView = {
  id: number;
  siteName: string;
  baseUrl: string;
  defaultLocale: string;
  contactEmail: string | null;
  contactPhone: string | null;
  whatsappPhone: string | null;
  contactLocation: string | null;
  socialLinks: SocialLink[];
  robotsAllowIndex: boolean;
  sliderIntervalSeconds: number;
  logoMediaId: number | null;
  logoWhiteMediaId: number | null;
  faviconMediaId: number | null;
  defaultOgMediaId: number | null;
  logoUrl: string | null;
  logoWhiteUrl: string | null;
  faviconUrl: string | null;
  defaultOgImageUrl: string | null;
  updatedAt: Date | null;
};

export type SiteSettingsInput = {
  siteName: string;
  baseUrl: string;
  defaultLocale: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  whatsappPhone?: string | null;
  contactLocation?: string | null;
  socialLinks?: SocialLink[];
  logoMediaId?: number | null;
  logoWhiteMediaId?: number | null;
  faviconMediaId?: number | null;
  defaultOgMediaId?: number | null;
  robotsAllowIndex: boolean;
};

const fallbackSettings: SiteSettingsView = {
  id: 1,
  siteName: "Nimedya",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nimedya.com",
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "tr",
  contactEmail: "hello@nimedya.com",
  contactPhone: "+90 462 000 00 00",
  whatsappPhone: null,
  contactLocation: "Trabzon, Turkiye",
  socialLinks: [
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "Behance", url: "" },
  ],
  robotsAllowIndex: true,
  sliderIntervalSeconds: 6,
  logoMediaId: null,
  logoWhiteMediaId: null,
  faviconMediaId: null,
  defaultOgMediaId: null,
  logoUrl: null,
  logoWhiteUrl: null,
  faviconUrl: null,
  defaultOgImageUrl: null,
  updatedAt: null,
};

function normalizeSocialLinks(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) return fallbackSettings.socialLinks;

  return value
    .filter((item): item is SocialLink => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Record<string, unknown>;
      return typeof candidate.label === "string" && typeof candidate.url === "string";
    })
    .map((item) => ({ label: item.label, url: item.url }));
}

export const getSiteSettings = cache(async (): Promise<SiteSettingsView> => {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
    include: { defaultOg: true, favicon: true, logo: true, logoWhite: true },
  });

  if (!settings) return fallbackSettings;

  return {
    id: settings.id,
    siteName: settings.siteName,
    baseUrl: settings.baseUrl,
    defaultLocale: settings.defaultLocale,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    whatsappPhone: settings.whatsappPhone,
    contactLocation: settings.contactLocation,
    socialLinks: normalizeSocialLinks(settings.socialLinks),
    robotsAllowIndex: settings.robotsAllowIndex,
    sliderIntervalSeconds: settings.sliderIntervalSeconds,
    logoMediaId: settings.logoMediaId,
    logoWhiteMediaId: settings.logoWhiteMediaId,
    faviconMediaId: settings.faviconMediaId,
    defaultOgMediaId: settings.defaultOgMediaId,
    logoUrl: settings.logo?.url ?? null,
    logoWhiteUrl: settings.logoWhite?.url ?? null,
    faviconUrl: settings.favicon?.url ?? null,
    defaultOgImageUrl: settings.defaultOg?.url ?? null,
    updatedAt: settings.updatedAt,
  };
});

export async function upsertSiteSettings(input: SiteSettingsInput) {
  return prisma.siteSettings.upsert({
    where: { id: 1 },
    update: input,
    create: { id: 1, ...input },
  });
}

export type AiSettingsView = {
  aiProvider: string;
  aiApiKey: string | null;
  aiModel: string;
  aiBaseUrl: string | null;
};

export type AiSettingsInput = {
  aiProvider: string;
  aiApiKey?: string | null;
  aiModel: string;
  aiBaseUrl?: string | null;
};

export async function getAiSettings(): Promise<AiSettingsView> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
    select: { aiProvider: true, aiApiKey: true, aiModel: true, aiBaseUrl: true },
  });
  return {
    aiProvider: settings?.aiProvider ?? "disabled",
    aiApiKey: settings?.aiApiKey ?? null,
    aiModel: settings?.aiModel ?? "gpt-4.1-mini",
    aiBaseUrl: settings?.aiBaseUrl ?? null,
  };
}

export async function upsertAiSettings(input: AiSettingsInput) {
  return prisma.siteSettings.upsert({
    where: { id: 1 },
    update: input,
    create: {
      id: 1,
      siteName: "Nimedya",
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nimedya.com",
      ...input,
    },
  });
}
