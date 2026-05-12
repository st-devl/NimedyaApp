import { AdminDashboardPageSections } from "@/components/sections/admin/admin-dashboard-page";
import { getAdminDashboardContent } from "@/content";
import { prisma } from "@/lib/db/prisma";
import type { Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import type { Metadata } from "next";

async function checkSystemHealth(): Promise<{ api: "online" | "offline"; database: "online" | "offline" }> {
  const apiPromise = fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/health`)
    .then((r) => r.json())
    .then((d): { api: "online" | "offline" } => ({ api: d.status === "ok" ? "online" : "offline" }))
    .catch((): { api: "offline" } => ({ api: "offline" }));

  const dbPromise = fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/db-health`)
    .then((r) => r.json())
    .then((d): { database: "online" | "offline" } => ({ database: d.status === "ok" ? "online" : "offline" }))
    .catch((): { database: "offline" } => ({ database: "offline" }));

  const [apiStatus, dbStatus] = await Promise.all([apiPromise, dbPromise]);
  return { api: apiStatus.api, database: dbStatus.database };
}

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolvedLocale = locale as Locale;
  const content = getAdminDashboardContent(resolvedLocale);
  const [contentBlocks, newMessages, mediaAssets, recentContent, recentMessages, systemStatus] = await Promise.all([
    prisma.contentBlock.count({ where: { status: "PUBLISHED" } }),
    prisma.contactRequest.count({ where: { status: "NEW" } }),
    prisma.mediaAsset.count(),
    prisma.contentBlock.findMany({
      orderBy: { updatedAt: "desc" },
      take: 3,
      select: { key: true, locale: true, status: true, updatedAt: true },
    }),
    prisma.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 2,
      select: { name: true, status: true, createdAt: true },
    }),
    checkSystemHealth(),
  ]);
  const recentRows = [
    ...recentContent.map((item) => ({
      title: `${item.key} / ${item.locale.toUpperCase()}`,
      type: "Icerik",
      date: item.updatedAt.toLocaleDateString("tr-TR"),
      status: item.status === "PUBLISHED" ? "Yayinda" : "Taslak",
    })),
    ...recentMessages.map((item) => ({
      title: item.name,
      type: "Mesaj",
      date: item.createdAt.toLocaleDateString("tr-TR"),
      status: item.status === "NEW" ? "Yeni" : item.status === "READ" ? "Okundu" : "Arsiv",
    })),
  ];

  return (
    <AdminDashboardPageSections
      content={content}
      locale={resolvedLocale}
      metrics={{ contentBlocks, newMessages, mediaAssets }}
      recentRows={recentRows}
      systemStatus={systemStatus}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildManagedMetadata(locale as Locale, "admin");
}
