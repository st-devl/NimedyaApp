import type { Locale } from "@/lib/i18n/config";
import type { RouteKey } from "@/lib/i18n/routes";

export type SeoDefaults = {
  title: string;
  description: string;
};

export const seoDefaults: Record<RouteKey, Record<Locale, SeoDefaults>> = {
  home: {
    tr: {
      title: "Nimedya | Trabzon Kreatif Dijital Ajans",
      description: "Nimedya, Trabzon merkezli kreatif dijital ajans. Ürün fotoğrafçılığı, tanıtım filmi, web tasarım ve marka kimliği alanında markalar için güçlü görsel hikayeler üretir.",
    },
    en: {
      title: "Nimedya | Creative Digital Agency in Trabzon",
      description: "Nimedya is a creative digital agency based in Trabzon. We create powerful visual stories through product photography, promotional video, web design and brand identity.",
    },
  },
  services: {
    tr: {
      title: "Nimedya | Trabzon Fotoğraf, Video & Web Tasarım Hizmetleri",
      description: "Trabzon'un önde gelen kreatif ajansı Nimedya: ürün fotoğrafçılığı, tanıtım filmi, web tasarım ve yazılım hizmetleri. Markanız için uçtan uca yaratıcı çözümler.",
    },
    en: {
      title: "Nimedya | Photography, Video & Web Design Services in Trabzon",
      description: "Nimedya, Trabzon's leading creative agency: product photography, promotional video, web design and software services. End-to-end creative solutions for your brand.",
    },
  },
  productPhotography: {
    tr: {
      title: "Trabzon Ürün Fotoğrafçılığı | Nimedya",
      description: "Trabzon'da profesyonel ürün fotoğrafçılığı hizmeti. E-ticaret, katalog ve kampanya görselleri için markanızı en iyi şekilde yansıtan çekimler. Nimedya ile fark yaratın.",
    },
    en: {
      title: "Product Photography in Trabzon | Nimedya",
      description: "Professional product photography service in Trabzon. E-commerce, catalog and campaign visuals that best showcase your brand. Make a difference with Nimedya.",
    },
  },
  portfolio: {
    tr: {
      title: "Nimedya | İşlerimiz — Trabzon Kreatif Ajans Portföyü",
      description: "Trabzon ve Türkiye genelinde gerçekleştirdiğimiz seçilmiş projeler — fotoğraf, tanıtım filmi ve marka kimliği alanında referans çalışmalar.",
    },
    en: {
      title: "Nimedya | Portfolio — Trabzon Creative Agency Work",
      description: "Selected projects across Trabzon and Turkey — reference work in photography, promotional film and brand identity.",
    },
  },
  about: {
    tr: {
      title: "Nimedya Hakkında | Trabzon Merkezli Kreatif Ajans",
      description: "Trabzon merkezli Nimedya, markalar için stratejik düşünce ve yaratıcı üretimi bir araya getirir. Vizyonumuzu ve çalışma anlayışımızı keşfedin.",
    },
    en: {
      title: "About Nimedya | Trabzon-Based Creative Agency",
      description: "Trabzon-based Nimedya combines strategic thinking and creative production for brands. Discover our vision and approach.",
    },
  },
  contact: {
    tr: {
      title: "Nimedya İletişim | Trabzon'da Proje Başlatalım",
      description: "Trabzon'da proje hayata geçirmek ister misiniz? Nimedya ile iletişime geçin — fotoğraf, video, web tasarım ve yazılım için ücretsiz keşif görüşmesi.",
    },
    en: {
      title: "Contact Nimedya | Start a Project in Trabzon",
      description: "Want to launch a project in Trabzon? Get in touch with Nimedya — free discovery call for photography, video, web design and software.",
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
      title: "Nimedya | Nasıl Çalışıyoruz? — Trabzon Kreatif Ajans",
      description: "Keşiften teslimat aşamasına kadar Nimedya'nın şeffaf ve yapılandırılmış iş akışını keşfedin. Trabzon'da kaliteli kreatif üretim süreci.",
    },
    en: {
      title: "Nimedya | How We Work — Trabzon Creative Agency",
      description: "Discover Nimedya's transparent, structured workflow from discovery to delivery. Quality creative production process in Trabzon.",
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
  adminBrands: {
    tr: { title: "Nimedya Admin | Markalar", description: "Nimedya marka listesi yönetimi." },
    en: { title: "Nimedya Admin | Brands", description: "Nimedya brands management." },
  },
};
