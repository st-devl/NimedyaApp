"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextInput, TextArea } from "@/components/ui/input";
import { MediaPicker } from "@/components/ui/media-picker";
import { BrandsSection } from "@/components/sections/home/brands-section";
import type { Locale } from "@/lib/i18n/config";
import type { HomeContent } from "@/types/content";

type Brand = { name: string; sector: string; description?: string; imageUrl?: string };
type SaveStatus = "idle" | "saving" | "ok" | "error";

type Props = {
  locale: Locale;
  initialBrandsTitle: string;
  initialBrandsHeading?: string;
  initialBrandsSub?: string;
  initialBrands: Brand[];
  fullHomeContent: HomeContent;
};

function roleLabel(index: number) {
  if (index === 0) return { text: "Öne Çıkan Kart", color: "bg-[color:var(--secondary)]/10 text-[color:var(--secondary)]" };
  if (index === 1 || index === 2) return { text: "Mini Kart", color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" };
  return { text: "Logo Şeridinde", color: "bg-[color:var(--surface-container)] text-[color:var(--app-muted)]" };
}

export function AdminBrandsPage({ locale, initialBrandsTitle, initialBrandsHeading, initialBrandsSub, initialBrands, fullHomeContent }: Props) {
  const [brandsTitle, setBrandsTitle] = useState(initialBrandsTitle || "Çalıştığımız Markalar");
  const [brandsHeading, setBrandsHeading] = useState(initialBrandsHeading || "");
  const [brandsSub, setBrandsSub] = useState(initialBrandsSub || "");
  const [brands, setBrands] = useState<Brand[]>(
    initialBrands.length > 0 ? initialBrands : [{ name: "", sector: "", description: "", imageUrl: "" }]
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [showPreview, setShowPreview] = useState(false);

  const update = (i: number, field: keyof Brand, value: string) =>
    setBrands((prev) => prev.map((b, idx) => (idx === i ? { ...b, [field]: value } : b)));

  const add = () => setBrands((prev) => [...prev, { name: "", sector: "", description: "", imageUrl: "" }]);

  const remove = (i: number) => {
    if (brands.length <= 1) return;
    setBrands((prev) => prev.filter((_, idx) => idx !== i));
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    setBrands((prev) => {
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
  };

  const moveDown = (i: number) => {
    if (i === brands.length - 1) return;
    setBrands((prev) => {
      const next = [...prev];
      [next[i], next[i + 1]] = [next[i + 1], next[i]];
      return next;
    });
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "home",
          locale,
          title: "",
          slug: "",
          status: "PUBLISHED",
          sortOrder: 0,
          data: { ...fullHomeContent, brandsTitle, brandsHeading, brandsSub, brands },
        }),
      });
      setSaveStatus(res.ok ? "ok" : "error");
    } catch {
      setSaveStatus("error");
    }
  };

  const validBrands = brands.filter((b) => b.name.trim());

  return (
    <main className="nmd-container nmd-page-x py-12">
      {/* Header */}
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <nav className="mb-3 flex items-center gap-2 text-xs text-[color:var(--app-muted)]">
            <span>Admin</span>
            <span>/</span>
            <span className="font-semibold text-[color:var(--secondary)]">Markalar</span>
          </nav>
          <h1 className="nmd-headline-xl text-[color:var(--primary)]">Çalıştığımız Markalar</h1>
          <p className="mt-2 max-w-xl text-sm text-[color:var(--app-muted)]">
            Ana sayfada görünen marka listesini yönetin. İlk marka büyük featured panelde, 2. ve 3. marka mini kartlarda, diğerleri logo şeridinde görünür.
          </p>
        </div>
        <button
          className="rounded-xl border border-[color:var(--app-border)] px-4 py-2 text-sm font-semibold text-[color:var(--primary)] transition hover:bg-[color:var(--surface-container)]"
          onClick={() => setShowPreview((v) => !v)}
          type="button"
        >
          {showPreview ? "Önizlemeyi Kapat" : "Önizlemeyi Aç"}
        </button>
      </header>

      <div className={`grid gap-8 ${showPreview ? "xl:grid-cols-[480px_1fr]" : ""}`}>
        {/* ── Form ── */}
        <div className="space-y-6">
          {/* Section texts */}
          <div className="space-y-4 rounded-2xl border border-[color:var(--app-border)] bg-[color:var(--app-card)] p-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">
                Bölüm Etiketi <span className="font-normal opacity-60">— &ldquo;Çalıştığımız Markalar&rdquo;</span>
              </label>
              <TextInput
                placeholder="Çalıştığımız Markalar"
                value={brandsTitle}
                onChange={(e) => setBrandsTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">
                Ana Başlık <span className="font-normal opacity-60">— &ldquo;Markaların dijital yüzünü...&rdquo;</span>
              </label>
              <TextInput
                placeholder="Markaların dijital yüzünü birlikte güçlendiriyoruz."
                value={brandsHeading}
                onChange={(e) => setBrandsHeading(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">
                Alt Metin
              </label>
              <TextArea
                className="h-20"
                placeholder="Büyüme aşamasındaki markalar için..."
                value={brandsSub}
                onChange={(e) => setBrandsSub(e.target.value)}
              />
            </div>
          </div>

          {/* Role legend */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { text: "1. sıra → Öne Çıkan Kart (büyük, koyu)", color: "bg-[color:var(--secondary)]/10 text-[color:var(--secondary)]" },
              { text: "2–3. sıra → Mini Kart", color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
              { text: "4+. sıra → Sadece Logo Şeridinde", color: "bg-[color:var(--surface-container)] text-[color:var(--app-muted)]" },
            ].map((r) => (
              <span key={r.text} className={`rounded-full px-3 py-1 font-semibold ${r.color}`}>{r.text}</span>
            ))}
          </div>

          {/* Brand cards */}
          <div className="space-y-3">
            {brands.map((brand, i) => {
              const role = roleLabel(i);
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-[color:var(--app-border)] bg-[color:var(--app-card)] p-4 transition hover:shadow-md"
                >
                  {/* top bar */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--surface-container)] text-xs font-bold text-[color:var(--app-muted)]">
                        {i + 1}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${role.color}`}>
                        {role.text}
                      </span>
                    </div>
                    {/* order + delete */}
                    <div className="flex items-center gap-1">
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-[color:var(--app-muted)] hover:bg-[color:var(--surface-container)] disabled:opacity-25"
                        disabled={i === 0}
                        onClick={() => moveUp(i)}
                        title="Yukarı taşı"
                        type="button"
                      >
                        ↑
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-[color:var(--app-muted)] hover:bg-[color:var(--surface-container)] disabled:opacity-25"
                        disabled={i === brands.length - 1}
                        onClick={() => moveDown(i)}
                        title="Aşağı taşı"
                        type="button"
                      >
                        ↓
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 disabled:opacity-25 dark:hover:bg-red-950"
                        disabled={brands.length <= 1}
                        onClick={() => remove(i)}
                        title="Sil"
                        type="button"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[color:var(--app-muted)]">Marka Adı</label>
                      <TextInput
                        placeholder="Ör. Lunessa Home"
                        value={brand.name}
                        onChange={(e) => update(i, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[color:var(--app-muted)]">Sektör</label>
                      <TextInput
                        placeholder="Ör. Lifestyle · E-Ticaret"
                        value={brand.sector}
                        onChange={(e) => update(i, "sector", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Description + image — only for featured (0) and mini cards (1,2) */}
                  {i < 3 && (
                    <div className="mt-3 space-y-3 border-t border-[color:var(--app-border)] pt-3">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[color:var(--app-muted)]">Açıklama</label>
                        <TextArea
                          className="h-16 text-xs"
                          placeholder="Kart üzerinde görünecek kısa açıklama"
                          value={brand.description ?? ""}
                          onChange={(e) => update(i, "description", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[color:var(--app-muted)]">
                          Görsel {i === 0 ? "(Öne Çıkan Kart arka planı)" : "(Mini kart — henüz kullanılmıyor)"}
                        </label>
                        <div className="flex gap-2">
                          <TextInput
                            placeholder="https://... veya /uploads/..."
                            value={brand.imageUrl ?? ""}
                            onChange={(e) => update(i, "imageUrl", e.target.value)}
                          />
                          <MediaPicker
                            value={brand.imageUrl ?? ""}
                            onChange={(url) => update(i, "imageUrl", url)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add */}
          <button
            className="w-full rounded-2xl border-2 border-dashed border-[color:var(--app-border)] py-3 text-sm font-semibold text-[color:var(--app-muted)] transition hover:border-[color:var(--secondary)] hover:text-[color:var(--secondary)]"
            onClick={add}
            type="button"
          >
            + Marka Ekle
          </button>

          {/* Save */}
          <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-5 py-4">
            <Button disabled={saveStatus === "saving"} onClick={handleSave}>
              {saveStatus === "saving" ? "Kaydediliyor..." : "Kaydet"}
            </Button>
            {saveStatus === "ok" && (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
                <span>✓</span> Kaydedildi
              </span>
            )}
            {saveStatus === "error" && (
              <span className="text-sm font-semibold text-red-600">Hata oluştu, tekrar deneyin.</span>
            )}
            <span className="ml-auto text-xs text-[color:var(--app-muted)]">{brands.length} marka</span>
          </div>
        </div>

        {/* ── Live preview ── */}
        {showPreview && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">
              Canlı Önizleme
            </p>
            <div className="overflow-hidden rounded-2xl border border-[color:var(--app-border)] shadow-lg">
              <BrandsSection
                brands={validBrands.length > 0 ? validBrands : [{ name: "Örnek Marka", sector: "Sektör" }]}
                brandsHeading={brandsHeading}
                brandsSub={brandsSub}
                brandsTitle={brandsTitle}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
