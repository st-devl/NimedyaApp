import type { PortfolioContent } from "@/types/content";

export const trPortfolioContent: PortfolioContent = {
  title: "Seçilmiş Çalışmalarımız",
  subtitle:
    "Farklı sektörlerden, farklı ölçeklerden — ama hepsi tek bir kuralla üretildi: görselin pazarlama hedefiyle aynı dili konuşması.",
  categories: ["Fotoğraf", "Video", "Web", "Marka Kimliği"],
  projects: [
    {
      title: "Lunessa Home — Ürün Vitrini",
      description: "E-ticaret kataloğu için sezonluk ürün serisi: stüdyo + lifestyle bütünlüğünde 220 görsel.",
      image: "portfolio1",
      category: "Fotoğraf",
    },
    {
      title: "Atlas Clinic — Tedavi Tanıtım Filmi",
      description: "Hasta yolculuğunu üç dakikada anlatan, kurumsal güveni öne çıkaran kısa metraj.",
      image: "portfolio2",
      category: "Video",
    },
    {
      title: "Mira Beauty — Kampanya Mikrositesi",
      description: "Sezon kampanyası için Next.js tabanlı, performans reklamlarına optimize edilmiş landing.",
      image: "portfolio3",
      category: "Web",
    },
  ],
  caseStudiesTitle: "Vaka Çalışmaları",
  caseStudiesSubtitle:
    "Kreatifin pazarlama hedefiyle aynı dili konuştuğunda neler oluyor? Üç farklı sektörden, ölçülebilir sonuçlarla biten üç çalışma.",
  caseStudies: [
    {
      slug: "lunessa-home",
      client: "Lunessa Home",
      sector: "Lifestyle · E-Ticaret",
      duration: "8 hafta",
      year: "2025",
      services: ["Web & E-Ticaret", "Ürün Fotoğrafçılığı", "Marka Kimliği"],
      scope: ["E-ticaret tasarımı", "Ürün fotoğrafçılığı", "Mobil dönüşüm optimizasyonu"],
      challenge:
        "Markanın sezonluk koleksiyonları büyürken, mevcut e-ticaret deneyimi mobilde yavaş yüklüyor ve sepet terk oranı %78'i aşıyordu. Ürün görselleri farklı sezonlarda farklı stüdyolarda çekildiği için marka tutarlılığı kırılmıştı.",
      approach:
        "Önce mobil-öncelikli yeni vitrin tasarımı geliştirdik; ardından 220 ürün için tek bir ışık ve kompozisyon rehberinde stüdyo + lifestyle hibrit çekim yaptık. Ödeme akışı 5 adımdan 3'e düşürüldü, görseller WebP + responsive sizes ile teslim edildi.",
      result:
        "Yeni sürüm canlıya alındıktan sonraki ilk 90 günde mobil dönüşüm oranı belirgin şekilde yükseldi, ortalama sayfa yüklenme süresi yarıya indi.",
      metrics: [
        { value: "+%38", label: "Mobil dönüşüm artışı" },
        { value: "-%51", label: "Sepet terk oranı" },
        { value: "1.9s → 0.9s", label: "LCP iyileştirmesi" },
      ],
      image: "featuredEcommerce",
      gallery: ["portfolio1", "featuredEcommerce", "serviceFeatured1"],
      testimonial: {
        quote:
          "Nimedya sadece görsel teslim etmedi — bir sistem kurdu. Çekimden çıkan her varlık belirli bir kanala ve amaca hizmet ediyordu. Kreatif yorgunluğumuz neredeyse ortadan kalktı.",
        author: "Ayşe Kara",
        role: "Marka Müdürü, Lunessa Home",
      },
    },
    {
      slug: "atlas-clinic",
      client: "Atlas Clinic",
      sector: "Sağlık · Estetik Diş Hekimliği",
      duration: "12 hafta + sürdürülebilir SEO",
      year: "2024–2026",
      services: ["SEO & İçerik", "Web Tasarım", "Tanıtım Filmi"],
      scope: ["Hizmet bazlı landing mimarisi", "İçerik stratejisi", "Teknik SEO", "Marka filmi"],
      challenge:
        "Klinik, premium tedavi hizmetleri için Google'da görünür olmasına rağmen, gelen trafiğin büyük kısmı bilgi arayan ziyaretçilerdi — randevu dönüşümü çok düşüktü. Mevcut tek sayfalık yapı, farklı tedavi türlerini ayrı pazarlama kanalı olarak konumlandıramıyordu.",
      approach:
        "8 farklı tedavi için ayrı landing page mimarisi tasarladık. Her sayfa, tedavi öncesi-sonrası görselleri, sıkça sorulan sorular ve tedavi süreci anlatımıyla zenginleştirildi. Schema.org markup, dahili linkleme ve sayfa hızı çalışmaları teknik SEO katmanını kurdu.",
      result:
        "İlk altı ayda organik kanaldan gelen randevu talepleri ikiye katlandı; en yüksek dönüşümü implant ve gülüş tasarımı sayfaları getirdi.",
      metrics: [
        { value: "+%112", label: "Organik trafik artışı" },
        { value: "x2.3", label: "Aylık randevu talebi" },
        { value: "%28", label: "Form dönüşüm oranı" },
      ],
      image: "featuredSeoAnalytics",
      gallery: ["portfolio2", "featuredSeoAnalytics", "serviceFeatured2"],
      testimonial: {
        quote:
          "Dağınık içerikten tek proje döngüsünde tutarlı bir marka varlığına geçtik. Ekip klinik bağlamımızı hemen kavradı ve süreci hiç karmaşıklaştırmadı.",
        author: "Dr. Murat Yıldız",
        role: "Kurucu, Atlas Clinic",
      },
    },
    {
      slug: "mira-beauty",
      client: "Mira Beauty",
      sector: "Kozmetik · D2C",
      duration: "6 hafta kampanya kurgusu + 90 günlük üretim",
      year: "2025",
      services: ["Sosyal Medya Üretimi", "Tanıtım Filmi", "Marka Kimliği"],
      scope: ["Sezon kampanyası", "Reels & story üretimi", "Influencer iş birliği görseli", "Performans reklam kreatifleri"],
      challenge:
        "Marka, üç farklı kanalda (organik sosyal, influencer, performans reklam) dağınık bir görsel kimlikle ilerliyor; bu da reklam yorgunluğunu hızlandırıp ROAS'ı düşürüyordu. Kampanya başına ayrı çekim yapılması maliyeti şişiriyordu.",
      approach:
        "Tek bir 3 günlük çekimde sezonun tüm kanal ihtiyaçlarını üreten modüler bir kampanya kurgusu tasarladık. 18 reels, 24 statik görsel, 12 story formatı ve 8 influencer brief'i tek bir görsel sistemden türetildi.",
      result:
        "Kampanya süresince ROAS hedefin üstünde kapandı; influencer iş birlikleri marka kitiyle aynı görsel dilde ilerlediği için müşteri yorumlarında 'tutarlılık' vurgusu belirgin şekilde arttı.",
      metrics: [
        { value: "4.7x", label: "Kampanya ROAS" },
        { value: "+%62", label: "Etkileşim oranı" },
        { value: "-%34", label: "Görsel üretim maliyeti" },
      ],
      image: "featuredSocialMedia",
      gallery: ["portfolio3", "featuredSocialMedia", "serviceFeatured1"],
      testimonial: {
        quote:
          "ROAS rakamları zaten konuşuyor. Beni en çok etkileyen şey; müşteriyi brifing bitmeden anlamalarıydı.",
        author: "Elif Şahin",
        role: "Büyüme Direktörü, Mira Beauty",
      },
    },
  ],
};
