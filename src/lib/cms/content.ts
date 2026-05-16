import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { Locale } from "@/lib/i18n/config";

export type ContentBlockKey = "home" | "services" | "productPhotography" | "portfolio" | "about" | "contact" | "homeServices" | "howWeWork";

export type ContentBlockInput = {
  key: ContentBlockKey;
  locale: Locale;
  title?: string | null;
  slug?: string | null;
  status?: "DRAFT" | "PUBLISHED";
  sortOrder?: number;
  data: Prisma.InputJsonValue;
  publishedAt?: Date | null;
};

export const getPublishedContentBlock = cache(async <T>(key: ContentBlockKey, locale: Locale): Promise<T | null> => {
  try {
    const row = await prisma.contentBlock.findUnique({
      where: { key_locale: { key, locale } },
      select: { data: true, status: true },
    });

    if (!row || row.status !== "PUBLISHED") return null;
    return row.data as T;
  } catch {
    return null;
  }
});

export function upsertContentBlock(input: ContentBlockInput) {
  const { key, locale, ...data } = input;

  return prisma.contentBlock.upsert({
    where: { key_locale: { key, locale } },
    update: data,
    create: { key, locale, ...data },
  });
}

export function listContentBlocks(locale?: Locale) {
  return prisma.contentBlock.findMany({
    where: locale ? { locale } : undefined,
    orderBy: [{ locale: "asc" }, { sortOrder: "asc" }, { key: "asc" }],
  });
}
