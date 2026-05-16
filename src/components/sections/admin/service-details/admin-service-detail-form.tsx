"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";

export type ServiceDetailFormData = {
  key: string;
  locale: "tr" | "en";
  slug: string;
  label: string;
  title: string;
  intro: string;
  heroCta: string;
  aboutTitle: string;
  aboutLead: string;
  aboutBody: string;
  benefitsTitle: string;
  benefits: { title: string; description: string }[];
  processTitle: string;
  processSteps: { step: string; description: string }[];
  deliverablesTitle: string;
  deliverables: string[];
  faqTitle: string;
  faq: { question: string; answer: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  image: string;
  status: "DRAFT" | "PUBLISHED";
};

type Props = {
  id?: number;
  initial?: Partial<ServiceDetailFormData>;
  onSaved: () => void;
  onCancel: () => void;
};

const SERVICE_KEYS = [
  "promotional-film",
  "web-design",
  "brand-identity",
  "social-media",
  "seo-content",
] as const;

const blank: ServiceDetailFormData = {
  key: "promotional-film",
  locale: "tr",
  slug: "",
  label: "",
  title: "",
  intro: "",
  heroCta: "",
  aboutTitle: "",
  aboutLead: "",
  aboutBody: "",
  benefitsTitle: "",
  benefits: [{ title: "", description: "" }],
  processTitle: "",
  processSteps: [{ step: "", description: "" }],
  deliverablesTitle: "",
  deliverables: [""],
  faqTitle: "",
  faq: [{ question: "", answer: "" }],
  ctaTitle: "",
  ctaSubtitle: "",
  ctaButton: "",
  image: "serviceFeatured1",
  status: "DRAFT",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="mt-8 border-t border-[color:var(--app-border)]/30 pt-6 text-sm font-bold uppercase tracking-wider text-[color:var(--secondary)]">{children}</h4>;
}

function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return <label className="mt-4 block text-sm font-semibold text-[color:var(--app-muted)]" htmlFor={htmlFor}>{children}</label>;
}

