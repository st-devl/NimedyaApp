import { AdminUsersPage } from "@/components/sections/admin/admin-users-page";
import { prisma } from "@/lib/db/prisma";
import type { Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { requireAdminSession } from "@/lib/auth/admin-guard";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export default async function AdminUsersServerPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // locale handled by layout

  const session = await requireAdminSession();
  // Only ADMIN role can manage users
  if (!session || session.role !== "ADMIN") notFound();

  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, role: true, isActive: true, createdAt: true },
  });

  return (
    <AdminUsersPage
      currentUserId={session.userId}
      initialUsers={users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }))}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildManagedMetadata(locale as Locale, "adminUsers");
}
