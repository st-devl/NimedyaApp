"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextArea, TextInput } from "@/components/ui/input";
import type { ContactContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";

type ContactFormProps = {
  labels: ContactContent["labels"];
  sendLabel: string;
  locale: Locale;
};

type FormState = {
  fullName: string;
  email: string;
  message: string;
  serviceType: string;
  budget: string;
  timeline: string;
};

const formMessages = {
  tr: {
    required: { fullName: "Ad Soyad zorunludur.", email: "E-posta zorunludur.", message: "Mesaj zorunludur." },
    invalidEmail: "Geçerli bir e-posta girin.",
    sendError: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
    success: "Mesajınız alındı. En kısa sürede dönüş yapacağız.",
    sending: "Gönderiliyor...",
    serviceType: "Hizmet Türü",
    serviceTypePlaceholder: "Hizmet seçin...",
    budget: "Bütçe Aralığı",
    budgetPlaceholder: "Bütçe seçin...",
    timeline: "Zaman Çizelgesi",
    timelinePlaceholder: "Zaman aralığı seçin...",
    serviceOptions: [
      { value: "urun-fotografciligi", label: "Ürün Fotoğrafçılığı" },
      { value: "tanitim-filmi", label: "Tanıtım Filmi" },
      { value: "kurumsal-fotograf", label: "Kurumsal Fotoğraf" },
      { value: "sosyal-medya", label: "Sosyal Medya İçerikleri" },
      { value: "marka-kimlik", label: "Marka & Kimlik Tasarımı" },
      { value: "diger", label: "Diğer" },
    ],
    budgetOptions: [
      { value: "5k-altı", label: "5.000 ₺ altı" },
      { value: "5k-15k", label: "5.000 – 15.000 ₺" },
      { value: "15k-30k", label: "15.000 – 30.000 ₺" },
      { value: "30k-ustu", label: "30.000 ₺ üzeri" },
    ],
    timelineOptions: [
      { value: "acil", label: "Acil (1 hafta içi)" },
      { value: "1-ay", label: "1 ay içinde" },
      { value: "1-3-ay", label: "1–3 ay arası" },
      { value: "3-ay-ustu", label: "3 aydan uzun" },
    ],
  },
  en: {
    required: { fullName: "Full name is required.", email: "Email is required.", message: "Message is required." },
    invalidEmail: "Please enter a valid email address.",
    sendError: "Message could not be sent. Please try again.",
    success: "Your message has been received. We'll get back to you shortly.",
    sending: "Sending...",
    serviceType: "Service Type",
    serviceTypePlaceholder: "Select a service...",
    budget: "Budget Range",
    budgetPlaceholder: "Select a budget...",
    timeline: "Timeline",
    timelinePlaceholder: "Select a timeline...",
    serviceOptions: [
      { value: "product-photography", label: "Product Photography" },
      { value: "promotional-video", label: "Promotional Video" },
      { value: "corporate-photography", label: "Corporate Photography" },
      { value: "social-media", label: "Social Media Content" },
      { value: "brand-identity", label: "Brand & Identity Design" },
      { value: "other", label: "Other" },
    ],
    budgetOptions: [
      { value: "under-500", label: "Under $500" },
      { value: "500-1500", label: "$500 – $1,500" },
      { value: "1500-3000", label: "$1,500 – $3,000" },
      { value: "over-3000", label: "Over $3,000" },
    ],
    timelineOptions: [
      { value: "urgent", label: "Urgent (within 1 week)" },
      { value: "1-month", label: "Within 1 month" },
      { value: "1-3-months", label: "1–3 months" },
      { value: "over-3-months", label: "More than 3 months" },
    ],
  },
} as const;

export function ContactForm({ labels, sendLabel, locale }: ContactFormProps) {
  const m = formMessages[locale];
  const [form, setForm] = useState<FormState>({ fullName: "", email: "", message: "", serviceType: "", budget: "", timeline: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = m.required.fullName;
    if (!form.email.trim()) nextErrors.email = m.required.email;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = m.invalidEmail;
    if (!form.message.trim()) nextErrors.message = m.required.message;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const body: Record<string, string> = { name: form.fullName, email: form.email, message: form.message };
      if (form.serviceType) body.serviceType = form.serviceType;
      if (form.budget) body.budget = form.budget;
      if (form.timeline) body.timeline = form.timeline;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        setErrors((prev) => ({ ...prev, message: m.sendError }));
        return;
      }

      setSuccess(m.success);
      setForm({ fullName: "", email: "", message: "", serviceType: "", budget: "", timeline: "" });
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  const selectClass = "w-full rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-bg)] px-4 py-3 text-sm text-[color:var(--app-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/40";

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="full-name">{labels.fullName}</label>
        <TextInput id="full-name" name="fullName" value={form.fullName} onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))} />
        {errors.fullName ? <p aria-live="assertive" className="mt-1 text-xs text-[color:var(--error)]" role="alert">{errors.fullName}</p> : null}
      </div>
      <div>
        <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="email">{labels.email}</label>
        <TextInput id="email" name="email" type="email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
        {errors.email ? <p aria-live="assertive" className="mt-1 text-xs text-[color:var(--error)]" role="alert">{errors.email}</p> : null}
      </div>

      <div>
        <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="service-type">{m.serviceType}</label>
        <select
          className={selectClass}
          id="service-type"
          name="serviceType"
          value={form.serviceType}
          onChange={(e) => setForm((prev) => ({ ...prev, serviceType: e.target.value }))}
        >
          <option value="">{m.serviceTypePlaceholder}</option>
          {m.serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <details className="group rounded-lg border border-[color:var(--app-border)]/50 px-4 py-3">
        <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-wider text-[color:var(--app-muted)] [&::-webkit-details-marker]:hidden">
          <span>{locale === "tr" ? "Bütçe & Zaman" : "Budget & Timeline"} <span className="ml-1.5 rounded-full bg-[color:var(--app-border)]/60 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal">{locale === "tr" ? "opsiyonel" : "optional"}</span></span>
          <span className="text-lg font-light text-[color:var(--app-muted)] nmd-transition group-open:rotate-45">+</span>
        </summary>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="budget">{m.budget}</label>
            <select
              className={selectClass}
              id="budget"
              name="budget"
              value={form.budget}
              onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
            >
              <option value="">{m.budgetPlaceholder}</option>
              {m.budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="timeline">{m.timeline}</label>
            <select
              className={selectClass}
              id="timeline"
              name="timeline"
              value={form.timeline}
              onChange={(e) => setForm((prev) => ({ ...prev, timeline: e.target.value }))}
            >
              <option value="">{m.timelinePlaceholder}</option>
              {m.timelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </details>

      <div>
        <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="message">{labels.message}</label>
        <TextArea className="h-36" id="message" name="message" value={form.message} onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} />
        {errors.message ? <p aria-live="assertive" className="mt-1 text-xs text-[color:var(--error)]" role="alert">{errors.message}</p> : null}
      </div>
      <Button className="hover:-translate-y-1" disabled={loading} size="lg" type="submit">
        {loading ? m.sending : sendLabel}
      </Button>
      <div aria-live="polite" aria-atomic="true">
        {success ? <p className="text-sm text-[color:var(--success)]">{success}</p> : null}
      </div>
    </form>
  );
}
