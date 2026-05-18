"use client";

import { useState, useEffect } from "react";

type Props = { phone: string; locale?: string };

const labels = {
  tr: {
    aria: "WhatsApp ile ücretsiz teklif alın",
    label: "Ücretsiz Teklif Al",
    message: "Merhaba, Nimedya hizmetleri hakkında bilgi almak istiyorum.",
    name: "Nimedya Studio",
    hours: "Pzt – Cum, 09:00 – 18:00",
    responseTime: "Genellikle birkaç dakikada yanıt verir",
    online: "Çevrimiçi",
    cta: "Mesaj Gönder",
    close: "Kapat",
  },
  en: {
    aria: "Get a free quote via WhatsApp",
    label: "Free Quote",
    message: "Hello, I would like to get information about Nimedya services.",
    name: "Nimedya Studio",
    hours: "Mon – Fri, 09:00 – 18:00",
    responseTime: "Usually responds within minutes",
    online: "Online",
    cta: "Send a Message",
    close: "Close",
  },
};

function isWithinBusinessHours(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
}

export function WhatsAppButton({ phone, locale = "tr" }: Props) {
  const t = labels[locale as keyof typeof labels] ?? labels.tr;
  const cleanPhone = phone.replace(/\D/g, "");
  const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(t.message)}`;
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const update = () => setOnline(isWithinBusinessHours());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      {open && (
        <div className="w-72 overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "linear-gradient(135deg,#e8152a,#b80e1c)" }}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
              <svg fill="white" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">{t.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`h-2 w-2 rounded-full ${online ? "bg-green-300" : "bg-white/40"}`} />
                <p className="text-xs text-white/80">{online ? t.online : t.hours}</p>
              </div>
            </div>
            <button
              aria-label={t.close}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
              onClick={() => setOpen(false)}
              type="button"
            >
              <svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 12 12" width="12">
                <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4">
            <div className="mb-4 rounded-xl bg-[#f0f0f0] px-3 py-2.5">
              <p className="text-xs text-gray-500">{t.hours}</p>
              <p className="mt-0.5 text-[13px] text-gray-700">{t.responseTime}</p>
            </div>
            <a
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              href={href}
              rel="noopener noreferrer"
              style={{ background: "linear-gradient(135deg,#e8152a,#b80e1c)" }}
              target="_blank"
            >
              <svg fill="white" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {t.cta}
            </a>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        aria-label={t.aria}
        className="group relative flex items-center overflow-hidden rounded-full shadow-[0_8px_32px_rgba(217,17,30,0.38)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(217,17,30,0.52)]"
        onClick={() => setOpen((v) => !v)}
        style={{ background: "linear-gradient(135deg,#e8152a,#b80e1c)" }}
        type="button"
      >
        {/* Pulse ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: "linear-gradient(135deg,#e8152a,#b80e1c)" }}
        />

        {/* Online indicator dot */}
        {online && (
          <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
        )}

        {/* Icon — always visible */}
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </span>

        {/* Label — slides in on hover */}
        <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-bold tracking-wide text-white transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-5">
          {t.label}
        </span>
      </button>
    </div>
  );
}
