"use client";

import { useState } from "react";
import { getAdminSliderContent } from "@/content";
import type { Locale } from "@/lib/i18n/config";
import type { TranslateResponse } from "@/lib/ai/translate-types";
import { Button } from "@/components/ui/button";
import { SliderTable } from "@/components/sections/admin/slider/slider-table";
import { SliderForm } from "@/components/sections/admin/slider/slider-form";
import { SliderPreview } from "@/components/sections/admin/slider/slider-preview";
import type { SliderItem, SliderFormState, TranslateStatus } from "@/components/sections/admin/slider/types";

const EMPTY_FORM: SliderFormState = {
  trTitle: "",
  trDescription: "",
  enTitle: "",
  enDescription: "",
  imageUrl: "",
  linkUrl: "",
  status: "DRAFT",
};

type AdminSliderPageSectionsProps = {
  locale: Locale;
  initialItems: SliderItem[];
  sliderIntervalSeconds: number;
};

export function AdminSliderPageSections({ locale, initialItems, sliderIntervalSeconds }: AdminSliderPageSectionsProps) {
  const t = getAdminSliderContent(locale);

  const [items, setItems] = useState<SliderItem[]>(initialItems);
  const [editingItem, setEditingItem] = useState<SliderItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [intervalInput, setIntervalInput] = useState(sliderIntervalSeconds);
  const [intervalSaving, setIntervalSaving] = useState(false);
  const [intervalStatus, setIntervalStatus] = useState<"idle" | "ok" | "error">("idle");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SliderFormState>(EMPTY_FORM);
  const [translateStatus, setTranslateStatus] = useState<TranslateStatus>({ type: "idle" });
  const [lastPayload, setLastPayload] = useState<{ title: string; description: string } | null>(null);
  const [protectManualEnFields, setProtectManualEnFields] = useState(true);
  const [enTouched, setEnTouched] = useState({ enTitle: false, enDescription: false });
  const [apiError, setApiError] = useState<string | null>(null);

  const openCreate = () => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setTranslateStatus({ type: "idle" });
    setEnTouched({ enTitle: false, enDescription: false });
    setApiError(null);
    setShowForm(true);
  };

  const openEdit = (item: SliderItem) => {
    setEditingItem(item);
    setForm({
      trTitle: item.trTitle,
      trDescription: item.trDescription,
      enTitle: item.enTitle,
      enDescription: item.enDescription,
      imageUrl: item.imageUrl ?? "",
      linkUrl: item.linkUrl ?? "",
      status: item.status,
    });
    setTranslateStatus({ type: "idle" });
    setEnTouched({ enTitle: false, enDescription: false });
    setApiError(null);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const requestTranslate = async (payload?: { title: string; description: string }) => {
    const req = payload ?? { title: form.trTitle, description: form.trDescription };
    if (!req.title.trim() || !req.description.trim()) {
      setTranslateStatus({ type: "error", message: "TR baslik ve aciklama zorunludur." });
      return;
    }

    setLoading(true);
    setTranslateStatus({ type: "idle" });
    try {
      setLastPayload(req);
      const res = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });

      const data = (await res.json()) as TranslateResponse;
      if (!res.ok || !data.ok) {
        setTranslateStatus({ type: "error", message: data.ok ? "Ceviri istegi basarisiz oldu." : data.error.message });
        return;
      }

      setForm((prev) => ({
        ...prev,
        enTitle: protectManualEnFields && enTouched.enTitle ? prev.enTitle : (data.data.title || prev.enTitle),
        enDescription: protectManualEnFields && enTouched.enDescription ? prev.enDescription : (data.data.description || prev.enDescription),
      }));

      setTranslateStatus({
        type: "success",
        message: "Ingilizce alanlar guncellendi.",
        at: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (field: keyof SliderFormState, value: string) => {
    if (field === "enTitle" || field === "enDescription") {
      setEnTouched((prev) => ({ ...prev, [field]: true }));
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.trTitle.trim() || !form.trDescription.trim() || !form.enTitle.trim() || !form.enDescription.trim()) {
      setApiError("TR ve EN baslik/aciklama alanları zorunludur.");
      return;
    }

    setSaving(true);
    setApiError(null);
    try {
      const body = {
        ...form,
        imageUrl: form.imageUrl || undefined,
        linkUrl: form.linkUrl || undefined,
      };

      const res = editingItem
        ? await fetch(`/api/admin/slider/${editingItem.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
        : await fetch("/api/admin/slider", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error?.message ?? "Kaydetme basarisiz.");
        return;
      }

      const saved = data.data.item as SliderItem;
      setItems((prev) =>
        editingItem ? prev.map((x) => (x.id === saved.id ? saved : x)) : [...prev, saved],
      );
      cancelForm();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: SliderItem) => {
    if (!confirm(`"${item.trTitle}" silinsin mi?`)) return;

    const res = await fetch(`/api/admin/slider/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x.id !== item.id));
    }
  };

  const handleToggleStatus = async (item: SliderItem) => {
    const newStatus = item.status === "ACTIVE" ? "DRAFT" : "ACTIVE";
    const res = await fetch(`/api/admin/slider/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems((prev) => prev.map((x) => (x.id === item.id ? data.data.item : x)));
    }
  };

  const handleSaveInterval = async () => {
    if (intervalInput < 1 || intervalInput > 60) return;
    setIntervalSaving(true);
    setIntervalStatus("idle");
    const res = await fetch("/api/admin/slider-settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intervalSeconds: intervalInput }),
    });
    setIntervalSaving(false);
    setIntervalStatus(res.ok ? "ok" : "error");
  };

  const activeCount = items.filter((x) => x.status === "ACTIVE").length;

  return (
    <main className="nmd-container nmd-page-x py-12">
      <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <nav className="mb-4 flex items-center gap-2 text-xs text-[color:var(--app-muted)]">
            <span>{t.breadcrumbAdmin}</span>
            <span>/</span>
            <span className="font-semibold text-[color:var(--secondary)]">{t.breadcrumbPage}</span>
          </nav>
          <h1 className="nmd-headline-xl text-[color:var(--primary)]">{t.title}</h1>
          <p className="mt-2 nmd-body-md max-w-2xl text-[color:var(--app-muted)]">{t.subtitle}</p>
        </div>
        {!showForm && (
          <Button className="hover:-translate-y-1" onClick={openCreate} size="lg" variant="secondary">{t.addNew}</Button>
        )}
      </header>

      {/* Geçiş Süresi */}
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-5 py-4">
        <span className="text-sm font-medium text-[color:var(--primary)]">Slaytlar arası geçiş süresi</span>
        <div className="flex items-center gap-2">
          <input
            className="w-20 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-bg)] px-3 py-1.5 text-sm text-[color:var(--primary)]"
            max={60}
            min={1}
            onChange={(e) => { setIntervalStatus("idle"); setIntervalInput(Number(e.target.value)); }}
            type="number"
            value={intervalInput}
          />
          <span className="text-sm text-[color:var(--app-muted)]">saniye</span>
          <Button disabled={intervalSaving} onClick={handleSaveInterval} size="sm" variant="secondary">
            {intervalSaving ? "Kaydediliyor…" : "Kaydet"}
          </Button>
          {intervalStatus === "ok" && <span className="text-sm text-green-600">✓ Kaydedildi</span>}
          {intervalStatus === "error" && <span className="text-sm text-red-600">Hata oluştu</span>}
        </div>
      </div>

      {apiError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">{apiError}</div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <SliderTable
          activeCount={`${activeCount} ${t.activeCount}`}
          items={items}
          onDelete={handleDelete}
          onEdit={openEdit}
          onToggleStatus={handleToggleStatus}
          title={t.activeSliders}
        />

        {showForm && (
          <section className="space-y-6 lg:col-span-5">
            <SliderForm
              form={form}
              formSubtitle={editingItem ? "Slider icerigini guncelle." : t.formSubtitle}
              formTitle={editingItem ? "Slider Duzenle" : t.formTitle}
              hasRetryPayload={Boolean(lastPayload)}
              loading={loading}
              onChange={onChange}
              onCancel={cancelForm}
              onRetry={() => { if (lastPayload) requestTranslate(lastPayload); }}
              onSave={handleSave}
              onToggleProtect={setProtectManualEnFields}
              onTranslate={() => requestTranslate()}
              protectManualEnFields={protectManualEnFields}
              saving={saving}
              status={translateStatus}
              translateButtonLabel={t.translateButton}
              translatingLabel={t.translating}
            />

            <SliderPreview
              enDescription={form.enDescription}
              enTitle={form.enTitle}
              title={t.previewTitle}
              trDescription={form.trDescription}
              trTitle={form.trTitle}
            />
          </section>
        )}
      </div>
    </main>
  );
}
