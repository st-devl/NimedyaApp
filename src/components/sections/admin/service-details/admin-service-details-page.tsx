"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminServiceDetailForm, type ServiceDetailFormData } from "./admin-service-detail-form";

type ServiceDetailRow = {
  id: number;
  key: string;
  locale: string;
  slug: string;
  label: string;
  title: string;
  status: "DRAFT" | "PUBLISHED";
  updatedAt: string;
};

type Props = {
  initialItems: ServiceDetailRow[];
};

const STATUS_LABELS = { DRAFT: "Taslak", PUBLISHED: "Yayında" } as const;

export function AdminServiceDetailsPageSections({ initialItems }: Props) {
  const [items, setItems] = useState<ServiceDetailRow[]>(initialItems);
  const [editing, setEditing] = useState<ServiceDetailRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm("Bu hizmet detayını silmek istediğinize emin misiniz?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/service-details/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } finally {
      setDeleting(null);
    }
  }

  async function refreshItems() {
    try {
      const res = await fetch("/api/admin/service-details");
      if (res.ok) {
        const body = await res.json() as { items: ServiceDetailRow[] };
        setItems(body.items.map((r) => ({ ...r, status: r.status as "DRAFT" | "PUBLISHED" })));
      }
    } catch {}
  }

  function openEdit(item: ServiceDetailRow) {
    setEditing(item);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCreate() {
    setEditing(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSaved() {
    setShowForm(false);
    setEditing(null);
    refreshItems();
  }

  function handleCancel() {
    setShowForm(false);
    setEditing(null);
  }

  const formInitial: Partial<ServiceDetailFormData> | undefined = editing
    ? {
        key: editing.key,
        locale: editing.locale as "tr" | "en",
        slug: editing.slug,
        label: editing.label,
        title: editing.title,
        status: editing.status,
      }
    : undefined;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--primary)]">Hizmet Detayları</h1>
          <p className="mt-1 text-sm text-[color:var(--app-muted)]">Her hizmet sayfasının detaylı içeriğini yönetin.</p>
        </div>
        <Button onClick={openCreate}>+ Yeni Ekle</Button>
      </div>

      {showForm && (
        <AdminServiceDetailForm
          id={editing?.id}
          initial={formInitial}
          onCancel={handleCancel}
          onSaved={handleSaved}
        />
      )}

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[color:var(--app-border)] p-16 text-center">
          <p className="text-sm text-[color:var(--app-muted)]">Henüz hizmet detayı eklenmemiş.</p>
          <button className="mt-4 text-sm font-semibold text-[color:var(--secondary)] hover:underline" onClick={openCreate} type="button">
            İlk detayı ekle →
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[color:var(--app-border)]/30">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--surface-container-low)]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">Anahtar</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">Başlık</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">Dil</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">Durum</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]">Güncelleme</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--app-border)]/20 bg-[color:var(--app-card)]">
              {items.map((item) => (
                <tr className="hover:bg-[color:var(--surface-container-low)]" key={item.id}>
                  <td className="px-4 py-3 font-mono text-xs text-[color:var(--app-muted)]">{item.key}</td>
                  <td className="px-4 py-3 font-medium text-[color:var(--primary)]">{item.title || item.label}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[color:var(--app-muted)]">{item.slug}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-[color:var(--surface-container)] px-2 py-0.5 text-xs font-semibold uppercase text-[color:var(--app-muted)]">
                      {item.locale}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === "PUBLISHED" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"}`}>
                      {STATUS_LABELS[item.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[color:var(--app-muted)]">
                    {new Date(item.updatedAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        className="text-xs font-semibold text-[color:var(--secondary)] hover:underline"
                        onClick={() => openEdit(item)}
                        type="button"
                      >
                        Düzenle
                      </button>
                      <button
                        className="text-xs font-semibold text-red-500 hover:underline disabled:opacity-40"
                        disabled={deleting === item.id}
                        onClick={() => handleDelete(item.id)}
                        type="button"
                      >
                        {deleting === item.id ? "..." : "Sil"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
