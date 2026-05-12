"use client";

import { useState } from "react";
import { getAdminSliderContent } from "@/content";
import type { Locale } from "@/lib/i18n/config";
import type { TranslateResponse } from "@/lib/ai/translate-types";
import { Button } from "@/components/ui/button";
import { SliderTable } from "@/components/sections/admin/slider/slider-table";
import { SliderForm } from "@/components/sections/admin/slider/slider-form";
import { SliderPreview } from "@/components/sections/admin/slider/slider-preview";
import { sliderRows } from "@/components/sections/admin/slider/constants";
import type { SliderFormState, TranslateStatus } from "@/components/sections/admin/slider/types";

type AdminSliderPageSectionsProps = {
  locale: Locale;
};

export function AdminSliderPageSections({ locale }: AdminSliderPageSectionsProps) {
  const t = getAdminSliderContent(locale);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<SliderFormState>({ trTitle: "", trDescription: "", enTitle: "", enDescription: "" });
  const [status, setStatus] = useState<TranslateStatus>({ type: "idle" });
  const [lastPayload, setLastPayload] = useState<{ title: string; description: string } | null>(null);
  const [protectManualEnFields, setProtectManualEnFields] = useState(true);
  const [enTouched, setEnTouched] = useState({ enTitle: false, enDescription: false });

  const requestTranslate = async (payload?: { title: string; description: string }) => {
    const requestPayload = payload ?? { title: form.trTitle, description: form.trDescription };
    if (!requestPayload.title.trim() || !requestPayload.description.trim()) {
      setStatus({ type: "error", message: "TR baslik ve aciklama zorunludur." });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle" });

    try {
      setLastPayload(requestPayload);
      const response = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      const data = (await response.json()) as TranslateResponse;
      if (!response.ok || !data.ok) {
        setStatus({ type: "error", message: data.ok ? "Ceviri istegi basarisiz oldu." : data.error.message });
        return;
      }

      setForm((prev) => ({
        ...prev,
        enTitle: protectManualEnFields && enTouched.enTitle ? prev.enTitle : (data.data.title || prev.enTitle),
        enDescription: protectManualEnFields && enTouched.enDescription ? prev.enDescription : (data.data.description || prev.enDescription),
      }));

      setStatus({
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
        <Button className="hover:-translate-y-1" size="lg" variant="secondary">{t.addNew}</Button>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <SliderTable activeCount={t.activeCount} rows={sliderRows} title={t.activeSliders} />

        <section className="space-y-6 lg:col-span-5">
          <SliderForm
            form={form}
            formSubtitle={t.formSubtitle}
            formTitle={t.formTitle}
            hasRetryPayload={Boolean(lastPayload)}
            loading={loading}
            onChange={onChange}
            onRetry={() => {
              if (lastPayload) requestTranslate(lastPayload);
            }}
            onToggleProtect={setProtectManualEnFields}
            onTranslate={() => requestTranslate()}
            protectManualEnFields={protectManualEnFields}
            status={status}
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
      </div>
    </main>
  );
}
