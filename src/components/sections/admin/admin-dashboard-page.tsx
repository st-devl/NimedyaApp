import Link from "next/link";
import type { AdminDashboardContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";

type StatusKey = "published" | "draft" | "new" | "read" | "archived";

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
    statusKey: StatusKey;
  }>;
  systemStatus?: {
    api: "online" | "offline";
    database: "online" | "offline";
  };
};

const statusBadgeClass: Record<StatusKey, string> = {
  published: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  new: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  read: "bg-[color:var(--surface-container)] text-[color:var(--app-muted)]",
  archived: "bg-[color:var(--surface-container)] text-[color:var(--on-surface-variant)]",
};

export function AdminDashboardPageSections({ locale, content, metrics, recentRows, systemStatus }: AdminDashboardPageProps) {
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
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--secondary)] text-[10px] font-bold text-[color:var(--on-primary)]">{metrics.newMessages}</span>
            </div>
            <Link className="inline-block nmd-transition rounded-xl bg-[color:var(--primary)] px-6 py-3 font-semibold text-[color:var(--on-primary)] hover:-translate-y-1" href={localizedPath(locale, "adminContent")}>{content.actions.addContent}</Link>
          </div>
        </header>

        <section className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <article className="nmd-transition flex justify-between rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-8 shadow-sm hover:-translate-y-1">
            <div>
              <p className="nmd-label-sm uppercase text-[color:var(--app-muted)]">{content.stats.projects}</p>
              <h2 className="mt-2 text-4xl font-bold text-[color:var(--primary)]">{metrics.contentBlocks}</h2>
              <p className="mt-2 text-sm font-semibold text-[color:var(--secondary)]">{content.stats.publishedHint}</p>
            </div>
            <div className="h-14 w-14 rounded-full bg-[color:var(--metric-primary-accent)]" />
          </article>
          <article className="nmd-transition flex justify-between rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-8 shadow-sm hover:-translate-y-1">
            <div>
              <p className="nmd-label-sm uppercase text-[color:var(--app-muted)]">{content.stats.messages}</p>
              <h2 className="mt-2 text-4xl font-bold text-[color:var(--primary)]">{metrics.newMessages}</h2>
              <p className="mt-2 text-sm font-semibold text-[color:var(--primary-container)]">{content.stats.newMessageHint}</p>
            </div>
            <div className="h-14 w-14 rounded-full bg-[color:var(--metric-secondary-accent)]" />
          </article>
          <article className="nmd-transition flex justify-between rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-8 shadow-sm hover:-translate-y-1">
            <div>
              <p className="nmd-label-sm uppercase text-[color:var(--app-muted)]">{content.stats.posts}</p>
              <h2 className="mt-2 text-4xl font-bold text-[color:var(--primary)]">{metrics.mediaAssets}</h2>
              <p className="mt-2 text-sm font-semibold text-[color:var(--primary-container)]">{content.stats.mediaFilesHint}</p>
            </div>
            <div className="h-14 w-14 rounded-full bg-[color:var(--metric-tertiary-accent)]" />
          </article>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[color:var(--app-border)]/30 px-6 py-4">
              <h3 className="nmd-headline-md text-[24px] text-[color:var(--primary)]">{content.table.sectionTitle}</h3>
              <button className="text-sm font-semibold text-[color:var(--secondary)]">{content.table.viewAll}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[color:var(--surface-container-low)]">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">{content.table.colTitle}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">{content.table.colType}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">{content.table.colDate}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">{content.table.colStatus}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--outline-variant)]/20">
                  {recentRows.map((row) => (
                    <tr className="hover:bg-[color:var(--app-bg)]" key={`${row.type}-${row.title}-${row.date}`}>
                      <td className="px-6 py-4 font-semibold text-[color:var(--primary)]">{row.title}</td>
                      <td className="px-6 py-4 text-[color:var(--app-muted)]">{row.type}</td>
                      <td className="px-6 py-4 text-[color:var(--app-muted)]">{row.date}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass[row.statusKey]}`}>
                          {content.statusLabels[row.statusKey]}
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
                <Link className="block rounded-lg bg-[color:var(--primary)] px-4 py-3 text-left text-sm font-semibold text-[color:var(--on-primary)] nmd-transition hover:opacity-90" href={localizedPath(locale, "adminContent")}>{content.actions.editContent}</Link>
                <Link className="block rounded-lg bg-[color:var(--surface-container-low)] px-4 py-3 text-left text-sm font-semibold text-[color:var(--primary)] nmd-transition hover:opacity-90" href={localizedPath(locale, "adminMedia")}>{content.actions.uploadMedia}</Link>
                <Link className="block rounded-lg bg-[color:var(--surface-container-low)] px-4 py-3 text-left text-sm font-semibold text-[color:var(--primary)] nmd-transition hover:opacity-90" href={localizedPath(locale, "adminSeo")}>{content.actions.editSeo}</Link>
              </div>
            </div>

            <div className="rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-[color:var(--primary)]">{content.systemStatus}</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <span>{content.system.api}</span>
                  <span className={`font-semibold ${systemStatus?.api === "online" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {systemStatus?.api === "online" ? content.system.online : content.system.offline}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>{content.system.database}</span>
                  <span className={`font-semibold ${systemStatus?.database === "online" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {systemStatus?.database === "online" ? content.system.online : content.system.offline}
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </section>
    </>
  );
}
