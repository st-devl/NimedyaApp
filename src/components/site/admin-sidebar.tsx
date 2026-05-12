"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";

const navItems = [
  { labelKey: "Dashboard", routeKey: "admin" as const },
  { labelKey: "Site Ayarları", routeKey: "adminSettings" as const },
  { labelKey: "Medya", routeKey: "adminMedia" as const },
  { labelKey: "SEO", routeKey: "adminSeo" as const },
  { labelKey: "İçerik", routeKey: "adminContent" as const },
  { labelKey: "Mesajlar", routeKey: "adminMessages" as const },
];

export function AdminSidebar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace(`/${locale}/admin/login`);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[color:var(--sidebar-bg)] text-white shadow-2xl">
      <div className="p-8">
        <h1 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold">Nimedya</h1>
        <p className="mt-1 text-xs opacity-70">Admin Control Panel</p>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-4">
        {navItems.map((item) => {
          const href = localizedPath(locale, item.routeKey);
          const isActive = pathname === href || (item.routeKey !== "admin" && pathname.startsWith(href));
          return (
            <Link
              className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-colors ${
                isActive
                  ? "border-l-4 border-[color:var(--sidebar-active-border)] bg-[color:var(--sidebar-active-bg)]"
                  : "hover:bg-white/10"
              }`}
              href={href}
              key={item.routeKey}
            >
              {item.labelKey}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          onClick={handleLogout}
          type="button"
        >
          <span>Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}
