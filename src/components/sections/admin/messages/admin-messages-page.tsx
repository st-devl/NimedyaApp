"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/site/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/config";

type ContactRequestItem = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: "NEW" | "READ" | "ARCHIVED";
  createdAt: string;
};

export function AdminMessagesPageSections({ locale, requests }: { locale: Locale; requests: ContactRequestItem[] }) {
  const [items, setItems] = useState(requests);

  const updateStatus = async (id: number, status: ContactRequestItem["status"]) => {
    const response = await fetch("/api/admin/contact-requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) return;
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  return (
    <div className="flex min-h-screen bg-[color:var(--app-bg)]">
      <AdminSidebar locale={locale} />
      <main className="ml-72 flex-1 p-8 md:p-[80px]">
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--secondary)]">Admin / Mesajlar</p>
          <h1 className="nmd-headline-xl text-[color:var(--primary)]">Iletisim Talepleri</h1>
          <p className="mt-2 max-w-2xl text-sm text-[color:var(--app-muted)]">Web sitesinden gelen mesajlari takip edin ve durumlarini yonetin.</p>
        </header>

        <div className="grid gap-5">
          {items.map((item) => (
            <Card className="p-6" key={item.id}>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-[color:var(--primary)]">{item.name}</h2>
                    <span className="rounded-full bg-[color:var(--surface-container)] px-3 py-1 text-xs font-semibold text-[color:var(--app-muted)]">{item.status}</span>
                  </div>
                  <a className="mt-1 block text-sm font-semibold text-[color:var(--secondary)]" href={`mailto:${item.email}`}>{item.email}</a>
                  <p className="mt-1 text-xs text-[color:var(--app-muted)]">{new Date(item.createdAt).toLocaleString("tr-TR")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => updateStatus(item.id, "READ")} size="sm" type="button" variant="secondary">Okundu</Button>
                  <Button onClick={() => updateStatus(item.id, "ARCHIVED")} size="sm" type="button" variant="ghost">Arsivle</Button>
                </div>
              </div>
              <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-[color:var(--app-text)]">{item.message}</p>
            </Card>
          ))}
        </div>

        {items.length === 0 ? <p className="rounded-xl border border-dashed border-[color:var(--app-border)] p-8 text-center text-sm text-[color:var(--app-muted)]">Henuz mesaj yok.</p> : null}
      </main>
    </div>
  );
}
