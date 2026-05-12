import Link from "next/link";
import type { AdminDashboardContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";

type AdminDashboardPageProps = {
  locale: Locale;
  content: AdminDashboardContent;
  metrics: {
    contentBlocks: number;
    newMessages: number;
    mediaAssets: number;
  };
  recentRows: Array<{
    title: string;
    type: string;
    date: string;
    status: string;
  }>;
};

export function AdminDashboardPageSections({ locale, content, metrics, recentRows }: AdminDashboardPageProps) {
  return (
    <>
        <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="nmd-headline-xl text-[color:var(--primary)]">{content.title}</h1>
            <p className="mt-2 nmd-body-md text-[color:var(--app-muted)]">{content.subtitle}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="text-3xl text-[color:var(--primary)]">🔔</span>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b90c17] text-[10px] font-bold text-[color:var(--on-primary)]">{metrics.newMessages}</span>
            </div>
            <Link className="inline-block nmd-transition rounded-xl bg-[color:var(--primary)] px-6 py-3 font-semibold text-[color:var(--on-primary)] hover:-translate-y-1" href={localizedPath(locale, "adminContent")}>Yeni Icerik Ekle</Link>
          </div>
        </header>

        <section className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <article className="nmd-transition flex justify-between rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-8 shadow-sm hover:-translate-y-1">
            <div>
              <p className="nmd-label-sm uppercase text-[color:var(--app-muted)]">{content.stats.projects}</p>
              <h2 className="mt-2 text-4xl font-bold text-[color:var(--primary)]">{metrics.contentBlocks}</h2>
              <p className="mt-2 text-sm font-semibold text-[color:var(--secondary)]">Yayindaki bloklar</p>
            </div>
            <div className="h-14 w-14 rounded-full bg-[#cae6ff]" />
          </article>
          <article className="nmd-transition flex justify-between rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-8 shadow-sm hover:-translate-y-1">
            <div>
              <p className="nmd-label-sm uppercase text-[color:var(--app-muted)]">{content.stats.messages}</p>
              <h2 className="mt-2 text-4xl font-bold text-[color:var(--primary)]">{metrics.newMessages}</h2>
              <p className="mt-2 text-sm font-semibold text-[#003049]">Yeni mesaj</p>
            </div>
            <div className="h-14 w-14 rounded-full bg-[#ffdad6]" />
          </article>
          <article className="nmd-transition flex justify-between rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-8 shadow-sm hover:-translate-y-1">
            <div>
              <p className="nmd-label-sm uppercase text-[color:var(--app-muted)]">{content.stats.posts}</p>
              <h2 className="mt-2 text-4xl font-bold text-[color:var(--primary)]">{metrics.mediaAssets}</h2>
              <p className="mt-2 text-sm font-semibold text-[#003049]">Medya dosyasi</p>
            </div>
            <div className="h-14 w-14 rounded-full bg-[#eeedf0]" />
          </article>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[color:var(--app-border)]/30 px-6 py-4">
              <h3 className="nmd-headline-md text-[24px] text-[color:var(--primary)]">{content.tableTitle}</h3>
              <button className="text-sm font-semibold text-[color:var(--secondary)]">{content.tableViewAll}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[color:var(--surface-container-low)]">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">Baslik</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">Tip</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">Tarih</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c7cd]/20">
                  {recentRows.map((row) => (
                    <tr className="hover:bg-[color:var(--app-bg)]" key={`${row.type}-${row.title}-${row.date}`}>
                      <td className="px-6 py-4 font-semibold text-[color:var(--primary)]">{row.title}</td>
                      <td className="px-6 py-4 text-[color:var(--app-muted)]">{row.type}</td>
                      <td className="px-6 py-4 text-[color:var(--app-muted)]">{row.date}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row.status === "Yayinda" ? "bg-green-100 text-green-700" : row.status === "Taslak" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-[color:var(--primary)]">{content.quickActions}</h4>
              <div className="mt-4 space-y-3">
                <Link className="block rounded-lg bg-[color:var(--primary)] px-4 py-3 text-left text-sm font-semibold text-[color:var(--on-primary)] nmd-transition hover:opacity-90" href={localizedPath(locale, "adminContent")}>Yeni Icerik Duzenle</Link>
                <Link className="block rounded-lg bg-[color:var(--surface-container-low)] px-4 py-3 text-left text-sm font-semibold text-[color:var(--primary)] nmd-transition hover:opacity-90" href={localizedPath(locale, "adminMedia")}>Medya Yukle</Link>
                <Link className="block rounded-lg bg-[color:var(--surface-container-low)] px-4 py-3 text-left text-sm font-semibold text-[color:var(--primary)] nmd-transition hover:opacity-90" href={localizedPath(locale, "adminSeo")}>SEO Duzenle</Link>
              </div>
            </div>

            <div className="rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-[color:var(--primary)]">{content.systemStatus}</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center justify-between"><span>API</span><span className="font-semibold text-green-600">Online</span></li>
                <li className="flex items-center justify-between"><span>Database</span><span className="font-semibold text-green-600">Online</span></li>
                <li className="flex items-center justify-between"><span>Deploy</span><span className="font-semibold text-yellow-600">Beklemede</span></li>
              </ul>
            </div>
          </aside>
        </section>
    </>
  );
}
