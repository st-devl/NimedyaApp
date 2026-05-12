import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { hasAdminSession } from "@/lib/auth/admin-session";
import { AdminLoginForm } from "@/components/sections/admin/login/admin-login-form";

export default async function AdminLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isAuthenticated = await hasAdminSession();
  if (isAuthenticated) {
    redirect(`/${locale}/admin`);
  }

  return <AdminLoginForm locale={locale as Locale} />;
}
