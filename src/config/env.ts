import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AI_TRANSLATE_PROVIDER: z.enum(["mock", "openai"]).default("mock"),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_TRANSLATE_MODEL: z.string().default("gpt-4.1-mini"),
  ADMIN_SESSION_SECRET: z.string().min(16, "ADMIN_SESSION_SECRET must be at least 16 chars"),
  ADMIN_SEED_EMAIL: z.string().email("ADMIN_SEED_EMAIL must be a valid email"),
  ADMIN_SEED_PASSWORD: z.string().min(8, "ADMIN_SEED_PASSWORD must be at least 8 chars"),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(["tr", "en"]).default("tr"),
  NEXT_PUBLIC_SUPPORTED_LOCALES: z.string().default("tr,en"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  AI_TRANSLATE_PROVIDER: process.env.AI_TRANSLATE_PROVIDER,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_TRANSLATE_MODEL: process.env.OPENAI_TRANSLATE_MODEL,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
  ADMIN_SEED_EMAIL: process.env.ADMIN_SEED_EMAIL,
  ADMIN_SEED_PASSWORD: process.env.ADMIN_SEED_PASSWORD,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  NEXT_PUBLIC_SUPPORTED_LOCALES: process.env.NEXT_PUBLIC_SUPPORTED_LOCALES,
});
