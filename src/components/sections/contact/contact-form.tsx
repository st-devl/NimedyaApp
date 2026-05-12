"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextArea, TextInput } from "@/components/ui/input";
import type { ContactContent } from "@/types/content";

type ContactFormProps = {
  labels: ContactContent["labels"];
  sendLabel: string;
};

type FormState = {
  fullName: string;
  email: string;
  message: string;
};

export function ContactForm({ labels, sendLabel }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({ fullName: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = () => {
    const nextErrors: Partial<FormState> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Ad Soyad zorunludur.";
    if (!form.email.trim()) nextErrors.email = "E-posta zorunludur.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Gecerli bir e-posta girin.";
    if (!form.message.trim()) nextErrors.message = "Mesaj zorunludur.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.fullName, email: form.email, message: form.message }),
      });

      if (!response.ok) {
        setErrors((prev) => ({ ...prev, message: "Mesaj gonderilemedi. Lutfen tekrar deneyin." }));
        return;
      }

      setSuccess("Mesajiniz alindi. En kisa surede donus yapacagiz.");
      setForm({ fullName: "", email: "", message: "" });
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="full-name">{labels.fullName}</label>
        <TextInput id="full-name" name="fullName" value={form.fullName} onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))} />
        {errors.fullName ? <p className="mt-1 text-xs text-[color:var(--error)]">{errors.fullName}</p> : null}
      </div>
      <div>
        <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="email">{labels.email}</label>
        <TextInput id="email" name="email" type="email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
        {errors.email ? <p className="mt-1 text-xs text-[color:var(--error)]">{errors.email}</p> : null}
      </div>
      <div>
        <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="message">{labels.message}</label>
        <TextArea className="h-36" id="message" name="message" value={form.message} onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} />
        {errors.message ? <p className="mt-1 text-xs text-[color:var(--error)]">{errors.message}</p> : null}
      </div>
      <Button className="hover:-translate-y-1" disabled={loading} size="lg" type="submit">
        {loading ? "Gonderiliyor..." : sendLabel}
      </Button>
      {success ? <p className="text-sm text-[color:var(--success)]">{success}</p> : null}
    </form>
  );
}