export function AdminServiceDetailForm({ id, initial, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<ServiceDetailFormData>({ ...blank, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ServiceDetailFormData>(field: K, value: ServiceDetailFormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const url = id ? `/api/admin/service-details/${id}` : "/api/admin/service-details";
      const method = id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
        {id ? "Hizmet Detayı Düzenle" : "Yeni Hizmet Detayı"}
      </h3>

      {/* Meta */}
      <SectionTitle>Temel Bilgiler</SectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <FieldLabel htmlFor="sd-key">Hizmet Anahtarı</FieldLabel>
          <select
            className="mt-1 w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm"
            id="sd-key"
            value={form.key}
            onChange={(e) => set("key", e.target.value)}
          >
            {SERVICE_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="sd-locale">Dil</FieldLabel>
          <select
            className="mt-1 w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm"
            id="sd-locale"
            value={form.locale}
            onChange={(e) => set("locale", e.target.value as "tr" | "en")}
          >
            <option value="tr">Türkçe (TR)</option>
            <option value="en">English (EN)</option>
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="sd-status">Durum</FieldLabel>
          <select
            className="mt-1 w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm"
            id="sd-status"
            value={form.status}
            onChange={(e) => set("status", e.target.value as "DRAFT" | "PUBLISHED")}
          >
            <option value="DRAFT">Taslak</option>
            <option value="PUBLISHED">Yayında</option>
          </select>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="sd-slug">Slug (URL)</FieldLabel>
          <TextInput id="sd-slug" placeholder="tanitim-filmi" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        </div>
        <div>
          <FieldLabel htmlFor="sd-label">Etiket</FieldLabel>
          <TextInput id="sd-label" placeholder="Tanıtım Filmi" value={form.label} onChange={(e) => set("label", e.target.value)} />
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="sd-image">Görsel Anahtarı</FieldLabel>
        <TextInput id="sd-image" placeholder="serviceFeatured1" value={form.image} onChange={(e) => set("image", e.target.value)} />
      </div>

      {/* Hero */}
      <SectionTitle>Hero Bölümü</SectionTitle>
      <FieldLabel htmlFor="sd-title">Başlık</FieldLabel>
      <TextInput id="sd-title" placeholder="Markanızı Hareket Ettiren Filmler" value={form.title} onChange={(e) => set("title", e.target.value)} />
      <FieldLabel htmlFor="sd-intro">Giriş Metni</FieldLabel>
      <TextArea className="h-24" id="sd-intro" placeholder="Hero açıklama metni..." value={form.intro} onChange={(e) => set("intro", e.target.value)} />
      <FieldLabel htmlFor="sd-hero-cta">CTA Butonu</FieldLabel>
      <TextInput id="sd-hero-cta" placeholder="Teklif Al" value={form.heroCta} onChange={(e) => set("heroCta", e.target.value)} />

      {/* About */}
      <SectionTitle>Hakkında Bölümü</SectionTitle>
      <FieldLabel htmlFor="sd-about-title">Bölüm Başlığı</FieldLabel>
      <TextInput id="sd-about-title" placeholder="Neden Tanıtım Filmi?" value={form.aboutTitle} onChange={(e) => set("aboutTitle", e.target.value)} />
      <FieldLabel htmlFor="sd-about-lead">Öne Çıkan Metin</FieldLabel>
      <TextArea className="h-20" id="sd-about-lead" value={form.aboutLead} onChange={(e) => set("aboutLead", e.target.value)} />
      <FieldLabel htmlFor="sd-about-body">Ana Metin</FieldLabel>
      <TextArea className="h-32" id="sd-about-body" value={form.aboutBody} onChange={(e) => set("aboutBody", e.target.value)} />

      {/* Benefits */}
      <SectionTitle>Faydalar</SectionTitle>
      <FieldLabel htmlFor="sd-benefits-title">Bölüm Başlığı</FieldLabel>
      <TextInput id="sd-benefits-title" value={form.benefitsTitle} onChange={(e) => set("benefitsTitle", e.target.value)} />
      {form.benefits.map((b, i) => (
        <div className="mt-4 rounded-xl border border-[color:var(--app-border)]/30 p-4" key={i}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-[color:var(--secondary)]">Fayda {i + 1}</span>
            <button
              className="text-xs text-red-500 hover:underline"
              disabled={form.benefits.length <= 1}
              onClick={() => set("benefits", form.benefits.filter((_, j) => j !== i))}
              type="button"
            >
              Kaldır
            </button>
          </div>
          <TextInput
            className="mb-2"
            placeholder="Başlık"
            value={b.title}
            onChange={(e) => set("benefits", form.benefits.map((x, j) => j === i ? { ...x, title: e.target.value } : x))}
          />
          <TextArea
            className="h-16"
            placeholder="Açıklama"
            value={b.description}
            onChange={(e) => set("benefits", form.benefits.map((x, j) => j === i ? { ...x, description: e.target.value } : x))}
          />
        </div>
      ))}
      <button
        className="mt-3 text-sm font-semibold text-[color:var(--secondary)] hover:underline"
        onClick={() => set("benefits", [...form.benefits, { title: "", description: "" }])}
        type="button"
      >
        + Fayda Ekle
      </button>

      {/* Process */}
      <SectionTitle>Süreç Adımları</SectionTitle>
      <FieldLabel htmlFor="sd-process-title">Bölüm Başlığı</FieldLabel>
      <TextInput id="sd-process-title" value={form.processTitle} onChange={(e) => set("processTitle", e.target.value)} />
      {form.processSteps.map((s, i) => (
        <div className="mt-4 rounded-xl border border-[color:var(--app-border)]/30 p-4" key={i}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-[color:var(--secondary)]">Adım {i + 1}</span>
            <button
              className="text-xs text-red-500 hover:underline"
              disabled={form.processSteps.length <= 1}
              onClick={() => set("processSteps", form.processSteps.filter((_, j) => j !== i))}
              type="button"
            >
              Kaldır
            </button>
          </div>
          <TextInput
            className="mb-2"
            placeholder="Adım adı"
            value={s.step}
            onChange={(e) => set("processSteps", form.processSteps.map((x, j) => j === i ? { ...x, step: e.target.value } : x))}
          />
          <TextArea
            className="h-16"
            placeholder="Açıklama"
            value={s.description}
            onChange={(e) => set("processSteps", form.processSteps.map((x, j) => j === i ? { ...x, description: e.target.value } : x))}
          />
        </div>
      ))}
      <button
        className="mt-3 text-sm font-semibold text-[color:var(--secondary)] hover:underline"
        onClick={() => set("processSteps", [...form.processSteps, { step: "", description: "" }])}
        type="button"
      >
        + Adım Ekle
      </button>

      {/* Deliverables */}
      <SectionTitle>Çıktılar (Deliverables)</SectionTitle>
      <FieldLabel htmlFor="sd-del-title">Bölüm Başlığı</FieldLabel>
      <TextInput id="sd-del-title" value={form.deliverablesTitle} onChange={(e) => set("deliverablesTitle", e.target.value)} />
      {form.deliverables.map((d, i) => (
        <div className="mt-2 flex gap-2" key={i}>
          <TextInput
            className="flex-1"
            placeholder={`Çıktı ${i + 1}`}
            value={d}
            onChange={(e) => set("deliverables", form.deliverables.map((x, j) => j === i ? e.target.value : x))}
          />
          <button
            className="shrink-0 text-xs text-red-500 hover:underline"
            disabled={form.deliverables.length <= 1}
            onClick={() => set("deliverables", form.deliverables.filter((_, j) => j !== i))}
            type="button"
          >
            ×
          </button>
        </div>
      ))}
      <button
        className="mt-3 text-sm font-semibold text-[color:var(--secondary)] hover:underline"
        onClick={() => set("deliverables", [...form.deliverables, ""])}
        type="button"
      >
        + Çıktı Ekle
      </button>

      {/* FAQ */}
      <SectionTitle>Sık Sorulan Sorular</SectionTitle>
      <FieldLabel htmlFor="sd-faq-title">Bölüm Başlığı</FieldLabel>
      <TextInput id="sd-faq-title" value={form.faqTitle} onChange={(e) => set("faqTitle", e.target.value)} />
      {form.faq.map((f, i) => (
        <div className="mt-4 rounded-xl border border-[color:var(--app-border)]/30 p-4" key={i}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-[color:var(--secondary)]">Soru {i + 1}</span>
            <button
              className="text-xs text-red-500 hover:underline"
              disabled={form.faq.length <= 1}
              onClick={() => set("faq", form.faq.filter((_, j) => j !== i))}
              type="button"
            >
              Kaldır
            </button>
          </div>
          <TextInput
            className="mb-2"
            placeholder="Soru"
            value={f.question}
            onChange={(e) => set("faq", form.faq.map((x, j) => j === i ? { ...x, question: e.target.value } : x))}
          />
          <TextArea
            className="h-20"
            placeholder="Cevap"
            value={f.answer}
            onChange={(e) => set("faq", form.faq.map((x, j) => j === i ? { ...x, answer: e.target.value } : x))}
          />
        </div>
      ))}
      <button
        className="mt-3 text-sm font-semibold text-[color:var(--secondary)] hover:underline"
        onClick={() => set("faq", [...form.faq, { question: "", answer: "" }])}
        type="button"
      >
        + Soru Ekle
      </button>

      {/* CTA */}
      <SectionTitle>Son CTA Bölümü</SectionTitle>
      <FieldLabel htmlFor="sd-cta-title">Başlık</FieldLabel>
      <TextInput id="sd-cta-title" value={form.ctaTitle} onChange={(e) => set("ctaTitle", e.target.value)} />
      <FieldLabel htmlFor="sd-cta-sub">Alt Metin</FieldLabel>
      <TextArea className="h-20" id="sd-cta-sub" value={form.ctaSubtitle} onChange={(e) => set("ctaSubtitle", e.target.value)} />
      <FieldLabel htmlFor="sd-cta-btn">Buton Metni</FieldLabel>
      <TextInput id="sd-cta-btn" value={form.ctaButton} onChange={(e) => set("ctaButton", e.target.value)} />

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
