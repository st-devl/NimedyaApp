"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";

type QuoteWidgetProps = {
  locale: Locale;
  preselectedService?: string;
  title?: string;
  subtitle?: string;
};

const i18n = {
  tr: {
    title: "Ücretsiz Teklif Al",
    subtitle: "48 saat içinde geri dönüş garantisi.",
    name: "Ad Soyad *",
    namePlaceholder: "Adınız Soyadınız",
    email: "E-posta *",
    emailPlaceholder: "sirket@ornek.com",
    phone: "Telefon",
    phonePlaceholder: "+90 5XX XXX XX XX",
    service: "Hizmet Türü",
    servicePlaceholder: "Hizmet seçin...",
    budget: "Bütçe Aralığı",
    budgetPlaceholder: "Bütçe seçin...",
    message: "Projenizi Anlatın",
    messagePlaceholder: "Projeniz hakkında kısa bir bilgi verin...",
    submit: "Teklif İste",
    sending: "Gönderiliyor...",
    success: "Talebiniz alındı! 48 saat içinde size dönüş yapacağız.",
    errorRequired: "Bu alan zorunludur.",
    errorEmail: "Geçerli bir e-posta girin.",
    errorGeneral: "Gönderim başarısız. Lütfen tekrar deneyin.",
    serviceOptions: [
      { value: "web-tasarim", label: "Web Tasarım & Yazılım" },
      { value: "seo", label: "SEO & İçerik Stratejisi" },
      { value: "tanitim-filmi", label: "Tanıtım Filmi & Video" },
      { value: "urun-fotografciligi", label: "Ürün Fotoğrafçılığı" },
      { value: "sosyal-medya", label: "Sosyal Medya İçerikleri" },
      { value: "marka-kimligi", label: "Kurumsal Kimlik & Logo" },
      { value: "diger", label: "Diğer" },
    ],
    budgetOptions: [
      { value: "10k-altı", label: "10.000 ₺ altı" },
      { value: "10k-25k", label: "10.000 – 25.000 ₺" },
      { value: "25k-50k", label: "25.000 – 50.000 ₺" },
      { value: "50k-ustu", label: "50.000 ₺ üzeri" },
    ],
  },
  en: {
    title: "Get a Free Quote",
    subtitle: "We respond within 48 hours.",
    name: "Full Name *",
    namePlaceholder: "Your Full Name",
    email: "Email *",
    emailPlaceholder: "you@company.com",
    phone: "Phone",
    phonePlaceholder: "+90 5XX XXX XX XX",
    service: "Service Type",
    servicePlaceholder: "Select a service...",
    budget: "Budget Range",
    budgetPlaceholder: "Select a budget...",
    message: "Tell Us About Your Project",
    messagePlaceholder: "A brief description of your project...",
    submit: "Request Quote",
    sending: "Sending...",
    success: "Your request has been received! We'll get back to you within 48 hours.",
    errorRequired: "This field is required.",
    errorEmail: "Please enter a valid email address.",
    errorGeneral: "Submission failed. Please try again.",
    serviceOptions: [
      { value: "web-design", label: "Web Design & Development" },
      { value: "seo", label: "SEO & Content Strategy" },
      { value: "promotional-video", label: "Promotional Video" },
      { value: "product-photography", label: "Product Photography" },
      { value: "social-media", label: "Social Media Content" },
      { value: "brand-identity", label: "Brand Identity & Logo" },
      { value: "other", label: "Other" },
    ],
    budgetOptions: [
      { value: "under-500", label: "Under $500" },
      { value: "500-1500", label: "$500 – $1,500" },
      { value: "1500-3000", label: "$1,500 – $3,000" },
      { value: "over-3000", label: "Over $3,000" },
    ],
  },
} as const;

export function QuoteWidget({ locale, preselectedService = "", title, subtitle }: QuoteWidgetProps) {
  const t = i18n[locale];
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: preselectedService, budget: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const next: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) next.name = t.errorRequired;
    if (!form.email.trim()) next.email = t.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t.errorEmail;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const body: Record<string, string> = {
        name: form.name,
        email: form.email,
        message: form.message || `Hizmet: ${form.service}`,
      };
      if (form.service) body.serviceType = form.service;
      if (form.budget) body.budget = form.budget;
      if (form.phone) body.timeline = form.phone;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setErrors((prev) => ({ ...prev, message: t.errorGeneral }));
        return;
      }

      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[color:var(--app-border)] bg-[color:var(--app-bg)] px-4 py-3 text-sm text-[color:var(--app-text)] placeholder:text-[color:var(--app-muted)]/60 focus:border-[color:var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]/20";

  if (success) {
    return (
      <div className="rounded-2xl bg-[color:var(--app-card)] p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--secondary)]/15">
          <svg className="h-8 w-8 text-[color:var(--secondary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-[color:var(--primary)]">{t.success}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[color:var(--app-card)] p-8 shadow-sm md:p-10">
      <h3 className="mb-1 text-2xl font-bold text-[color:var(--primary)]">{title ?? t.title}</h3>
      <p className="mb-8 text-sm text-[color:var(--app-muted)]">{subtitle ?? t.subtitle}</p>

      <form className="space-y-5" noValidate onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]" htmlFor="qw-name">
              {t.name}
            </label>
            <input
              className={inputClass}
              id="qw-name"
              placeholder={t.namePlaceholder}
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
            {errors.name && <p className="mt-1 text-xs text-[color:var(--error)]">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]" htmlFor="qw-email">
              {t.email}
            </label>
            <input
              className={inputClass}
              id="qw-email"
              placeholder={t.emailPlaceholder}
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
            {errors.email && <p className="mt-1 text-xs text-[color:var(--error)]">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]" htmlFor="qw-service">
              {t.service}
            </label>
            <select
              className={inputClass}
              id="qw-service"
              value={form.service}
              onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
            >
              <option value="">{t.servicePlaceholder}</option>
              {t.serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]" htmlFor="qw-budget">
              {t.budget}
            </label>
            <select
              className={inputClass}
              id="qw-budget"
              value={form.budget}
              onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
            >
              <option value="">{t.budgetPlaceholder}</option>
              {t.budgetOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[color:var(--app-muted)]" htmlFor="qw-message">
            {t.message}
          </label>
          <textarea
            className={`${inputClass} h-28 resize-none`}
            id="qw-message"
            placeholder={t.messagePlaceholder}
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          />
        </div>

        <button
          className="w-full min-h-[52px] rounded-xl bg-[color:var(--secondary)] px-8 py-4 text-sm font-bold text-[color:var(--on-secondary)] nmd-transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? t.sending : t.submit}
        </button>
      </form>
    </div>
  );
}
