export type PricingPackage = {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export type PricingCategory = {
  title: string;
  icon: string;
  packages: PricingPackage[];
};

export type PricingContent = {
  title: string;
  subtitle: string;
  categories: PricingCategory[];
  noteSectionTitle: string;
  notes: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
};

export const pricingContent: Record<"tr" | "en", PricingContent> = {
  tr: {
    title: "Hizmet Paketleri",
    subtitle: "Her bütçe ve ölçeğe uygun paketler. Kesin fiyat için ücretsiz keşif görüşmesi talep edin.",
    categories: [
      {
        title: "Ürün Fotoğrafçılığı",
        icon: "📷",
        packages: [
          {
            name: "Başlangıç",
            price: "₺3.500",
            priceNote: "10 ürüne kadar",
            description: "E-ticaret için temel ürün görselleri",
            features: [
              "10 adet ürün çekimi",
              "Beyaz arka plan",
              "3 farklı açı / ürün",
              "Düzenlenmiş JPEG teslim",
              "3-5 iş günü teslim",
            ],
            cta: "Teklif Al",
          },
          {
            name: "Profesyonel",
            price: "₺7.500",
            priceNote: "25 ürüne kadar",
            description: "Kapsamlı e-ticaret ve katalog görselleri",
            features: [
              "25 adet ürün çekimi",
              "Beyaz + renkli arka plan",
              "5 farklı açı / ürün",
              "Lifestyle kompozisyon",
              "Düzenlenmiş JPEG + PNG teslim",
              "2-3 iş günü teslim",
            ],
            cta: "Teklif Al",
            highlighted: true,
          },
          {
            name: "Kurumsal",
            price: "Teklif",
            priceNote: "25+ ürün",
            description: "Büyük katalog projeleri için özel fiyatlandırma",
            features: [
              "Sınırsız ürün",
              "Özel arka plan ve dekor",
              "Video klipler dahil",
              "Platform optimizasyonu",
              "Öncelikli teslim",
              "Özel iş akışı",
            ],
            cta: "Görüşme Planla",
          },
        ],
      },
      {
        title: "Web Tasarım & Yazılım",
        icon: "💻",
        packages: [
          {
            name: "Vitrin",
            price: "₺15.000",
            priceNote: "5 sayfaya kadar",
            description: "Kurumsal tanıtım web sitesi",
            features: [
              "5 sayfa tasarım & kodlama",
              "Mobil uyumlu",
              "Temel SEO kurulumu",
              "İletişim formu",
              "1 yıl ücretsiz destek",
            ],
            cta: "Teklif Al",
          },
          {
            name: "İş Odaklı",
            price: "₺28.000",
            priceNote: "10 sayfaya kadar",
            description: "Dönüşüm odaklı profesyonel site",
            features: [
              "10 sayfa tasarım & kodlama",
              "Hız optimizasyonu",
              "Gelişmiş SEO kurulumu",
              "CMS paneli",
              "Google Analytics entegrasyonu",
              "2 yıl ücretsiz destek",
            ],
            cta: "Teklif Al",
            highlighted: true,
          },
          {
            name: "Özel Yazılım",
            price: "Teklif",
            priceNote: "Kapsamlı projeler",
            description: "E-ticaret, SaaS, özel uygulama",
            features: [
              "Özelleştirilmiş yazılım geliştirme",
              "API entegrasyonları",
              "E-ticaret altyapısı",
              "Performans mimarisi",
              "Sürekli bakım & destek",
              "Teknik danışmanlık",
            ],
            cta: "Keşif Görüşmesi",
          },
        ],
      },
    ],
    noteSectionTitle: "Bilmeniz Gerekenler",
    notes: [
      "Tüm fiyatlar KDV hariçtir.",
      "Projeler başlangıçta %40 ön ödeme ile başlar; kalan tutar teslimde alınır.",
      "Fiyatlar proje kapsamına göre değişiklik gösterebilir; kesin fiyat keşif görüşmesi sonrası belirlenir.",
      "Acil projeler için ekspres teslim seçeneği mevcuttur (ek ücret uygulanır).",
    ],
    ctaTitle: "Bütçenize Uygun Çözüm Bulamadınız mı?",
    ctaSubtitle: "Her proje farklıdır. İhtiyaçlarınızı dinleyip size özel bir teklif hazırlayalım.",
    ctaButton: "Ücretsiz Keşif Görüşmesi",
  },
  en: {
    title: "Service Packages",
    subtitle: "Packages for every budget and scale. Request a free discovery call for exact pricing.",
    categories: [
      {
        title: "Product Photography",
        icon: "📷",
        packages: [
          {
            name: "Starter",
            price: "from $350",
            priceNote: "up to 10 products",
            description: "Essential product visuals for e-commerce",
            features: [
              "10 product shots",
              "White background",
              "3 angles per product",
              "Edited JPEG delivery",
              "3-5 business days",
            ],
            cta: "Get a Quote",
          },
          {
            name: "Professional",
            price: "from $750",
            priceNote: "up to 25 products",
            description: "Comprehensive e-commerce and catalogue visuals",
            features: [
              "25 product shots",
              "White + coloured backgrounds",
              "5 angles per product",
              "Lifestyle compositions",
              "Edited JPEG + PNG delivery",
              "2-3 business days",
            ],
            cta: "Get a Quote",
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            priceNote: "25+ products",
            description: "Custom pricing for large catalogue projects",
            features: [
              "Unlimited products",
              "Custom backgrounds & props",
              "Video clips included",
              "Platform optimisation",
              "Priority delivery",
              "Custom workflow",
            ],
            cta: "Schedule a Call",
          },
        ],
      },
      {
        title: "Web Design & Software",
        icon: "💻",
        packages: [
          {
            name: "Showcase",
            price: "from $1,500",
            priceNote: "up to 5 pages",
            description: "Corporate presentation website",
            features: [
              "5-page design & development",
              "Mobile-first",
              "Basic SEO setup",
              "Contact form",
              "1 year free support",
            ],
            cta: "Get a Quote",
          },
          {
            name: "Business",
            price: "from $2,800",
            priceNote: "up to 10 pages",
            description: "Conversion-focused professional site",
            features: [
              "10-page design & development",
              "Performance optimisation",
              "Advanced SEO setup",
              "CMS panel",
              "Google Analytics integration",
              "2 years free support",
            ],
            cta: "Get a Quote",
            highlighted: true,
          },
          {
            name: "Custom Software",
            price: "Custom",
            priceNote: "Complex projects",
            description: "E-commerce, SaaS, custom applications",
            features: [
              "Custom software development",
              "API integrations",
              "E-commerce infrastructure",
              "Performance architecture",
              "Ongoing maintenance & support",
              "Technical consultancy",
            ],
            cta: "Discovery Call",
          },
        ],
      },
    ],
    noteSectionTitle: "Things to Know",
    notes: [
      "All prices are exclusive of VAT.",
      "Projects start with a 40% upfront deposit; the remainder is due on delivery.",
      "Prices may vary based on project scope; exact pricing is confirmed after the discovery call.",
      "Express delivery is available for urgent projects (additional fee applies).",
    ],
    ctaTitle: "Didn't Find the Right Package?",
    ctaSubtitle: "Every project is different. Tell us your needs and we'll prepare a custom quote.",
    ctaButton: "Free Discovery Call",
  },
};
