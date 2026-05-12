import { cache } from "react";
import { env } from "@/config/env";
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
  contactLocation: string | null;
  socialLinks: SocialLink[];
  robotsAllowIndex: boolean;
  logoMediaId: number | null;
  faviconMediaId: number | null;
  defaultOgMediaId: number | null;
  logoUrl: string | null;
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
  contactLocation?: string | null;
  socialLinks?: SocialLink[];
  logoMediaId?: number | null;
  faviconMediaId?: number | null;
  defaultOgMediaId?: number | null;
  robotsAllowIndex: boolean;
};

const fallbackSettings: SiteSettingsView = {
  id: 1,
  siteName: "Nimedya",
  baseUrl: env.NEXT_PUBLIC_SITE_URL,
  defaultLocale: env.NEXT_PUBLIC_DEFAULT_LOCALE,
  contactEmail: "hello@nimedya.com",
  contactPhone: "+90 462 000 00 00",
  contactLocation: "Trabzon, Turkiye",
  socialLinks: [
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "Behance", url: "" },
  ],
  robotsAllowIndex: true,
  logoMediaId: null,
  faviconMediaId: null,
  defaultOgMediaId: null,
  logoUrl: null,
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
    include: { defaultOg: true, favicon: true, logo: true },
  });

  if (!settings) return fallbackSettings;

  return {
    id: settings.id,
    siteName: settings.siteName,
    baseUrl: settings.baseUrl,
    defaultLocale: settings.defaultLocale,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    contactLocation: settings.contactLocation,
    socialLinks: normalizeSocialLinks(settings.socialLinks),
    robotsAllowIndex: settings.robotsAllowIndex,
    logoMediaId: settings.logoMediaId,
    faviconMediaId: settings.faviconMediaId,
    defaultOgMediaId: settings.defaultOgMediaId,
    logoUrl: settings.logo?.url ?? null,
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
