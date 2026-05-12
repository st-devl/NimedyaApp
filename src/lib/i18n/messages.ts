import type { Locale } from "./config";

export type Messages = {
  siteName: string;
  menu: { home: string; about: string; services: string; portfolio: string; contact: string };
  hero: { title: string; description: string; cta: string };
  pages: {
    about: { title: string; description: string };
    services: { title: string; description: string };
    portfolio: { title: string; description: string };
    contact: { title: string; description: string };
  };
  footer: string;
};

export const messages: Record<Locale, Messages> = {
  tr: {
    siteName: "Nimedya",
    menu: { home: "Anasayfa", about: "Hakkımızda", services: "Hizmetler", portfolio: "Portfolyo", contact: "İletişim" },
    hero: {
      title: "Dijitalde büyümenizi hızlandıran yaratıcı ajans",
      description: "Nimedya; strateji, tasarım ve geliştirmeyi aynı çatı altında sunarak markalar için sürdürülebilir büyüme sağlar.",
      cta: "Projeni başlat",
    },
    pages: {
      about: { title: "Hakkımızda", description: "Nimedya ekibinin yaklaşımı ve çalışma prensipleri." },
      services: { title: "Hizmetler", description: "Markanız için uçtan uca dijital hizmetler." },
      portfolio: { title: "Portfolyo", description: "Tamamlanan projeler ve başarı hikayeleri." },
      contact: { title: "İletişim", description: "Yeni projeniz için bizimle iletişime geçin." },
    },
    footer: "Tüm hakları saklıdır.",
  },
  en: {
    siteName: "Nimedya",
    menu: { home: "Home", about: "About", services: "Services", portfolio: "Portfolio", contact: "Contact" },
    hero: {
      title: "A creative agency accelerating your digital growth",
      description: "Nimedya combines strategy, design, and engineering to help brands scale with a sustainable digital foundation.",
      cta: "Start your project",
    },
    pages: {
      about: { title: "About", description: "Nimedya team approach and working principles." },
      services: { title: "Services", description: "End-to-end digital services for your brand." },
      portfolio: { title: "Portfolio", description: "Delivered projects and success stories." },
      contact: { title: "Contact", description: "Get in touch to discuss your next project." },
    },
    footer: "All rights reserved.",
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
