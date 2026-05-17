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
  whatsappPhone: string;
  contactLocation: string;
  socialLinks: SocialLink[];
  logoMediaId: number | null;
  logoWhiteMediaId: number | null;
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

  const onMediaChange = (field: "logoMediaId" | "logoWhiteMediaId" | "faviconMediaId" | "defaultOgMediaId", value: string) => {
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
          {([
            ["logoMediaId", "Logo (Koyu — Light mod)", "Açık zemin için koyu/renkli logo. PNG veya SVG, şeffaf arka plan."],
            ["logoWhiteMediaId", "Logo (Beyaz — Dark mod)", "Koyu zemin için beyaz/açık logo. PNG veya SVG, şeffaf arka plan."],
            ["faviconMediaId", "Favicon", "64×64 px — PNG veya ICO, kare"],
            ["defaultOgMediaId", "Varsayilan OG Gorseli", "1200×630 px — JPEG veya WebP, 16:9"],
          ] as const).map(([field, label, hint]) => (
            <div className="grid gap-2" key={field}>
              <label className="text-sm font-semibold text-[color:var(--app-muted)]">
                {label}
              </label>
              <select
                className="h-11 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3 text-[color:var(--app-text)]"
                value={String(form[field] ?? "")}
                onChange={(event) => onMediaChange(field, event.target.value)}
              >
                <option value="">Secili medya yok</option>
                {media.map((item) => (
                  <option key={item.id} value={item.id}>{mediaLabel(item)}</option>
                ))}
              </select>
              <p className="text-xs text-[color:var(--app-muted)] opacity-70">{hint}</p>
            </div>
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

        {/* WhatsApp */}
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="mb-3 flex items-center gap-2.5">
            <svg fill="#25D366" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="text-sm font-bold text-green-800">WhatsApp Butonu</span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">Sayfanın sağ altında görünür</span>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-green-700">
            WhatsApp Numarası <span className="font-normal text-green-600 opacity-80">— uluslararası format: +905XXXXXXXXX</span>
            <TextInput
              placeholder="+905551234567"
              value={form.whatsappPhone}
              onChange={(event) => setForm((prev) => ({ ...prev, whatsappPhone: event.target.value }))}
            />
          </label>
          <p className="mt-2 text-xs text-green-600">Boş bırakılırsa WhatsApp butonu sayfada görünmez.</p>
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
