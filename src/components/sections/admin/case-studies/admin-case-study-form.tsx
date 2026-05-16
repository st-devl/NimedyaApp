"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";

export type CaseStudyFormData = {
  slug: string;
  locale: "tr" | "en";
  client: string;
  sector: string;
  duration: string;
  year: string;
  image: string;
  challenge: string;
  approach: string;
  result: string;
  scope: string[];
  services: string[];
  metrics: { value: string; label: string }[];
  gallery: string[];
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
  status: "DRAFT" | "PUBLISHED";
};

type Props = {
  id?: number;
  initial?: Partial<CaseStudyFormData>;
  onSaved: () => void;
  onCancel: () => void;
};

const blank: CaseStudyFormData = {
  slug: "",
  locale: "tr",
  client: "",
  sector: "",
  duration: "",
  year: "",
  image: "",
  challenge: "",
  approach: "",
  result: "",
  scope: [""],
  services: [],
  metrics: [{ value: "", label: "" }],
  gallery: [],
  testimonialQuote: "",
  testimonialAuthor: "",
  testimonialRole: "",
  status: "DRAFT",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="mt-8 border-t border-[color:var(--app-border)]/30 pt-6 text-sm font-bold uppercase tracking-wider text-[color:var(--secondary)]">{children}</h4>;
}

function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return <label className="mt-4 block text-sm font-semibold text-[color:var(--app-muted)]" htmlFor={htmlFor}>{children}</label>;
}

function buildPayload(form: CaseStudyFormData) {
  const testimonial =
    form.testimonialQuote.trim() && form.testimonialAuthor.trim()
      ? { quote: form.testimonialQuote, author: form.testimonialAuthor, role: form.testimonialRole || undefined }
      : null;

  return {
    slug: form.slug,
    locale: form.locale,
    client: form.client,
    sector: form.sector,
    duration: form.duration,
    year: form.year || undefined,
    image: form.image,
    challenge: form.challenge,
    approach: form.approach,
    result: form.result,
    scope: form.scope.filter(Boolean),
    services: form.services.filter(Boolean).length > 0 ? form.services.filter(Boolean) : undefined,
    metrics: form.metrics.filter((m) => m.value && m.label),
    gallery: form.gallery.filter(Boolean).length > 0 ? form.gallery.filter(Boolean) : undefined,
    testimonial,
    status: form.status,
  };
}

