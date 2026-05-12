import { AdminSidebar } from "@/components/site/admin-sidebar";
import { AdminSeoManager } from "@/components/sections/admin/seo/admin-seo-manager";
import type { Locale } from "@/lib/i18n/config";

type SeoPageItem = {
  id: number;
  routeKey: string;
  locale: "tr" | "en";
  path: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageMediaId: number | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageMediaId: number | null;
  twitterCard: "SUMMARY" | "SUMMARY_LARGE_IMAGE";
  noindex: boolean;
  nofollow: boolean;
};

type MediaOption = {
  id: number;
  url: string;
  altText: string | null;
  originalName: string;
};

type AdminSeoPageProps = {
  locale: Locale;
  pages: SeoPageItem[];
  media: MediaOption[];
};

export function AdminSeoPageSections({ locale, pages, media }: AdminSeoPageProps) {
  return (
    <div className="flex min-h-screen bg-[color:var(--app-bg)]">
      <AdminSidebar locale={locale} />
      <main className="ml-72 flex-1 p-8 md:p-[80px]">
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--secondary)]">Admin / SEO</p>
          <h1 className="nmd-headline-xl text-[color:var(--primary)]">SEO Yonetimi</h1>
          <p className="mt-2 max-w-2xl text-sm text-[color:var(--app-muted)]">
            Sayfa bazli meta, canonical, Open Graph, Twitter/X ve index ayarlarini tek yerden yonetin.
          </p>
        </header>
        <AdminSeoManager initialPages={pages} media={media} />
      </main>
    </div>
  );
}
