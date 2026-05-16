"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";
import { MediaPicker } from "@/components/ui/media-picker";
import { resolveImageMeta } from "@/config/image-manifest";
import type {
  HomeContent,
  ServicesContent,
  ProductPhotographyContent,
  PortfolioContent,
  AboutContent,
  ContactContent,
} from "@/types/content";

// ─── Types ────────────────────────────────────────────────────────────────────

type ContentKey = "home" | "services" | "productPhotography" | "portfolio" | "about" | "contact";

type ContentBlockItem = {
  id: number;
  key: ContentKey;
  locale: "tr" | "en";
  title: string | null;
  slug: string | null;
  status: "DRAFT" | "PUBLISHED";
  sortOrder: number;
  data: unknown;
};

type AdminContentManagerProps = {
  initialBlocks: ContentBlockItem[];
};

type OpStatus =
  | { type: "idle" }
  | { type: "saving" }
  | { type: "translating" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

// ─── Default content ─────────────────────────────────────────────────────────

const defaultHome: HomeContent = {
  heroTitleA: "", heroTitleB: "", heroText: "", ctaA: "", ctaB: "",
  sectionLabel: "", sectionTitle: "", statsTitle: "", stats: [], featured: "", refs: "",
  testimonialsTitle: "", testimonials: [],
  brandsTitle: "", brands: [],
  featuredProjects: [
    { title: "", description: "", tag: "", image: "featuredEcommerce" },
    { title: "", description: "", tag: "", image: "featuredSeoAnalytics" },
    { title: "", description: "", tag: "", image: "featuredSocialMedia" },
  ],
  references: [
    { name: "", sector: "", summary: "", image: "referenceWorkspace" },
    { name: "", sector: "", summary: "", image: "referenceOffice" },
    { name: "", sector: "", summary: "", image: "referenceCreativeSite" },
  ],
};

const defaultServices: ServicesContent = { title: "", subtitle: "", services: [{ title: "", description: "" }], cta: "" };
const defaultProductPhoto: ProductPhotographyContent = { label: "", title: "", desc: "", cta: "", aboutTitle: "", processTitle: "", processSteps: [""] };
const defaultPortfolio: PortfolioContent = {
  title: "", subtitle: "", categories: [""],
  projects: [
    { title: "", description: "", image: "portfolio1" },
    { title: "", description: "", image: "portfolio2" },
    { title: "", description: "", image: "portfolio3" },
  ],
};
const defaultAbout: AboutContent = {
  pretitle: "", title: "", text: "",
  positioningTitle: "", positioning: "",
  differentiatorsTitle: "",
  differentiators: [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ],
  valuesTitle: "",
  values: [
    { title: "", text: "" },
    { title: "", text: "" },
    { title: "", text: "" },
  ],
  teamTitle: "",
  team: [{ name: "", role: "", bio: "" }],
};
const defaultContact: ContactContent = {
  title: "", text: "", formTitle: "", send: "",
  labels: { fullName: "", email: "", message: "" },
  hqTitle: "", city: "",
};

function parseData<T>(data: unknown, fallback: T): T {
  if (data && typeof data === "object" && !Array.isArray(data)) return data as T;
  return fallback;
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]">{children}</p>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 mb-3 border-b border-[color:var(--app-border)] pb-1 text-sm font-bold text-[color:var(--primary)]">{children}</h3>;
}

function ImagePickerField({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const resolved = resolveImageMeta(value, "200px");
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex gap-2">
        <TextInput className="flex-1" placeholder="Görsel URL veya manifest key" value={value} onChange={(e) => onChange(e.target.value)} />
        <MediaPicker value={resolved.src} onChange={onChange} />
      </div>
      {value && (
        <div className="mt-2 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="önizleme" className="h-16 w-24 rounded-md border border-[color:var(--app-border)] object-cover" src={resolved.src} />
          <p className="truncate text-xs text-[color:var(--app-muted)]">{resolved.src}</p>
        </div>
      )}
    </div>
  );
}

