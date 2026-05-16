import type { Locale } from "@/lib/i18n/config";
import type { RouteKey } from "@/lib/i18n/routes";

export type SeoDefaults = {
  title: string;
  description: string;
};

export const seoDefaults: Record<RouteKey, Record<Locale, SeoDefaults>> = {
  home: {
    tr: {
      title: "Nimedya | Kreatif Dijital Ajans",
      description: "Nimedya; ürün fotoğrafçılığı, tanıtım filmi ve marka kimliği alanında markalar için güçlü görsel hikayeler üretir.",
    },
    en: {
      title: "Nimedya | Creative Digital Agency",
      description: "Nimedya creates powerful visual stories for brands through product photography, promotional video and brand identity.",
    },
  },
  services: {
    tr: {
      title: "Nimedya | Hizmetlerimiz",
      description: "Ürün fotoğrafçılığı, tanıtım filmi, kurumsal fotoğraf ve sosyal medya içerikleri — markalar için uçtan uca kreatif çözümler.",
    },
    en: {
      title: "Nimedya | Our Services",
      description: "Product photography, promotional video, corporate photography and social media content — end-to-end creative solutions for brands.",
    },
  },
  productPhotography: {
    tr: {
      title: "Nimedya | Ürün Fotoğrafçılığı",
      description: "Markanızın ürünlerini en iyi şekilde yansıtan profesyonel ürün fotoğrafçılığı hizmeti. E-ticaret, katalog ve kampanya görselleri.",
    },
    en: {
      title: "Nimedya | Product Photography",
      description: "Professional product photography that showcases your brand's products at their best. E-commerce, catalog and campaign visuals.",
    },
  },
  portfolio: {
    tr: {
      title: "Nimedya | İşlerimiz",
      description: "Nimedya'nın gerçekleştirdiği seçilmiş projeler — fotoğraf, film ve marka kimliği alanında referans çalışmalar.",
    },
    en: {
      title: "Nimedya | Portfolio",
      description: "Selected projects by Nimedya — reference work in photography, film and brand identity.",
    },
  },
  about: {
    tr: {
      title: "Nimedya | Hakkımızda",
      description: "Nimedya olarak markalar için stratejik düşünce ve yaratıcı üretimi bir araya getiriyoruz. Ekibimizi ve vizyonumuzu keşfedin.",
    },
    en: {
      title: "Nimedya | About Us",
      description: "At Nimedya, we combine strategic thinking and creative production for brands. Discover our team and vision.",
    },
  },
  contact: {
    tr: {
      title: "Nimedya | İletişim",
      description: "Projenizi konuşalım. Nimedya ile iletişime geçin ve markanız için en doğru kreatif çözümü birlikte belirleyelim.",
    },
    en: {
      title: "Nimedya | Contact",
      description: "Let's talk about your project. Get in touch with Nimedya and together we'll find the right creative solution for your brand.",
    },
  },
  privacy: {
    tr: {
      title: "Nimedya | Gizlilik Politikası",
      description: "Nimedya gizlilik politikası — kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu öğrenin.",
    },
    en: {
      title: "Nimedya | Privacy Policy",
      description: "Nimedya privacy policy — learn how we collect, use and protect your personal data.",
    },
  },
  terms: {
    tr: {
      title: "Nimedya | Kullanım Koşulları",
      description: "Nimedya web sitesi ve hizmetlerine ilişkin kullanım koşulları.",
    },
    en: {
      title: "Nimedya | Terms of Use",
      description: "Terms of use for the Nimedya website and services.",
    },
  },
  howWeWork: {
    tr: {
      title: "Nimedya | Nasıl Çalışıyoruz?",
      description: "Keşiften teslimat aşamasına kadar Nimedya'nın şeffaf ve yapılandırılmış iş akışını keşfedin.",
    },
    en: {
      title: "Nimedya | How We Work",
      description: "Discover Nimedya's transparent, structured workflow — from discovery to delivery.",
    },
  },
  admin: {
    tr: { title: "Nimedya Admin | Dashboard", description: "Nimedya admin dashboard." },
    en: { title: "Nimedya Admin | Dashboard", description: "Nimedya admin dashboard." },
  },
  adminSettings: {
    tr: { title: "Nimedya Admin | Ayarlar", description: "Nimedya site ayarları." },
    en: { title: "Nimedya Admin | Settings", description: "Nimedya site settings." },
  },
  adminMedia: {
    tr: { title: "Nimedya Admin | Medya", description: "Nimedya medya kütüphanesi." },
    en: { title: "Nimedya Admin | Media", description: "Nimedya media library." },
  },
  adminSeo: {
    tr: { title: "Nimedya Admin | SEO", description: "Nimedya SEO yönetimi." },
    en: { title: "Nimedya Admin | SEO", description: "Nimedya SEO management." },
  },
  adminContent: {
    tr: { title: "Nimedya Admin | İçerik", description: "Nimedya içerik yönetimi." },
    en: { title: "Nimedya Admin | Content", description: "Nimedya content management." },
  },
  adminMessages: {
    tr: { title: "Nimedya Admin | Mesajlar", description: "Nimedya iletişim talepleri." },
    en: { title: "Nimedya Admin | Messages", description: "Nimedya contact requests." },
  },
  adminSlider: {
    tr: { title: "Nimedya Admin | Slider", description: "Nimedya slider yönetimi." },
    en: { title: "Nimedya Admin | Slider", description: "Nimedya slider management." },
  },
  adminUsers: {
    tr: { title: "Nimedya Admin | Kullanıcılar", description: "Nimedya kullanıcı yönetimi." },
    en: { title: "Nimedya Admin | Users", description: "Nimedya user management." },
  },
  adminAiSettings: {
    tr: { title: "Nimedya Admin | AI Ayarları", description: "Nimedya AI çeviri ayarları." },
    en: { title: "Nimedya Admin | AI Settings", description: "Nimedya AI translation settings." },
  },
  adminServices: {
    tr: { title: "Nimedya Admin | Kreatif Çözümler", description: "Nimedya kreatif çözümler yönetimi." },
    en: { title: "Nimedya Admin | Creative Solutions", description: "Nimedya creative solutions management." },
  },
  adminServiceDetails: {
    tr: { title: "Nimedya Admin | Hizmet Detayları", description: "Nimedya hizmet detay sayfaları yönetimi." },
    en: { title: "Nimedya Admin | Service Details", description: "Nimedya service detail pages management." },
  },
  adminCaseStudies: {
    tr: { title: "Nimedya Admin | Vaka Çalışmaları", description: "Nimedya vaka çalışmaları yönetimi." },
    en: { title: "Nimedya Admin | Case Studies", description: "Nimedya case studies management." },
  },
  adminLogin: {
    tr: { title: "Nimedya Admin | Giriş", description: "Nimedya admin giriş sayfası." },
    en: { title: "Nimedya Admin | Login", description: "Nimedya admin login page." },
  },
};
