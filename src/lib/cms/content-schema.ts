import { z } from "zod";
import { locales } from "@/lib/i18n/config";

export const contentBlockKeys = ["home", "services", "productPhotography", "portfolio", "about", "contact"] as const;

const localeValues = [...locales] as ["tr", "en"];

const jsonValueSchema: z.ZodType<unknown> = z.lazy(() =>
  z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(jsonValueSchema), z.record(z.string(), jsonValueSchema)]),
);

export const contentBlockSchema = z.object({
  key: z.enum(contentBlockKeys),
  locale: z.enum(localeValues),
  title: z.union([z.literal(""), z.string().trim().max(190)]).transform((value) => value || null),
  slug: z.union([z.literal(""), z.string().trim().max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]).transform((value) => value || null),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  sortOrder: z.number().int().min(0).max(10000),
  data: jsonValueSchema,
});