export function AdminCaseStudyForm({ id, initial, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<CaseStudyFormData>({ ...blank, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof CaseStudyFormData>(field: K, value: CaseStudyFormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const url = id ? `/api/admin/case-studies/${id}` : "/api/admin/case-studies";
      const method = id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(form)),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError((body as { message?: string }).message ?? "Kayıt başarısız.");
        return;
      }
      onSaved();
    } catch {
      setError("Ağ hatası.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-[color:var(--primary)]">
        {id ? "Vaka Çalışması Düzenle" : "Yeni Vaka Çalışması"}
      </h3>

      {/* Meta */}
      <SectionTitle>Temel Bilgiler</SectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <FieldLabel htmlFor="cs-locale">Dil</FieldLabel>
          <select
            className="mt-1 w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm"
            id="cs-locale"
            value={form.locale}
            onChange={(e) => set("locale", e.target.value as "tr" | "en")}
          >
            <option value="tr">Türkçe (TR)</option>
            <option value="en">English (EN)</option>
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="cs-status">Durum</FieldLabel>
          <select
            className="mt-1 w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm"
            id="cs-status"
            value={form.status}
            onChange={(e) => set("status", e.target.value as "DRAFT" | "PUBLISHED")}
          >
            <option value="DRAFT">Taslak</option>
            <option value="PUBLISHED">Yayında</option>
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="cs-year">Yıl (opsiyonel)</FieldLabel>
          <TextInput id="cs-year" placeholder="2024" value={form.year} onChange={(e) => set("year", e.target.value)} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="cs-slug">Slug (URL)</FieldLabel>
          <TextInput id="cs-slug" placeholder="lunessa-home" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        </div>
        <div>
          <FieldLabel htmlFor="cs-client">Müşteri / Marka Adı</FieldLabel>
          <TextInput id="cs-client" placeholder="Lunessa Home" value={form.client} onChange={(e) => set("client", e.target.value)} />
        </div>
        <div>
          <FieldLabel htmlFor="cs-sector">Sektör</FieldLabel>
          <TextInput id="cs-sector" placeholder="E-Ticaret" value={form.sector} onChange={(e) => set("sector", e.target.value)} />
        </div>
        <div>
          <FieldLabel htmlFor="cs-duration">Proje Süresi</FieldLabel>
          <TextInput id="cs-duration" placeholder="6 Hafta" value={form.duration} onChange={(e) => set("duration", e.target.value)} />
        </div>
      </div>
      <FieldLabel htmlFor="cs-image">Kapak Görseli URL</FieldLabel>
      <TextInput id="cs-image" placeholder="https://..." value={form.image} onChange={(e) => set("image", e.target.value)} />

      {/* Narrative */}
      <SectionTitle>Proje Hikayesi</SectionTitle>
      <FieldLabel htmlFor="cs-challenge">Zorluk / Challenge</FieldLabel>
      <TextArea className="h-24" id="cs-challenge" value={form.challenge} onChange={(e) => set("challenge", e.target.value)} />
      <FieldLabel htmlFor="cs-approach">Yaklaşım / Approach</FieldLabel>
      <TextArea className="h-24" id="cs-approach" value={form.approach} onChange={(e) => set("approach", e.target.value)} />
      <FieldLabel htmlFor="cs-result">Sonuç / Result</FieldLabel>
      <TextArea className="h-24" id="cs-result" value={form.result} onChange={(e) => set("result", e.target.value)} />

      {/* Scope */}
      <SectionTitle>Kapsam (Scope)</SectionTitle>
      {form.scope.map((s, i) => (
        <div className="mt-2 flex gap-2" key={i}>
          <TextInput
            className="flex-1"
            placeholder="Hizmet adı"
            value={s}
            onChange={(e) => set("scope", form.scope.map((x, j) => j === i ? e.target.value : x))}
          />
          <button
            className="shrink-0 text-xs text-red-500 hover:underline"
            disabled={form.scope.length <= 1}
            onClick={() => set("scope", form.scope.filter((_, j) => j !== i))}
            type="button"
          >
            ×
          </button>
        </div>
      ))}
      <button
        className="mt-3 text-sm font-semibold text-[color:var(--secondary)] hover:underline"
        onClick={() => set("scope", [...form.scope, ""])}
        type="button"
      >
        + Kapsam Ekle
      </button>

      {/* Services */}
      <SectionTitle>Hizmetler (opsiyonel)</SectionTitle>
      {form.services.map((s, i) => (
        <div className="mt-2 flex gap-2" key={i}>
          <TextInput
            className="flex-1"
            placeholder="Hizmet"
            value={s}
            onChange={(e) => set("services", form.services.map((x, j) => j === i ? e.target.value : x))}
          />
          <button
            className="shrink-0 text-xs text-red-500 hover:underline"
            onClick={() => set("services", form.services.filter((_, j) => j !== i))}
            type="button"
          >
            ×
          </button>
        </div>
      ))}
      <button
        className="mt-3 text-sm font-semibold text-[color:var(--secondary)] hover:underline"
        onClick={() => set("services", [...form.services, ""])}
        type="button"
      >
        + Hizmet Ekle
      </button>

      {/* Metrics */}
      <SectionTitle>Sonuç Metrikleri</SectionTitle>
      {form.metrics.map((m, i) => (
        <div className="mt-4 rounded-xl border border-[color:var(--app-border)]/30 p-4" key={i}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-[color:var(--secondary)]">Metrik {i + 1}</span>
            <button
              className="text-xs text-red-500 hover:underline"
              disabled={form.metrics.length <= 1}
              onClick={() => set("metrics", form.metrics.filter((_, j) => j !== i))}
              type="button"
            >
              Kaldır
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              placeholder="Değer (örn. %40)"
              value={m.value}
              onChange={(e) => set("metrics", form.metrics.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}
            />
            <TextInput
              placeholder="Etiket (örn. Dönüşüm Artışı)"
              value={m.label}
              onChange={(e) => set("metrics", form.metrics.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
            />
          </div>
        </div>
      ))}
      <button
        className="mt-3 text-sm font-semibold text-[color:var(--secondary)] hover:underline"
        onClick={() => set("metrics", [...form.metrics, { value: "", label: "" }])}
        type="button"
      >
        + Metrik Ekle
      </button>

      {/* Gallery */}
      <SectionTitle>Galeri Görselleri (opsiyonel)</SectionTitle>
      {form.gallery.map((g, i) => (
        <div className="mt-2 flex gap-2" key={i}>
          <TextInput
            className="flex-1"
            placeholder="https://..."
            value={g}
            onChange={(e) => set("gallery", form.gallery.map((x, j) => j === i ? e.target.value : x))}
          />
          <button
            className="shrink-0 text-xs text-red-500 hover:underline"
            onClick={() => set("gallery", form.gallery.filter((_, j) => j !== i))}
            type="button"
          >
            ×
          </button>
        </div>
      ))}
      <button
        className="mt-3 text-sm font-semibold text-[color:var(--secondary)] hover:underline"
        onClick={() => set("gallery", [...form.gallery, ""])}
        type="button"
      >
        + Görsel Ekle
      </button>

      {/* Testimonial */}
      <SectionTitle>Müşteri Yorumu (opsiyonel)</SectionTitle>
      <FieldLabel htmlFor="cs-t-quote">Alıntı</FieldLabel>
      <TextArea className="h-20" id="cs-t-quote" placeholder="Müşteri yorumu..." value={form.testimonialQuote} onChange={(e) => set("testimonialQuote", e.target.value)} />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="cs-t-author">Yazar</FieldLabel>
          <TextInput id="cs-t-author" placeholder="Ad Soyad" value={form.testimonialAuthor} onChange={(e) => set("testimonialAuthor", e.target.value)} />
        </div>
        <div>
          <FieldLabel htmlFor="cs-t-role">Unvan (opsiyonel)</FieldLabel>
          <TextInput id="cs-t-role" placeholder="CEO, Firma Adı" value={form.testimonialRole} onChange={(e) => set("testimonialRole", e.target.value)} />
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <Button disabled={saving} onClick={handleSave}>
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
        <Button onClick={onCancel} variant="secondary">İptal</Button>
      </div>
    </Card>
  );
}
