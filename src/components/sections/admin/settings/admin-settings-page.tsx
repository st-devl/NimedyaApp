import { AdminSettingsForm } from "@/components/sections/admin/settings/admin-settings-form";
import type { Locale } from "@/lib/i18n/config";
import type { SiteSettingsView } from "@/lib/cms/settings";

type MediaOption = {
  id: number;
  url: string;
  altText: string | null;
  originalName: string;
};

type AdminSettingsPageProps = {
  locale: Locale;
  settings: SiteSettingsView;
  media: MediaOption[];
};

export function AdminSettingsPageSections({ settings, media }: AdminSettingsPageProps) {
  return (
    <>
      <header className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--secondary)]">Admin / Ayarlar</p>
        <h1 className="nmd-headline-xl text-[color:var(--primary)]">Site Ayarlari</h1>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--app-muted)]">
          Marka, iletisim, sosyal medya ve temel index davranisini tek kaynaktan yonetin.
        </p>
      </header>

      <AdminSettingsForm
        initialSettings={{
          siteName: settings.siteName,
          baseUrl: settings.baseUrl,
          defaultLocale: settings.defaultLocale === "en" ? "en" : "tr",
          contactEmail: settings.contactEmail ?? "",
          contactPhone: settings.contactPhone ?? "",
          contactLocation: settings.contactLocation ?? "",
          socialLinks: settings.socialLinks,
          logoMediaId: settings.logoMediaId,
          faviconMediaId: settings.faviconMediaId,
          defaultOgMediaId: settings.defaultOgMediaId,
          robotsAllowIndex: settings.robotsAllowIndex,
        }}
        media={media}
      />
    </>
  );
}
