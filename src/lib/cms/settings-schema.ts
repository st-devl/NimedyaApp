import { z } from "zod";

const optionalMediaIdSchema = z.preprocess((value) => {
  if (value === "" || value === undefined) return null;
  return value;
}, z.number().int().positive().nullable());

export const socialLinkSchema = z.object({
  label: z.string().trim().min(1).max(40),
  url: z.string().trim().max(500),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().trim().min(1).max(120),
  baseUrl: z.string().trim().url().max(255),
  defaultLocale: z.enum(["tr", "en"]),
  contactEmail: z.union([z.literal(""), z.string().trim().email().max(190)]).transform((value) => value || null),
  contactPhone: z.union([z.literal(""), z.string().trim().min(3).max(60)]).transform((value) => value || null),
  whatsappPhone: z.union([z.literal(""), z.string().trim().min(3).max(60)]).transform((value) => value || null),
  contactLocation: z.union([z.literal(""), z.string().trim().min(2).max(190)]).transform((value) => value || null),
  socialLinks: z.array(socialLinkSchema).max(8),
  logoMediaId: optionalMediaIdSchema,
  logoWhiteMediaId: optionalMediaIdSchema,
  faviconMediaId: optionalMediaIdSchema,
  defaultOgMediaId: optionalMediaIdSchema,
  robotsAllowIndex: z.boolean(),
});

export type SiteSettingsPayload = z.infer<typeof siteSettingsSchema>;
