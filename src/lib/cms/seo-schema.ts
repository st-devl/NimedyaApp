import { z } from "zod";
import { locales } from "@/lib/i18n/config";
import { routeMap } from "@/lib/i18n/routes";

const routeKeys = Object.keys(routeMap) as [keyof typeof routeMap, ...(keyof typeof routeMap)[]];
const localeValues = [...locales] as ["tr", "en"];

const optionalMediaIdSchema = z.preprocess((value) => {
  if (value === "" || value === undefined) return null;
  return value;
}, z.number().int().positive().nullable());

export const seoPageSchema = z.object({
  routeKey: z.enum(routeKeys),
  locale: z.enum(localeValues),
  path: z.string().trim().min(1).max(255).regex(/^\//, "Path must start with /."),
  metaTitle: z.string().trim().min(1).max(180),
  metaDescription: z.string().trim().min(1).max(320),
  canonicalUrl: z.union([z.literal(""), z.string().trim().max(255)]).transform((value) => value || null),
  ogTitle: z.union([z.literal(""), z.string().trim().max(180)]).transform((value) => value || null),
  ogDescription: z.union([z.literal(""), z.string().trim().max(320)]).transform((value) => value || null),
  ogImageMediaId: optionalMediaIdSchema,
  twitterTitle: z.union([z.literal(""), z.string().trim().max(180)]).transform((value) => value || null),
  twitterDescription: z.union([z.literal(""), z.string().trim().max(320)]).transform((value) => value || null),
  twitterImageMediaId: optionalMediaIdSchema,
  twitterCard: z.enum(["SUMMARY", "SUMMARY_LARGE_IMAGE"]),
  noindex: z.boolean(),
  nofollow: z.boolean(),
});

export type SeoPagePayload = z.infer<typeof seoPageSchema>;
