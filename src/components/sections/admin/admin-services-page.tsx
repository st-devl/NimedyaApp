"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";
import { MediaPicker } from "@/components/ui/media-picker";
import type { HomeServicesContent, ServiceCard } from "@/types/content";

type Locale = "tr" | "en";

type Status = { type: "idle" } | { type: "saving" } | { type: "translating" } | { type: "success"; message: string } | { type: "error"; message: string };

const defaultServices: [ServiceCard, ServiceCard, ServiceCard, ServiceCard] = [
  { title: "", description: "", imageUrl: "", cta: "" },
  { title: "", description: "", imageUrl: "", cta: "" },
  { title: "", description: "", imageUrl: "", cta: "" },
  { title: "", description: "", imageUrl: "", cta: "" },
];

function parseContent(raw: unknown): HomeServicesContent {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const r = raw as Record<string, unknown>;
    const services = Array.isArray(r.services) ? r.services : [];
    const filled: [ServiceCard, ServiceCard, ServiceCard, ServiceCard] = [0, 1, 2, 3].map((i) => {
      const s = services[i] as Record<string, unknown> | undefined;
      return { title: String(s?.title ?? ""), description: String(s?.description ?? ""), imageUrl: String(s?.imageUrl ?? ""), cta: String(s?.cta ?? "") };
    }) as [ServiceCard, ServiceCard, ServiceCard, ServiceCard];
    return { sectionLabel: String(r.sectionLabel ?? ""), sectionTitle: String(r.sectionTitle ?? ""), services: filled };
  }
  return { sectionLabel: "", sectionTitle: "", services: defaultServices };
}

type InitialBlock = { locale: Locale; data: unknown; status: "DRAFT" | "PUBLISHED" };

type Props = { initialBlocks: InitialBlock[] };

