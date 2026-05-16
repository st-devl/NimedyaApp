import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { requireAdminSession } from "@/lib/auth/admin-guard";
import { getAiSettings } from "@/lib/cms/settings";
import { AdminAiSettingsPage } from "@/components/sections/admin/admin-ai-settings-page";
import { buildManagedMetadata } from "@/lib/cms/seo";

export default async function AdminAiSettingsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const session = await requireAdminSession();
  if (!session) notFound();

  const settings = await getAiSettings();

  return <AdminAiSettingsPage initial={settings} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildManagedMetadata(locale as Locale, "adminAiSettings");
}
