import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { AdminMessagesPageSections } from "@/components/sections/admin/messages/admin-messages-page";
import { hasAdminSession } from "@/lib/auth/admin-session";
import { listContactRequests } from "@/lib/cms/contact";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export default async function AdminMessagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isAuthenticated = await hasAdminSession();
  if (!isAuthenticated) redirect(`/${locale}/admin/login`);

  const requests = (await listContactRequests()).map((item) => ({ ...item, createdAt: item.createdAt.toISOString(), updatedAt: item.updatedAt.toISOString() }));
  return <AdminMessagesPageSections locale={locale as Locale} requests={requests} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata(locale, "adminMessages");
}
