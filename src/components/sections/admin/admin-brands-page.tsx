"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextInput } from "@/components/ui/input";
import type { Locale } from "@/lib/i18n/config";
import type { HomeContent } from "@/types/content";

type Brand = { name: string; sector: string };

type Props = {
  locale: Locale;
  initialBrandsTitle: string;
  initialBrands: Brand[];
  fullHomeContent: HomeContent;
};

type SaveStatus = "idle" | "saving" | "ok" | "error";

export function AdminBrandsPage({ locale, initialBrandsTitle, initialBrands, fullHomeContent }: Props) {
  const [brandsTitle, setBrandsTitle] = useState(initialBrandsTitle);
  const [brands, setBrands] = useState<Brand[]>(initialBrands.length > 0 ? initialBrands : [{ name: "", sector: "" }]);
  const [status, setStatus] = useState<SaveStatus>("idle");

  const updateBrand = (i: number, field: keyof Brand, value: string) => {
    setBrands((prev) => prev.map((b, idx) => idx === i ? { ...b, [field]: value } : b));
  };

  const addBrand = () => setBrands((prev) => [...prev, { name: "", sector: "" }]);

  const removeBrand = (i: number) => {
    if (brands.length <= 1) return;
    setBrands((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSave = async () => {
    setStatus("saving");
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
          data: { ...fullHomeContent, brandsTitle, brands },
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="nmd-container nmd-page-x py-12">
      <header className="mb-10">
        <nav className="mb-4 flex items-center gap-2 text-xs text-[color:var(--app-muted)]">
          <span>Admin</span>
          <span>/</span>
          <span className="font-semibold text-[color:var(--secondary)]">Markalar</span>
        </nav>
        <h1 className="nmd-headline-xl text-[color:var(--primary)]">Çalıştığımız Markalar</h1>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--app-muted)]">Ana sayfada görünen marka listesini düzenleyin.</p>
      </header>

      <Card className="max-w-2xl p-6">
        <div className="mb-6">
          <label className="mb-1 block text-sm font-semibold text-[color:var(--app-muted)]">Bölüm Başlığı</label>
          <TextInput
            placeholder="Çalıştığımız Markalar"
            value={brandsTitle}
            onChange={(e) => setBrandsTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <p className="mb-3 text-sm font-semibold text-[color:var(--app-muted)]">Markalar</p>
          <div className="grid gap-3">
            <div className="grid grid-cols-[1fr_1fr_32px] gap-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]">
              <span>Marka Adı</span>
              <span>Sektör</span>
              <span />
            </div>
            {brands.map((brand, i) => (
              <div className="grid grid-cols-[1fr_1fr_32px] items-center gap-2" key={i}>
                <TextInput
                  placeholder="Ör. Lunessa Home"
                  value={brand.name}
                  onChange={(e) => updateBrand(i, "name", e.target.value)}
                />
                <TextInput
                  placeholder="Ör. Lifestyle · E-Ticaret"
                  value={brand.sector}
                  onChange={(e) => updateBrand(i, "sector", e.target.value)}
                />
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-md text-sm text-[color:var(--error)] hover:bg-red-50 disabled:opacity-30 dark:hover:bg-red-950"
                  disabled={brands.length <= 1}
                  onClick={() => removeBrand(i)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-4 w-full rounded-xl border border-dashed border-[color:var(--app-border)] py-2.5 text-sm text-[color:var(--app-muted)] transition hover:border-[color:var(--secondary)] hover:text-[color:var(--secondary)]"
            onClick={addBrand}
            type="button"
          >
            + Marka Ekle
          </button>
        </div>

        <div className="mt-6 flex items-center gap-4 border-t border-[color:var(--app-border)] pt-6">
          <Button disabled={status === "saving"} onClick={handleSave}>
            {status === "saving" ? "Kaydediliyor..." : "Kaydet"}
          </Button>
          {status === "ok" && <span className="text-sm text-green-600">✓ Kaydedildi</span>}
          {status === "error" && <span className="text-sm text-red-600">Hata oluştu</span>}
        </div>
      </Card>
    </main>
  );
}