function StringListEditor({ label, values, onChange }: { label: string; values: string[]; onChange: (v: string[]) => void }) {
  const update = (i: number, val: string) => onChange(values.map((v, idx) => (idx === i ? val : v)));
  const add = () => onChange([...values, ""]);
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="grid gap-2">
        {values.map((v, i) => (
          <div className="flex gap-2" key={i}>
            <TextInput className="flex-1" value={v} onChange={(e) => update(i, e.target.value)} />
            {values.length > 1 && (
              <button className="shrink-0 rounded-md px-2 text-sm text-[color:var(--error)] hover:bg-red-50 dark:hover:bg-red-950" onClick={() => remove(i)} type="button">✕</button>
            )}
          </div>
        ))}
        <button className="mt-1 w-max rounded-md border border-dashed border-[color:var(--app-border)] px-3 py-1 text-xs text-[color:var(--app-muted)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]" onClick={add} type="button">
          + Ekle
        </button>
      </div>
    </div>
  );
}

// ─── Page form components ─────────────────────────────────────────────────────

function HomeForm({ data, onChange }: { data: HomeContent; onChange: (v: HomeContent) => void }) {
  const set = <K extends keyof HomeContent>(k: K, v: HomeContent[K]) => onChange({ ...data, [k]: v });

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Hero Başlık A</FieldLabel>
          <TextInput value={data.heroTitleA} onChange={(e) => set("heroTitleA", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Hero Başlık B</FieldLabel>
          <TextInput value={data.heroTitleB} onChange={(e) => set("heroTitleB", e.target.value)} />
        </div>
      </div>
      <div>
        <FieldLabel>Hero Metni</FieldLabel>
        <TextArea className="h-24" value={data.heroText} onChange={(e) => set("heroText", e.target.value)} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>CTA Buton A</FieldLabel>
          <TextInput value={data.ctaA} onChange={(e) => set("ctaA", e.target.value)} />
        </div>
        <div>
          <FieldLabel>CTA Buton B</FieldLabel>
          <TextInput value={data.ctaB} onChange={(e) => set("ctaB", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Bölüm Etiketi</FieldLabel>
          <TextInput value={data.sectionLabel} onChange={(e) => set("sectionLabel", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Bölüm Başlığı</FieldLabel>
          <TextInput value={data.sectionTitle} onChange={(e) => set("sectionTitle", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Öne Çıkan Başlığı</FieldLabel>
          <TextInput value={data.featured} onChange={(e) => set("featured", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Referanslar Başlığı</FieldLabel>
          <TextInput value={data.refs} onChange={(e) => set("refs", e.target.value)} />
        </div>
      </div>

      <SectionTitle>Öne Çıkan Projeler</SectionTitle>
      {data.featuredProjects.map((proj, i) => (
        <div className="rounded-lg border border-[color:var(--app-border)] p-4" key={i}>
          <p className="mb-3 text-xs font-bold text-[color:var(--app-muted)]">Proje {i + 1}</p>
          <div className="grid gap-3">
            <div>
              <FieldLabel>Başlık</FieldLabel>
              <TextInput value={proj.title} onChange={(e) => set("featuredProjects", data.featuredProjects.map((p, idx) => idx === i ? { ...p, title: e.target.value } : p))} />
            </div>
            <div>
              <FieldLabel>Açıklama</FieldLabel>
              <TextArea className="h-20" value={proj.description} onChange={(e) => set("featuredProjects", data.featuredProjects.map((p, idx) => idx === i ? { ...p, description: e.target.value } : p))} />
            </div>
            <div>
              <FieldLabel>Etiket</FieldLabel>
              <TextInput value={proj.tag} onChange={(e) => set("featuredProjects", data.featuredProjects.map((p, idx) => idx === i ? { ...p, tag: e.target.value } : p))} />
            </div>
            <ImagePickerField
              label="Görsel"
              value={proj.image}
              onChange={(url) => set("featuredProjects", data.featuredProjects.map((p, idx) => idx === i ? { ...p, image: url } : p))}
            />
          </div>
        </div>
      ))}

      <SectionTitle>Referanslar</SectionTitle>
      {data.references.map((ref, i) => (
        <div className="rounded-lg border border-[color:var(--app-border)] p-4" key={i}>
          <p className="mb-3 text-xs font-bold text-[color:var(--app-muted)]">Referans {i + 1}</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <FieldLabel>İsim</FieldLabel>
              <TextInput value={ref.name} onChange={(e) => set("references", data.references.map((r, idx) => idx === i ? { ...r, name: e.target.value } : r))} />
            </div>
            <div>
              <FieldLabel>Sektör</FieldLabel>
              <TextInput value={ref.sector} onChange={(e) => set("references", data.references.map((r, idx) => idx === i ? { ...r, sector: e.target.value } : r))} />
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Özet</FieldLabel>
              <TextArea className="h-20" value={ref.summary} onChange={(e) => set("references", data.references.map((r, idx) => idx === i ? { ...r, summary: e.target.value } : r))} />
            </div>
            <div className="md:col-span-2">
              <ImagePickerField
                label="Görsel"
                value={ref.image}
                onChange={(url) => set("references", data.references.map((r, idx) => idx === i ? { ...r, image: url } : r))}
              />
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

function ServicesForm({ data, onChange }: { data: ServicesContent; onChange: (v: ServicesContent) => void }) {
  const set = <K extends keyof ServicesContent>(k: K, v: ServicesContent[K]) => onChange({ ...data, [k]: v });
  return (
    <div className="grid gap-4">
      <div>
        <FieldLabel>Başlık</FieldLabel>
        <TextInput value={data.title} onChange={(e) => set("title", e.target.value)} />
      </div>
      <div>
        <FieldLabel>Alt Başlık</FieldLabel>
        <TextArea className="h-24" value={data.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
      </div>
      <div>
        <FieldLabel>CTA Buton</FieldLabel>
        <TextInput value={data.cta} onChange={(e) => set("cta", e.target.value)} />
      </div>
      <SectionTitle>Hizmetler</SectionTitle>
      {data.services.map((svc, i) => (
        <div className="rounded-lg border border-[color:var(--app-border)] p-4" key={i}>
          <p className="mb-3 text-xs font-bold text-[color:var(--app-muted)]">Hizmet {i + 1}</p>
          <div className="grid gap-3">
            <div>
              <FieldLabel>Başlık</FieldLabel>
              <TextInput value={svc.title} onChange={(e) => set("services", data.services.map((s, idx) => idx === i ? { ...s, title: e.target.value } : s))} />
            </div>
            <div>
              <FieldLabel>Açıklama</FieldLabel>
              <TextArea className="h-20" value={svc.description} onChange={(e) => set("services", data.services.map((s, idx) => idx === i ? { ...s, description: e.target.value } : s))} />
            </div>
          </div>
        </div>
      ))}
      <button
        className="rounded-lg border border-dashed border-[color:var(--app-border)] py-3 text-sm font-semibold text-[color:var(--app-muted)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
        onClick={() => set("services", [...data.services, { title: "", description: "" }])}
        type="button"
      >
        + Hizmet ekle
      </button>
    </div>
  );
}

function ProductPhotoForm({ data, onChange }: { data: ProductPhotographyContent; onChange: (v: ProductPhotographyContent) => void }) {
  const set = <K extends keyof ProductPhotographyContent>(k: K, v: ProductPhotographyContent[K]) => onChange({ ...data, [k]: v });
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Etiket</FieldLabel>
          <TextInput value={data.label} onChange={(e) => set("label", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Başlık</FieldLabel>
          <TextInput value={data.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <FieldLabel>CTA Buton</FieldLabel>
          <TextInput value={data.cta} onChange={(e) => set("cta", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Hakkında Başlığı</FieldLabel>
          <TextInput value={data.aboutTitle} onChange={(e) => set("aboutTitle", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Süreç Başlığı</FieldLabel>
          <TextInput value={data.processTitle} onChange={(e) => set("processTitle", e.target.value)} />
        </div>
      </div>
      <div>
        <FieldLabel>Açıklama</FieldLabel>
        <TextArea className="h-24" value={data.desc} onChange={(e) => set("desc", e.target.value)} />
      </div>
      <StringListEditor label="Süreç Adımları" values={data.processSteps} onChange={(v) => set("processSteps", v)} />
    </div>
  );
}

function PortfolioForm({ data, onChange }: { data: PortfolioContent; onChange: (v: PortfolioContent) => void }) {
  const set = <K extends keyof PortfolioContent>(k: K, v: PortfolioContent[K]) => onChange({ ...data, [k]: v });
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Başlık</FieldLabel>
          <TextInput value={data.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Alt Başlık</FieldLabel>
          <TextInput value={data.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
        </div>
      </div>
      <StringListEditor label="Kategoriler" values={data.categories} onChange={(v) => set("categories", v)} />
      <SectionTitle>Projeler</SectionTitle>
      {data.projects.map((proj, i) => (
        <div className="rounded-lg border border-[color:var(--app-border)] p-4" key={i}>
          <p className="mb-3 text-xs font-bold text-[color:var(--app-muted)]">Proje {i + 1}</p>
          <div className="grid gap-3">
            <div>
              <FieldLabel>Başlık</FieldLabel>
              <TextInput value={proj.title} onChange={(e) => set("projects", data.projects.map((p, idx) => idx === i ? { ...p, title: e.target.value } : p))} />
            </div>
            <div>
              <FieldLabel>Açıklama</FieldLabel>
              <TextArea className="h-20" value={proj.description} onChange={(e) => set("projects", data.projects.map((p, idx) => idx === i ? { ...p, description: e.target.value } : p))} />
            </div>
            <ImagePickerField
              label="Görsel"
              value={proj.image}
              onChange={(url) => set("projects", data.projects.map((p, idx) => idx === i ? { ...p, image: url } : p))}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function AboutForm({ data, onChange }: { data: AboutContent; onChange: (v: AboutContent) => void }) {
  const set = <K extends keyof AboutContent>(k: K, v: AboutContent[K]) => onChange({ ...data, [k]: v });
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Ön Başlık</FieldLabel>
          <TextInput value={data.pretitle} onChange={(e) => set("pretitle", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Başlık</FieldLabel>
          <TextInput value={data.title} onChange={(e) => set("title", e.target.value)} />
        </div>
      </div>
      <div>
        <FieldLabel>Metin</FieldLabel>
        <TextArea className="h-28" value={data.text} onChange={(e) => set("text", e.target.value)} />
      </div>

      <SectionTitle>Pozisyonlama</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Pozisyon Başlığı</FieldLabel>
          <TextInput value={data.positioningTitle} onChange={(e) => set("positioningTitle", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Differentiators Başlığı</FieldLabel>
          <TextInput value={data.differentiatorsTitle} onChange={(e) => set("differentiatorsTitle", e.target.value)} />
        </div>
      </div>
      <div>
        <FieldLabel>Pozisyon Metni</FieldLabel>
        <TextArea className="h-24" value={data.positioning} onChange={(e) => set("positioning", e.target.value)} />
      </div>

      <SectionTitle>Bizi Farklı Kılan</SectionTitle>
      {data.differentiators.map((diff, i) => (
        <div className="rounded-lg border border-[color:var(--app-border)] p-4" key={i}>
          <p className="mb-3 text-xs font-bold text-[color:var(--app-muted)]">Farkımız {i + 1}</p>
          <div className="grid gap-3">
            <div>
              <FieldLabel>Başlık</FieldLabel>
              <TextInput value={diff.title} onChange={(e) => set("differentiators", data.differentiators.map((v, idx) => idx === i ? { ...v, title: e.target.value } : v))} />
            </div>
            <div>
              <FieldLabel>Açıklama</FieldLabel>
              <TextArea className="h-20" value={diff.description} onChange={(e) => set("differentiators", data.differentiators.map((v, idx) => idx === i ? { ...v, description: e.target.value } : v))} />
            </div>
          </div>
        </div>
      ))}

      <SectionTitle>Temel Değerler</SectionTitle>
      <div>
        <FieldLabel>Değerler Başlığı</FieldLabel>
        <TextInput value={data.valuesTitle} onChange={(e) => set("valuesTitle", e.target.value)} />
      </div>
      {data.values.map((val, i) => (
        <div className="rounded-lg border border-[color:var(--app-border)] p-4" key={i}>
          <p className="mb-3 text-xs font-bold text-[color:var(--app-muted)]">Değer {i + 1}</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <FieldLabel>Başlık</FieldLabel>
              <TextInput value={val.title} onChange={(e) => set("values", data.values.map((v, idx) => idx === i ? { ...v, title: e.target.value } : v))} />
            </div>
            <div>
              <FieldLabel>Metin</FieldLabel>
              <TextInput value={val.text} onChange={(e) => set("values", data.values.map((v, idx) => idx === i ? { ...v, text: e.target.value } : v))} />
            </div>
          </div>
        </div>
      ))}

      <SectionTitle>Ekip</SectionTitle>
      <div>
        <FieldLabel>Ekip Başlığı</FieldLabel>
        <TextInput value={data.teamTitle} onChange={(e) => set("teamTitle", e.target.value)} />
      </div>
      {data.team.map((member, i) => (
        <div className="rounded-lg border border-[color:var(--app-border)] p-4" key={i}>
          <p className="mb-3 text-xs font-bold text-[color:var(--app-muted)]">Ekip Üyesi {i + 1}</p>
          <div className="grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <FieldLabel>Ad Soyad</FieldLabel>
                <TextInput value={member.name} onChange={(e) => set("team", data.team.map((v, idx) => idx === i ? { ...v, name: e.target.value } : v))} />
              </div>
              <div>
                <FieldLabel>Rol</FieldLabel>
                <TextInput value={member.role} onChange={(e) => set("team", data.team.map((v, idx) => idx === i ? { ...v, role: e.target.value } : v))} />
              </div>
            </div>
            <div>
              <FieldLabel>Biyografi</FieldLabel>
              <TextArea className="h-20" value={member.bio} onChange={(e) => set("team", data.team.map((v, idx) => idx === i ? { ...v, bio: e.target.value } : v))} />
            </div>
          </div>
        </div>
      ))}
      <button
        className="rounded-lg border border-dashed border-[color:var(--app-border)] py-3 text-sm font-semibold text-[color:var(--app-muted)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
        onClick={() => set("team", [...data.team, { name: "", role: "", bio: "" }])}
        type="button"
      >
        + Ekip üyesi ekle
      </button>
    </div>
  );
}

function ContactForm({ data, onChange }: { data: ContactContent; onChange: (v: ContactContent) => void }) {
  const set = <K extends keyof ContactContent>(k: K, v: ContactContent[K]) => onChange({ ...data, [k]: v });
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Başlık</FieldLabel>
          <TextInput value={data.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Form Başlığı</FieldLabel>
          <TextInput value={data.formTitle} onChange={(e) => set("formTitle", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Gönder Butonu</FieldLabel>
          <TextInput value={data.send} onChange={(e) => set("send", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Ofis Başlığı</FieldLabel>
          <TextInput value={data.hqTitle} onChange={(e) => set("hqTitle", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Şehir</FieldLabel>
          <TextInput value={data.city} onChange={(e) => set("city", e.target.value)} />
        </div>
      </div>
      <div>
        <FieldLabel>Açıklama Metni</FieldLabel>
        <TextArea className="h-24" value={data.text} onChange={(e) => set("text", e.target.value)} />
      </div>
      <SectionTitle>Form Etiketleri</SectionTitle>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <FieldLabel>Ad Soyad</FieldLabel>
          <TextInput value={data.labels.fullName} onChange={(e) => set("labels", { ...data.labels, fullName: e.target.value })} />
        </div>
        <div>
          <FieldLabel>E-posta</FieldLabel>
          <TextInput value={data.labels.email} onChange={(e) => set("labels", { ...data.labels, email: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Mesaj</FieldLabel>
          <TextInput value={data.labels.message} onChange={(e) => set("labels", { ...data.labels, message: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

// ─── Form dispatcher ──────────────────────────────────────────────────────────

type FormData =
  | { key: "home"; data: HomeContent }
  | { key: "services"; data: ServicesContent }
  | { key: "productPhotography"; data: ProductPhotographyContent }
  | { key: "portfolio"; data: PortfolioContent }
  | { key: "about"; data: AboutContent }
  | { key: "contact"; data: ContactContent };

const PAGE_LABELS: Record<ContentKey, string> = {
  home: "Ana Sayfa",
  services: "Hizmetler",
  productPhotography: "Ürün Fotoğrafçılığı",
  portfolio: "Portfolyo",
  about: "Hakkımızda",
  contact: "İletişim",
};

function buildFormData(key: ContentKey, raw: unknown): FormData {
  switch (key) {
    case "home": return { key, data: parseData(raw, defaultHome) };
    case "services": return { key, data: parseData(raw, defaultServices) };
    case "productPhotography": return { key, data: parseData(raw, defaultProductPhoto) };
    case "portfolio": return { key, data: parseData(raw, defaultPortfolio) };
    case "about": return { key, data: parseData(raw, defaultAbout) };
    case "contact": return { key, data: parseData(raw, defaultContact) };
  }
}

// ─── Stub blocks (used when DB has no rows yet) ───────────────────────────────

const STUB_SORT: Record<ContentKey, number> = {
  home: 0, services: 10, productPhotography: 20, portfolio: 30, about: 40, contact: 50,
};

function buildAllBlocks(dbBlocks: ContentBlockItem[]): ContentBlockItem[] {
  const keys = Object.keys(PAGE_LABELS) as ContentKey[];
  const stubs: ContentBlockItem[] = [];
  for (const key of keys) {
    for (const locale of ["tr", "en"] as const) {
      if (!dbBlocks.find((b) => b.key === key && b.locale === locale)) {
        stubs.push({ id: -1, key, locale, title: PAGE_LABELS[key], slug: null, status: "PUBLISHED", sortOrder: STUB_SORT[key], data: null });
      }
    }
  }
  return [...dbBlocks, ...stubs].sort((a, b) => a.sortOrder - b.sortOrder || a.locale.localeCompare(b.locale));
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AdminContentManager({ initialBlocks }: AdminContentManagerProps) {
  const [blocks, setBlocks] = useState(() => buildAllBlocks(initialBlocks));
  const [selectedKey, setSelectedKey] = useState("home:tr");
  const selectedBlock = useMemo(
    () => blocks.find((b) => `${b.key}:${b.locale}` === selectedKey) ?? blocks[0],
    [blocks, selectedKey],
  );

  const [formData, setFormData] = useState<FormData>(() =>
    buildFormData(selectedBlock?.key ?? "home", selectedBlock?.data),
  );
  const [blockStatus, setBlockStatus] = useState<"DRAFT" | "PUBLISHED">(
    selectedBlock?.status ?? "PUBLISHED",
  );
  const [opStatus, setOpStatus] = useState<OpStatus>({ type: "idle" });

  const selectBlock = (compositeKey: string) => {
    const block = blocks.find((b) => `${b.key}:${b.locale}` === compositeKey);
    if (!block) return;
    setSelectedKey(compositeKey);
    setFormData(buildFormData(block.key, block.data));
    setBlockStatus(block.status);
    setOpStatus({ type: "idle" });
  };

  const handleChange = (data: FormData["data"]) => {
    setFormData((prev) => ({ ...prev, data } as FormData));
  };

  const translate = async () => {
    if (!selectedBlock) return;
    setOpStatus({ type: "translating" });

    const response = await fetch("/api/admin/translate-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: formData.data }),
    });

    const result = (await response.json().catch(() => ({}))) as { ok?: boolean; data?: unknown; error?: string };

    if (!response.ok || !result.ok) {
      setOpStatus({ type: "error", message: result.error ?? "Çeviri başarısız oldu." });
      return;
    }

    const enKey = `${selectedBlock.key}:en`;
    setBlocks((prev) => prev.map((b) => (`${b.key}:${b.locale}` === enKey ? { ...b, data: result.data } : b)));
    setSelectedKey(enKey);
    setFormData(buildFormData(selectedBlock.key, result.data));
    setBlockStatus(blocks.find((b) => `${b.key}:${b.locale}` === enKey)?.status ?? "PUBLISHED");
    setOpStatus({ type: "success", message: "Çeviri tamamlandı — EN bloğuna geçildi. İnceleyip kaydedin." });
  };

  const save = async () => {
    if (!selectedBlock) return;
    setOpStatus({ type: "saving" });

    const payload = {
      key: selectedBlock.key,
      locale: selectedBlock.locale,
      title: selectedBlock.title ?? "",
      slug: selectedBlock.slug ?? "",
      status: blockStatus,
      sortOrder: selectedBlock.sortOrder,
      data: formData.data,
    };

    const response = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setOpStatus({ type: "error", message: "İçerik kaydedilemedi." });
      return;
    }

    setBlocks((prev) => prev.map((b) => (`${b.key}:${b.locale}` === selectedKey ? { ...b, data: formData.data, status: blockStatus } : b)));
    setOpStatus({ type: "success", message: "İçerik kaydedildi." });
  };

  if (!selectedBlock) return null;

  const isTr = selectedBlock.locale === "tr";
  const isWorking = opStatus.type === "saving" || opStatus.type === "translating";

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <Card className="h-max overflow-hidden">
        <div className="border-b border-[color:var(--app-border)] p-5">
          <h2 className="text-xl font-semibold text-[color:var(--primary)]">Sayfalar</h2>
        </div>
        <div className="p-3">
          {blocks.map((block) => {
            const key = `${block.key}:${block.locale}`;
            const isActive = selectedKey === key;
            return (
              <button
                className={`mb-1 w-full rounded-lg px-3 py-3 text-left text-sm transition-colors ${isActive ? "bg-[color:var(--primary)] text-[color:var(--on-primary)]" : "hover:bg-[color:var(--surface-container)]"}`}
                key={key}
                onClick={() => selectBlock(key)}
                type="button"
              >
                <span className="block font-semibold">{PAGE_LABELS[block.key]}</span>
                <span className="block text-xs opacity-75">{block.locale.toUpperCase()} · {block.status}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Form */}
      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[color:var(--primary)]">{PAGE_LABELS[selectedBlock.key]}</h2>
              <p className="text-sm text-[color:var(--app-muted)]">{selectedBlock.locale.toUpperCase()} içeriği</p>
            </div>
            {isTr && (
              <Button disabled={isWorking} onClick={translate} type="button" variant="secondary">
                {opStatus.type === "translating" ? "Çevriliyor..." : "TR → EN Çevir"}
              </Button>
            )}
          </div>

          {opStatus.type === "success" && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300">
              {opStatus.message}
            </div>
          )}
          {opStatus.type === "error" && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
              {opStatus.message}
            </div>
          )}

          <div className="mt-6">
            {formData.key === "home" && <HomeForm data={formData.data} onChange={handleChange} />}
            {formData.key === "services" && <ServicesForm data={formData.data} onChange={handleChange} />}
            {formData.key === "productPhotography" && <ProductPhotoForm data={formData.data} onChange={handleChange} />}
            {formData.key === "portfolio" && <PortfolioForm data={formData.data} onChange={handleChange} />}
            {formData.key === "about" && <AboutForm data={formData.data} onChange={handleChange} />}
            {formData.key === "contact" && <ContactForm data={formData.data} onChange={handleChange} />}
          </div>
        </Card>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-[color:var(--app-muted)]">Durum:</label>
            <select
              className="rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm"
              value={blockStatus}
              onChange={(e) => setBlockStatus(e.target.value as "DRAFT" | "PUBLISHED")}
            >
              <option value="DRAFT">Taslak</option>
              <option value="PUBLISHED">Yayında</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <div>
              {opStatus.type === "success" && <p className="text-sm font-semibold text-green-700 dark:text-green-400">{opStatus.message}</p>}
              {opStatus.type === "error" && <p className="text-sm font-semibold text-[color:var(--error)]">{opStatus.message}</p>}
            </div>
            <Button disabled={isWorking} onClick={save} size="lg" type="button">
              {opStatus.type === "saving" ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
