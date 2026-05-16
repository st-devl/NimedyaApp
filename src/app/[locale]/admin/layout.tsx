import { headers } from "next/headers";
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

  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? "";
  const isLoginPage = pathname.endsWith("/login");

  const isAuthenticated = await hasAdminSession();

  if (isLoginPage) {
    if (isAuthenticated) redirect(`/${locale}/admin`);
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="flex min-h-screen bg-[color:var(--app-bg)]">
      <AdminSidebar locale={locale as Locale} />
      <main className="ml-72 flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
