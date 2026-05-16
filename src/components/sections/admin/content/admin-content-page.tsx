import { AdminContentManager } from "@/components/sections/admin/content/admin-content-manager";
import type { Locale } from "@/lib/i18n/config";
import type { ContentBlockKey } from "@/lib/cms/content";

type ContentBlockItem = {
  id: number;
  key: ContentBlockKey;
  locale: "tr" | "en";
  title: string | null;
  slug: string | null;
  status: "DRAFT" | "PUBLISHED";
  sortOrder: number;
  data: unknown;
};

// Keys handled by the generic content manager UI (excludes dedicated admin pages)
const managedContentKeys = ["home", "services", "productPhotography", "portfolio", "about", "contact"] as const;
type ManagedContentKey = (typeof managedContentKeys)[number];

export function AdminContentPageSections({ blocks }: { locale: Locale; blocks: ContentBlockItem[] }) {
  const filteredBlocks = blocks.filter((b): b is ContentBlockItem & { key: ManagedContentKey } =>
    (managedContentKeys as readonly string[]).includes(b.key),
  );
  return (
    <>
      <header className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--secondary)]">Admin / Icerik</p>
        <h1 className="nmd-headline-xl text-[color:var(--primary)]">Icerik Yonetimi</h1>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--app-muted)]">
          Mevcut sayfa iceriklerini tek veri kaynagi uzerinden yonetin. JSON yapisini bozmayin; alan adlari frontend kontratidir.
        </p>
      </header>
      <AdminContentManager initialBlocks={filteredBlocks} />
    </>
  );
}
