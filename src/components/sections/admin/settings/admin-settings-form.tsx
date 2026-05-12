"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextInput } from "@/components/ui/input";
import type { SocialLink } from "@/lib/cms/settings";

type MediaOption = {
  id: number;
  url: string;
  altText: string | null;
  originalName: string;
};

type SettingsFormState = {
  siteName: string;
  baseUrl: string;
  defaultLocale: "tr" | "en";
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  socialLinks: SocialLink[];
  logoMediaId: number | null;
  faviconMediaId: number | null;
  defaultOgMediaId: number | null;
  robotsAllowIndex: boolean;
};

type AdminSettingsFormProps = {
  initialSettings: SettingsFormState;
  media: MediaOption[];
};

type SaveState =
  | { type: "idle" }
  | { type: "saving" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

function mediaLabel(item: MediaOption) {
  return `${item.originalName} (#${item.id})`;
}

export function AdminSettingsForm({ initialSettings, media }: AdminSettingsFormProps) {
  const [form, setForm] = useState<SettingsFormState>(initialSettings);
  const [saveState, setSaveState] = useState<SaveState>({ type: "idle" });

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
    }));
  };

  const addSocialLink = () => {
    setForm((prev) => ({ ...prev, socialLinks: [...prev.socialLinks, { label: "", url: "" }] }));
  };

  const removeSocialLink = (index: number) => {
    setForm((prev) => ({ ...prev, socialLinks: prev.socialLinks.filter((_, itemIndex) => itemIndex !== index) }));
  };

  const onMediaChange = (field: "logoMediaId" | "faviconMediaId" | "defaultOgMediaId", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value ? Number(value) : null }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaveState({ type: "saving" });

    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setSaveState({ type: "error", message: "Ayarlar kaydedilemedi. Alanlari kontrol edin." });
      return;
    }

    setSaveState({ type: "success", message: "Ayarlar kaydedildi." });
  };

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-[color:var(--primary)]">Genel Ayarlar</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
            Site Adi
            <TextInput value={form.siteName} onChange={(event) => setForm((prev) => ({ ...prev, siteName: event.target.value }))} />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
            Site URL
            <TextInput value={form.baseUrl} onChange={(event) => setForm((prev) => ({ ...prev, baseUrl: event.target.value }))} />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
            Varsayilan Dil
            <select
              className="h-11 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3 text-[color:var(--app-text)]"
              value={form.defaultLocale}
              onChange={(event) => setForm((prev) => ({ ...prev, defaultLocale: event.target.value as "tr" | "en" }))}
            >
              <option value="tr">TR</option>
              <option value="en">EN</option>
            </select>
          </label>
          <label className="flex items-center gap-3 pt-7 text-sm font-semibold text-[color:var(--app-muted)]">
            <input checked={form.robotsAllowIndex} onChange={(event) => setForm((prev) => ({ ...prev, robotsAllowIndex: event.target.checked }))} type="checkbox" />
            Public sayfalar indexlenebilir
          </label>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-[color:var(--primary)]">Marka ve Paylasim Gorselleri</h2>
        <p className="mt-2 text-sm text-[color:var(--app-muted)]">Medya yukleme Phase 4 kapsaminda eklenecek; burada mevcut medya kayitlari secilir.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["logoMediaId", "Logo"],
            ["faviconMediaId", "Favicon"],
            ["defaultOgMediaId", "Varsayilan OG Gorseli"],
          ].map(([field, label]) => (
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]" key={field}>
              {label}
              <select
                className="h-11 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3 text-[color:var(--app-text)]"
                value={String(form[field as "logoMediaId" | "faviconMediaId" | "defaultOgMediaId"] ?? "")}
                onChange={(event) => onMediaChange(field as "logoMediaId" | "faviconMediaId" | "defaultOgMediaId", event.target.value)}
              >
                <option value="">Secili medya yok</option>
                {media.map((item) => (
                  <option key={item.id} value={item.id}>{mediaLabel(item)}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-[color:var(--primary)]">Iletisim</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
            E-posta
            <TextInput value={form.contactEmail} onChange={(event) => setForm((prev) => ({ ...prev, contactEmail: event.target.value }))} />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
            Telefon
            <TextInput value={form.contactPhone} onChange={(event) => setForm((prev) => ({ ...prev, contactPhone: event.target.value }))} />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
            Konum
            <TextInput value={form.contactLocation} onChange={(event) => setForm((prev) => ({ ...prev, contactLocation: event.target.value }))} />
          </label>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-[color:var(--primary)]">Sosyal Linkler</h2>
          <Button onClick={addSocialLink} type="button" variant="ghost">Link Ekle</Button>
        </div>
        <div className="mt-6 grid gap-4">
          {form.socialLinks.map((item, index) => (
            <div className="grid gap-3 rounded-xl border border-[color:var(--app-border)] p-4 md:grid-cols-[1fr_2fr_auto]" key={`${item.label}-${index}`}>
              <TextInput placeholder="Platform" value={item.label} onChange={(event) => updateSocialLink(index, "label", event.target.value)} />
              <TextInput placeholder="https://..." value={item.url} onChange={(event) => updateSocialLink(index, "url", event.target.value)} />
              <Button onClick={() => removeSocialLink(index)} type="button" variant="danger">Sil</Button>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center justify-between gap-4">
        <div>
          {saveState.type === "success" ? <p className="text-sm font-semibold text-green-700">{saveState.message}</p> : null}
          {saveState.type === "error" ? <p className="text-sm font-semibold text-[color:var(--error)]">{saveState.message}</p> : null}
        </div>
        <Button disabled={saveState.type === "saving"} size="lg" type="submit">
          {saveState.type === "saving" ? "Kaydediliyor..." : "Ayarlari Kaydet"}
        </Button>
      </div>
    </form>
  );
}
