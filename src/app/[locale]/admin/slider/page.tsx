import { notFound, redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/auth/admin-session";
import { isLocale, type Locale } from "@/lib/i18n/config";

export default async function AdminSliderPage({
  params,
}: {
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
      <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 px-8 py-6 dark:border-yellow-700 dark:bg-yellow-950">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-700 dark:text-yellow-400">Yapım Aşamasında</p>
          <h1 className="mt-2 text-2xl font-bold text-[color:var(--primary)]">Slider Yönetimi</h1>
          <p className="mt-2 max-w-sm text-sm text-[color:var(--app-muted)]">
            Bu özellik henüz tamamlanmadı. Yakında kullanıma açılacak.
          </p>
        </div>
        <a
          className="mt-2 text-sm font-semibold text-[color:var(--secondary)] underline underline-offset-4"
          href={`/${locale as Locale}/admin`}
        >
          Dashboard&apos;a dön
        </a>
      </main>
    </div>
  );
}