export function AdminServicesPage({ initialBlocks }: Props) {
  const router = useRouter();
  const [activeLocale, setActiveLocale] = useState<Locale>("tr");
  const [forms, setForms] = useState<Record<Locale, HomeServicesContent>>({
    tr: parseContent(initialBlocks.find((b) => b.locale === "tr")?.data),
    en: parseContent(initialBlocks.find((b) => b.locale === "en")?.data),
  });
  const [statuses, setStatuses] = useState<Record<Locale, "DRAFT" | "PUBLISHED">>({
    tr: (initialBlocks.find((b) => b.locale === "tr")?.status ?? "PUBLISHED") as "DRAFT" | "PUBLISHED",
    en: (initialBlocks.find((b) => b.locale === "en")?.status ?? "PUBLISHED") as "DRAFT" | "PUBLISHED",
  });
  const [opStatus, setOpStatus] = useState<Status>({ type: "idle" });

  const form = forms[activeLocale];
  const setForm = (next: HomeServicesContent) => setForms((prev) => ({ ...prev, [activeLocale]: next }));

  const setField = (field: keyof HomeServicesContent, value: string) => setForm({ ...form, [field]: value });

  const setService = (i: number, field: keyof ServiceCard, value: string) => {
    const next = form.services.map((s, idx) => idx === i ? { ...s, [field]: value } : s) as [ServiceCard, ServiceCard, ServiceCard, ServiceCard];
    setForm({ ...form, services: next });
  };

  const translate = async () => {
    setOpStatus({ type: "translating" });
    const res = await fetch("/api/admin/translate-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: forms.tr }),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; data?: unknown; error?: string };
    if (!res.ok || !json.ok) {
      setOpStatus({ type: "error", message: json.error ?? "Çeviri başarısız." });
      return;
    }
    setForms((prev) => ({ ...prev, en: parseContent(json.data) }));
    setActiveLocale("en");
    setOpStatus({ type: "success", message: "Çeviri tamamlandı — EN sekmesine geçildi. İnceleyip kaydedin." });
  };

  const save = async () => {
    setOpStatus({ type: "saving" });
    const res = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "homeServices", locale: activeLocale, title: "Kreatif Çözümler", slug: "", status: statuses[activeLocale], sortOrder: 10, data: form }),
    });
    if (!res.ok) { setOpStatus({ type: "error", message: "Kaydedilemedi." }); return; }
    router.refresh();
    setOpStatus({ type: "success", message: `${activeLocale.toUpperCase()} içeriği kaydedildi.` });
  };

  const isBusy = opStatus.type === "saving" || opStatus.type === "translating";

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[color:var(--primary)]">Kreatif Çözümler</h1>
          <p className="mt-1 text-sm text-[color:var(--app-muted)]">Ana sayfadaki hizmetler bölümünü düzenleyin.</p>
        </div>
        <div className="flex gap-2">
          {(["tr", "en"] as Locale[]).map((loc) => (
            <button
              key={loc}
              onClick={() => setActiveLocale(loc)}
              type="button"
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${activeLocale === loc ? "bg-[color:var(--primary)] text-[color:var(--on-primary)]" : "bg-[color:var(--surface-container)] text-[color:var(--app-muted)] hover:text-[color:var(--primary)]"}`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Status feedback */}
      {opStatus.type === "success" && <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300">{opStatus.message}</div>}
      {opStatus.type === "error" && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">{opStatus.message}</div>}

      {/* Bölüm başlığı */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-[color:var(--primary)]">Bölüm Başlığı</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]">Etiket</label>
            <TextInput placeholder="KREATİF ÇÖZÜMLER" value={form.sectionLabel} onChange={(e) => setField("sectionLabel", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]">Başlık</label>
            <TextInput placeholder="Neler yapıyoruz" value={form.sectionTitle} onChange={(e) => setField("sectionTitle", e.target.value)} />
          </div>
        </div>
      </Card>

      {/* Servis kartları */}
      {form.services.map((service, i) => (
        <Card className="p-6" key={i}>
          <h2 className="mb-4 text-lg font-semibold text-[color:var(--primary)]">Kart {i + 1}</h2>
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]">Başlık</label>
              <TextInput value={service.title} onChange={(e) => setService(i, "title", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]">Açıklama</label>
              <TextArea className="h-24" value={service.description} onChange={(e) => setService(i, "description", e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]">Görsel</label>
              <div className="flex gap-2">
                <TextInput className="flex-1" placeholder="URL veya galeriden seç" value={service.imageUrl} onChange={(e) => setService(i, "imageUrl", e.target.value)} />
                <MediaPicker value={service.imageUrl} onChange={(url) => setService(i, "imageUrl", url)} />
              </div>
              {service.imageUrl && (
                <div className="mt-2 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="önizleme" className="h-14 w-20 rounded border border-[color:var(--app-border)] object-cover" src={service.imageUrl} />
                  <p className="truncate text-xs text-[color:var(--app-muted)]">{service.imageUrl}</p>
                </div>
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]">CTA Metni <span className="normal-case font-normal">(opsiyonel, ör: KEŞFET)</span></label>
              <TextInput placeholder="KEŞFET" value={service.cta} onChange={(e) => setService(i, "cta", e.target.value)} />
            </div>
          </div>
        </Card>
      ))}

      {/* Footer actions */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-[color:var(--app-muted)]">Durum:</label>
            <select
              className="rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm"
              value={statuses[activeLocale]}
              onChange={(e) => setStatuses((prev) => ({ ...prev, [activeLocale]: e.target.value as "DRAFT" | "PUBLISHED" }))}
            >
              <option value="DRAFT">Taslak</option>
              <option value="PUBLISHED">Yayında</option>
            </select>
            {activeLocale === "tr" && (
              <Button disabled={isBusy} onClick={translate} variant="secondary">
                {opStatus.type === "translating" ? "Çevriliyor..." : "AI ile EN'e Çevir"}
              </Button>
            )}
          </div>
          <Button disabled={isBusy} onClick={save} size="lg">
            {opStatus.type === "saving" ? "Kaydediliyor..." : `${activeLocale.toUpperCase()} Kaydet`}
          </Button>
        </div>
      </Card>
    </div>
  );
}
