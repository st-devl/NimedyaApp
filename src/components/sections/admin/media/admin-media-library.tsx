"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextInput } from "@/components/ui/input";

type MediaItem = {
  id: number;
  url: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  altText: string | null;
};

type AdminMediaLibraryProps = {
  media: MediaItem[];
};

type Status =
  | { type: "idle" }
  | { type: "busy"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AdminMediaLibrary({ media }: AdminMediaLibraryProps) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [altDrafts, setAltDrafts] = useState<Record<number, string>>(() => Object.fromEntries(media.map((item) => [item.id, item.altText ?? ""])));

  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const files = Array.from(fileInput.files ?? []);
    if (files.length === 0) return;

    const altText = (form.elements.namedItem("altText") as HTMLInputElement).value.trim();
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      setStatus({ type: "busy", message: `Yükleniyor ${i + 1}/${files.length}…` });
      const formData = new FormData();
      formData.append("file", files[i]);
      if (altText) formData.append("altText", altText);

      const response = await fetch("/api/admin/media", { method: "POST", body: formData });
      if (!response.ok) errors.push(files[i].name);
    }

    form.reset();
    router.refresh();

    if (errors.length === 0) {
      setStatus({ type: "success", message: files.length === 1 ? "Medya yüklendi." : `${files.length} dosya yüklendi.` });
    } else if (errors.length === files.length) {
      setStatus({ type: "error", message: "Hiçbir dosya yüklenemedi. Dosya tipi ve boyutunu kontrol edin." });
    } else {
      setStatus({ type: "error", message: `${files.length - errors.length}/${files.length} yüklendi. Başarısız: ${errors.join(", ")}` });
    }
  };

  const saveAlt = async (id: number) => {
    setStatus({ type: "busy", message: "Alt metin kaydediliyor..." });
    const response = await fetch(`/api/admin/media/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ altText: altDrafts[id] ?? "" }),
    });

    if (!response.ok) {
      setStatus({ type: "error", message: "Alt metin kaydedilemedi." });
      return;
    }

    setStatus({ type: "success", message: "Alt metin kaydedildi." });
    router.refresh();
  };

  const deleteMedia = async (id: number) => {
    setStatus({ type: "busy", message: "Medya siliniyor..." });
    const response = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setStatus({ type: "error", message: "Medya silinemedi." });
      return;
    }

    setStatus({ type: "success", message: "Medya silindi." });
    router.refresh();
  };

  return (
    <div className="grid gap-8">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-[color:var(--primary)]">Yeni Medya Yukle</h2>
        <p className="mt-2 text-sm text-[color:var(--app-muted)]">JPG, PNG, WebP, SVG ve ICO desteklenir. Maksimum dosya boyutu 10MB.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]" onSubmit={upload}>
          <input accept="image/jpeg,image/png,image/webp,image/svg+xml,image/x-icon" className="rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-3 py-2" multiple name="file" required type="file" />
          <TextInput name="altText" placeholder="Gorsel alt metni" />
          <Button disabled={status.type === "busy"} type="submit">Yukle</Button>
        </form>
        {status.type === "success" ? <p className="mt-4 text-sm font-semibold text-green-700">{status.message}</p> : null}
        {status.type === "error" ? <p className="mt-4 text-sm font-semibold text-[color:var(--error)]">{status.message}</p> : null}
        {status.type === "busy" ? <p className="mt-4 text-sm font-semibold text-[color:var(--app-muted)]">{status.message}</p> : null}
      </Card>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {media.map((item) => (
          <Card className="overflow-hidden" key={item.id}>
            <div className="relative h-56 bg-[color:var(--surface-container)]">
              <Image alt={item.altText || item.originalName} className="object-cover" fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" src={item.url} />
            </div>
            <div className="grid gap-4 p-5">
              <div>
                <h3 className="truncate font-semibold text-[color:var(--primary)]">{item.originalName}</h3>
                <p className="mt-1 text-xs text-[color:var(--app-muted)]">#{item.id} · {item.mimeType} · {formatSize(item.sizeBytes)}</p>
                <p className="mt-1 break-all text-xs text-[color:var(--app-muted)]">{item.url}</p>
              </div>
              <TextInput value={altDrafts[item.id] ?? ""} onChange={(event) => setAltDrafts((prev) => ({ ...prev, [item.id]: event.target.value }))} placeholder="Alt metin" />
              <div className="flex justify-between gap-3">
                <Button onClick={() => saveAlt(item.id)} size="sm" type="button" variant="secondary">Alt Kaydet</Button>
                <Button onClick={() => deleteMedia(item.id)} size="sm" type="button" variant="danger">Sil</Button>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {media.length === 0 ? <p className="rounded-xl border border-dashed border-[color:var(--app-border)] p-8 text-center text-sm text-[color:var(--app-muted)]">Henuz medya yuklenmedi.</p> : null}
    </div>
  );
}
