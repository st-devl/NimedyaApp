"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";

type SeoPageItem = {
  id: number;
  routeKey: string;
  locale: "tr" | "en";
  path: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageMediaId: number | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageMediaId: number | null;
  twitterCard: "SUMMARY" | "SUMMARY_LARGE_IMAGE";
  noindex: boolean;
  nofollow: boolean;
};

type MediaOption = {
  id: number;
  url: string;
  altText: string | null;
  originalName: string;
};

type AdminSeoManagerProps = {
  initialPages: SeoPageItem[];
  media: MediaOption[];
};

type Status =
  | { type: "idle" }
  | { type: "saving" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

function toForm(page: SeoPageItem) {
  return {
    ...page,
    canonicalUrl: page.canonicalUrl ?? "",
    ogTitle: page.ogTitle ?? "",
    ogDescription: page.ogDescription ?? "",
    twitterTitle: page.twitterTitle ?? "",
    twitterDescription: page.twitterDescription ?? "",
  };
}

export function AdminSeoManager({ initialPages, media }: AdminSeoManagerProps) {
  const [pages, setPages] = useState(initialPages);
  const [selectedKey, setSelectedKey] = useState(`${initialPages[0]?.routeKey ?? "home"}:tr`);
  const selectedPage = useMemo(() => pages.find((page) => `${page.routeKey}:${page.locale}` === selectedKey) ?? pages[0], [pages, selectedKey]);
  const [form, setForm] = useState(() => toForm(selectedPage));
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const selectPage = (key: string) => {
    const nextPage = pages.find((page) => `${page.routeKey}:${page.locale}` === key);
    if (!nextPage) return;
    setSelectedKey(key);
    setForm(toForm(nextPage));
    setStatus({ type: "idle" });
  };

  const setMedia = (field: "ogImageMediaId" | "twitterImageMediaId", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value ? Number(value) : null }));
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus({ type: "saving" });

    const response = await fetch("/api/admin/seo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setStatus({ type: "error", message: "SEO kaydi guncellenemedi. Alanlari kontrol edin." });
      return;
    }

    setPages((prev) => prev.map((page) => (`${page.routeKey}:${page.locale}` === selectedKey ? { ...page, ...form } : page)));
    setStatus({ type: "success", message: "SEO kaydi guncellendi." });
  };

  if (!selectedPage) {
    return <p className="text-sm text-[color:var(--app-muted)]">SEO kaydi bulunamadi.</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <Card className="h-max overflow-hidden">
        <div className="border-b border-[color:var(--app-border)] p-5">
          <h2 className="text-xl font-semibold text-[color:var(--primary)]">Sayfalar</h2>
        </div>
        <div className="max-h-[680px] overflow-y-auto p-3">
          {pages.map((page) => {
            const key = `${page.routeKey}:${page.locale}`;
            return (
              <button
                className={`mb-2 w-full rounded-lg px-3 py-3 text-left text-sm transition-colors ${selectedKey === key ? "bg-[color:var(--primary)] text-[color:var(--on-primary)]" : "hover:bg-[color:var(--surface-container)]"}`}
                key={key}
                onClick={() => selectPage(key)}
                type="button"
              >
                <span className="block font-semibold">{page.routeKey} / {page.locale.toUpperCase()}</span>
                <span className="block truncate text-xs opacity-75">{page.path}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <form className="grid gap-6" onSubmit={save}>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-[color:var(--primary)]">Temel SEO</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              Route Key
              <TextInput disabled value={form.routeKey} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              Locale
              <TextInput disabled value={form.locale.toUpperCase()} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)] md:col-span-2">
              Path / Slug
              <TextInput value={form.path} onChange={(event) => setForm((prev) => ({ ...prev, path: event.target.value }))} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)] md:col-span-2">
              Meta Title
              <TextInput value={form.metaTitle} onChange={(event) => setForm((prev) => ({ ...prev, metaTitle: event.target.value }))} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)] md:col-span-2">
              Meta Description
              <TextArea className="h-24" value={form.metaDescription} onChange={(event) => setForm((prev) => ({ ...prev, metaDescription: event.target.value }))} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)] md:col-span-2">
              Canonical URL veya Path
              <TextInput value={form.canonicalUrl} onChange={(event) => setForm((prev) => ({ ...prev, canonicalUrl: event.target.value }))} />
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold text-[color:var(--app-muted)]">
              <input checked={form.noindex} onChange={(event) => setForm((prev) => ({ ...prev, noindex: event.target.checked }))} type="checkbox" />
              Noindex
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold text-[color:var(--app-muted)]">
              <input checked={form.nofollow} onChange={(event) => setForm((prev) => ({ ...prev, nofollow: event.target.checked }))} type="checkbox" />
              Nofollow
            </label>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-[color:var(--primary)]">Open Graph ve Twitter/X</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              OG Title
              <TextInput value={form.ogTitle} onChange={(event) => setForm((prev) => ({ ...prev, ogTitle: event.target.value }))} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              Twitter Title
              <TextInput value={form.twitterTitle} onChange={(event) => setForm((prev) => ({ ...prev, twitterTitle: event.target.value }))} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              OG Description
              <TextArea className="h-24" value={form.ogDescription} onChange={(event) => setForm((prev) => ({ ...prev, ogDescription: event.target.value }))} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              Twitter Description
              <TextArea className="h-24" value={form.twitterDescription} onChange={(event) => setForm((prev) => ({ ...prev, twitterDescription: event.target.value }))} />
            </label>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[color:var(--app-muted)]">OG Image</label>
              <select className="h-11 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3" value={String(form.ogImageMediaId ?? "")} onChange={(event) => setMedia("ogImageMediaId", event.target.value)}>
                <option value="">Varsayilan / Yok</option>
                {media.map((item) => <option key={item.id} value={item.id}>{item.originalName} (#{item.id})</option>)}
              </select>
              <p className="text-xs text-[color:var(--app-muted)] opacity-70">1200×630 px — Facebook, LinkedIn önizleme görseli</p>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[color:var(--app-muted)]">Twitter Image</label>
              <select className="h-11 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3" value={String(form.twitterImageMediaId ?? "")} onChange={(event) => setMedia("twitterImageMediaId", event.target.value)}>
                <option value="">OG / Varsayilan</option>
                {media.map((item) => <option key={item.id} value={item.id}>{item.originalName} (#{item.id})</option>)}
              </select>
              <p className="text-xs text-[color:var(--app-muted)] opacity-70">1200×675 px — Twitter/X önizleme görseli (16:9)</p>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              Twitter Card
              <select className="h-11 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3" value={form.twitterCard} onChange={(event) => setForm((prev) => ({ ...prev, twitterCard: event.target.value as "SUMMARY" | "SUMMARY_LARGE_IMAGE" }))}>
                <option value="SUMMARY_LARGE_IMAGE">Summary Large Image</option>
                <option value="SUMMARY">Summary</option>
              </select>
            </label>
          </div>
        </Card>

        <div className="flex items-center justify-between gap-4">
          <div>
            {status.type === "success" ? <p className="text-sm font-semibold text-green-700">{status.message}</p> : null}
            {status.type === "error" ? <p className="text-sm font-semibold text-[color:var(--error)]">{status.message}</p> : null}
          </div>
          <Button disabled={status.type === "saving"} size="lg" type="submit">{status.type === "saving" ? "Kaydediliyor..." : "SEO Kaydet"}</Button>
        </div>
      </form>
    </div>
  );
}
