"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";

type ContentBlockItem = {
  id: number;
  key: "home" | "services" | "productPhotography" | "portfolio" | "about" | "contact";
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

type Status =
  | { type: "idle" }
  | { type: "saving" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

function toJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function AdminContentManager({ initialBlocks }: AdminContentManagerProps) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [selectedKey, setSelectedKey] = useState(`${initialBlocks[0]?.key ?? "home"}:tr`);
  const selectedBlock = useMemo(() => blocks.find((block) => `${block.key}:${block.locale}` === selectedKey) ?? blocks[0], [blocks, selectedKey]);
  const [title, setTitle] = useState(selectedBlock?.title ?? "");
  const [slug, setSlug] = useState(selectedBlock?.slug ?? "");
  const [statusValue, setStatusValue] = useState<"DRAFT" | "PUBLISHED">(selectedBlock?.status ?? "PUBLISHED");
  const [sortOrder, setSortOrder] = useState(selectedBlock?.sortOrder ?? 0);
  const [jsonText, setJsonText] = useState(() => toJson(selectedBlock?.data ?? {}));
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const selectBlock = (key: string) => {
    const block = blocks.find((item) => `${item.key}:${item.locale}` === key);
    if (!block) return;
    setSelectedKey(key);
    setTitle(block.title ?? "");
    setSlug(block.slug ?? "");
    setStatusValue(block.status);
    setSortOrder(block.sortOrder);
    setJsonText(toJson(block.data));
    setStatus({ type: "idle" });
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedBlock) return;

    let data: unknown;
    try {
      data = JSON.parse(jsonText) as unknown;
    } catch {
      setStatus({ type: "error", message: "JSON formati gecersiz." });
      return;
    }

    setStatus({ type: "saving" });
    const payload = { key: selectedBlock.key, locale: selectedBlock.locale, title, slug, status: statusValue, sortOrder, data };
    const response = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus({ type: "error", message: "Icerik kaydedilemedi. JSON yapisini ve alanlari kontrol edin." });
      return;
    }

    setBlocks((prev) => prev.map((block) => (`${block.key}:${block.locale}` === selectedKey ? { ...block, ...payload } : block)));
    setStatus({ type: "success", message: "Icerik kaydedildi." });
  };

  if (!selectedBlock) return <p>Icerik kaydi bulunamadi.</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <Card className="h-max overflow-hidden">
        <div className="border-b border-[color:var(--app-border)] p-5">
          <h2 className="text-xl font-semibold text-[color:var(--primary)]">Bloklar</h2>
        </div>
        <div className="p-3">
          {blocks.map((block) => {
            const key = `${block.key}:${block.locale}`;
            return (
              <button
                className={`mb-2 w-full rounded-lg px-3 py-3 text-left text-sm transition-colors ${selectedKey === key ? "bg-[color:var(--primary)] text-[color:var(--on-primary)]" : "hover:bg-[color:var(--surface-container)]"}`}
                key={key}
                onClick={() => selectBlock(key)}
                type="button"
              >
                <span className="block font-semibold">{block.key} / {block.locale.toUpperCase()}</span>
                <span className="block text-xs opacity-75">{block.status}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <form className="grid gap-6" onSubmit={save}>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-[color:var(--primary)]">Icerik Duzenle</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              Baslik
              <TextInput value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              Slug
              <TextInput value={slug} onChange={(event) => setSlug(event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              Durum
              <select className="h-11 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3" value={statusValue} onChange={(event) => setStatusValue(event.target.value as "DRAFT" | "PUBLISHED")}>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)]">
              Siralama
              <TextInput type="number" value={String(sortOrder)} onChange={(event) => setSortOrder(Number(event.target.value))} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--app-muted)] md:col-span-2">
              JSON Icerik
              <TextArea className="min-h-[520px] font-mono text-sm" value={jsonText} onChange={(event) => setJsonText(event.target.value)} />
            </label>
          </div>
        </Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            {status.type === "success" ? <p className="text-sm font-semibold text-green-700">{status.message}</p> : null}
            {status.type === "error" ? <p className="text-sm font-semibold text-[color:var(--error)]">{status.message}</p> : null}
          </div>
          <Button disabled={status.type === "saving"} size="lg" type="submit">{status.type === "saving" ? "Kaydediliyor..." : "Icerigi Kaydet"}</Button>
        </div>
      </form>
    </div>
  );
}
