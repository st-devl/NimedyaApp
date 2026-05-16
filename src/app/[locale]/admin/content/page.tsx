import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { AdminContentPageSections } from "@/components/sections/admin/content/admin-content-page";
import { hasAdminSession } from "@/lib/auth/admin-session";
import { listContentBlocks, type ContentBlockKey } from "@/lib/cms/content";
import type { ContentBlock } from "@prisma/client";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";

export default async function AdminContentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isAuthenticated = await hasAdminSession();
  if (!isAuthenticated) redirect(`/${locale}/admin/login`);

  const blocks = await listContentBlocks();
  const serializableBlocks = blocks.map((block: ContentBlock) => ({
    id: block.id,
    key: block.key as ContentBlockKey,
    locale: block.locale as "tr" | "en",
    title: block.title,
    slug: block.slug,
    status: block.status,
    sortOrder: block.sortOrder,
    data: block.data,
  }));

  return <AdminContentPageSections blocks={serializableBlocks} locale={locale as Locale} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "adminContent");
}
