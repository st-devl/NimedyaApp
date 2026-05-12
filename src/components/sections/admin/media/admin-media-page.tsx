import { AdminSidebar } from "@/components/site/admin-sidebar";
import { AdminMediaLibrary } from "@/components/sections/admin/media/admin-media-library";
import type { Locale } from "@/lib/i18n/config";

type MediaItem = {
  id: number;
  url: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  altText: string | null;
};

type AdminMediaPageProps = {
  locale: Locale;
  media: MediaItem[];
};

export function AdminMediaPageSections({ locale, media }: AdminMediaPageProps) {
  return (
    <div className="flex min-h-screen bg-[color:var(--app-bg)]">
      <AdminSidebar locale={locale} />
      <main className="ml-72 flex-1 p-8 md:p-[80px]">
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--secondary)]">Admin / Medya</p>
          <h1 className="nmd-headline-xl text-[color:var(--primary)]">Medya Kutuphanesi</h1>
          <p className="mt-2 max-w-2xl text-sm text-[color:var(--app-muted)]">
            SEO, site ayarlari ve icerik gorselleri icin guvenli, sade medya yonetimi.
          </p>
        </header>
        <AdminMediaLibrary media={media} />
      </main>
    </div>
  );
}
