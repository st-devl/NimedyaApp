import { notFound, redirect } from "next/navigation";
import { AdminSidebar } from "@/components/site/admin-sidebar";
import { hasAdminSession } from "@/lib/auth/admin-session";
import { isLocale, type Locale } from "@/lib/i18n/config";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isAuthenticated = await hasAdminSession();
  if (!isAuthenticated) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="flex min-h-screen bg-[color:var(--app-bg)]">
      <AdminSidebar locale={locale as Locale} />
      <main className="ml-72 flex-1 p-8 md:p-[80px]">{children}</main>
    </div>
  );
}
