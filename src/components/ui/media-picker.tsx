"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

type MediaItem = {
  id: number;
  url: string;
  originalName: string;
  altText: string | null;
};

type MediaPickerProps = {
  value: string;
  onChange: (url: string) => void;
};

function MediaPickerModal({
  value,
  onSelect,
  onClose,
}: {
  value: string;
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/media")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ ok: boolean; data?: { media: MediaItem[] } }>;
      })
      .then((json) => setMedia(json.data?.media ?? []))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Bilinmeyen hata"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* panel */}
      <div className="relative z-10 mx-4 flex max-h-[85vh] w-full max-w-3xl flex-col rounded-xl border border-[color:var(--app-border)] bg-[color:var(--app-card)] shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-[color:var(--app-border)] px-6 py-4">
          <h2 className="text-xl font-semibold text-[color:var(--primary)]">Medya Kütüphanesi</h2>
          <button
            className="rounded-md px-2 py-1 text-lg leading-none text-[color:var(--app-muted)] hover:bg-[color:var(--surface-container)]"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="overflow-y-auto p-6">
          {loading && (
            <p className="py-12 text-center text-sm text-[color:var(--app-muted)]">Yükleniyor...</p>
          )}
          {error && (
            <p className="py-12 text-center text-sm text-[color:var(--error)]">Hata: {error}</p>
          )}
          {!loading && !error && media.length === 0 && (
            <p className="py-12 text-center text-sm text-[color:var(--app-muted)]">Henüz medya yüklenmedi.</p>
          )}
          {!loading && !error && media.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {media.map((item) => {
                const selected = value === item.url;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item.url)}
                    type="button"
                    className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all hover:border-[color:var(--primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] ${
                      selected
                        ? "border-[color:var(--primary)] ring-2 ring-[color:var(--primary)]"
                        : "border-[color:var(--app-border)]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={item.altText ?? item.originalName}
                      className="absolute inset-0 h-full w-full object-cover"
                      src={item.url}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="truncate text-xs text-white">{item.originalName}</p>
                    </div>
                    {selected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--primary)]/20">
                        <span className="rounded-full bg-[color:var(--primary)] px-2 py-0.5 text-xs font-semibold text-[color:var(--on-primary)]">
                          Seçili
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function MediaPicker({ value, onChange }: MediaPickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (url: string) => {
    onChange(url);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" type="button" variant="ghost" className="shrink-0">
        Galeriden Seç
      </Button>
      {open && (
        <MediaPickerModal value={value} onSelect={handleSelect} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
