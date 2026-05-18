import type { ImageManifestKey } from "@/config/image-manifest";

export type BlogPost = {
  slug: string;
  locale: "tr" | "en";
  title: string;
  description: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  image: ImageManifestKey;
  author: string;
  tags: string[];
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "urun-fotografciligi-rehberi",
    locale: "tr",
    title: "E-Ticaret için Profesyonel Ürün Fotoğrafçılığı Rehberi",
    description:
      "Ürün fotoğrafçılığında ışık, kompozisyon ve post-prodüksiyon teknikleri — satışlarınızı artıracak görsel üretim stratejileri.",
    excerpt:
      "Doğru ışık kurulumu, renk doğruluğu ve beyaz arka plan tekniklerinden Trendyol ile Hepsiburada optimize görsellere kadar e-ticaret ürün çekiminin tüm incelikleri.",
    category: "Fotoğrafçılık",
    readTime: "7 dk okuma",
    publishedAt: "2026-04-15",
    image: "blogMicroInteraction",
    author: "Nimedya",
    tags: ["ürün fotoğrafçılığı", "e-ticaret", "Trabzon", "stüdyo çekim"],
    body: [
      "Ürün fotoğrafçılığı, e-ticaret satışlarını doğrudan etkileyen en kritik pazarlama unsurlarından biridir. Araştırmalar, yüksek kaliteli görsellerin dönüşüm oranını %30'a kadar artırabileceğini göstermektedir.",
      "**Doğru Işık Kurulumu**\n\nProfesyonel ürün fotoğrafçılığının temeli doğru ışıklandırmadır. Ürünün dokusunu, rengini ve formunu en iyi yansıtan ışık kurulumu için üç noktalı ışık düzeni (anahtar ışık, dolgu ışığı, kontur ışığı) kullanılır.",
      "**E-Ticaret Platform Standartları**\n\nTrendyol, Hepsiburada ve Amazon gibi platformların belirli görsel standartları vardır. Beyaz arka plan, minimum 1000×1000 piksel çözünürlük ve ürünün frame içinde %85 oranında yer kaplaması bu platformların temel gereklilikleridir.",
      "**Post-Prodüksiyon Süreci**\n\nÇekim sonrası renk düzeltme, arka plan kaldırma ve görüntü optimizasyonu aşamaları ürünün nihai kalitesini belirler. Doğru renk profili ve çıktı formatı seçimi bu aşamanın kritik adımlarıdır.",
      "Nimedya olarak Trabzon'daki stüdyomuzda tüm bu süreçleri titizlikle yönetiyor, markalarınız için e-ticaret ve katalog görseli üretiyoruz.",
    ],
  },
  {
    slug: "marka-kimligi-tasarimi",
    locale: "tr",
    title: "Güçlü Marka Kimliği Tasarımının 5 Temel İlkesi",
    description:
      "Logo tasarımından renk paletine, tipografiden kurumsal kimlik rehberine — uzun ömürlü ve tutarlı bir marka kimliği oluşturmanın yolları.",
    excerpt:
      "Markalarını sıfırdan kurmak veya yenilemek isteyen işletmeler için marka stratejisi ve görsel kimlik tasarımına dair temel bilgiler.",
    category: "Marka Kimliği",
    readTime: "5 dk okuma",
    publishedAt: "2026-03-20",
    image: "blogBrandStory",
    author: "Nimedya",
    tags: ["marka kimliği", "logo tasarım", "kurumsal kimlik", "Trabzon"],
    body: [
      "Güçlü bir marka kimliği, sadece güzel bir logo değildir. Markanızın değerlerini, hedef kitlesini ve rekabetçi konumunu görsel bir dilde ifade eden bütünleşik bir sistemdir.",
      "**1. Strateji Önce Gelir**\n\nHer tasarım kararının arkasında stratejik bir gerekçe olmalıdır. Hedef kitleniz, rakipleriniz ve farklılaştırıcı değer öneriniz belirlenmeden tasarıma geçmek uzun vadede maliyetli olur.",
      "**2. Esneklik ve Tutarlılık**\n\nKimliğiniz dijital, baskı ve fiziksel ortamlarda tutarlı kalmalı; aynı zamanda farklı boyut ve kullanım bağlamlarında esnek olmalıdır.",
      "**3. Renk Psikolojisi**\n\nRenkler güçlü duygusal çağrışımlar taşır. Primer renk seçiminiz sektörünüzü, hedef kitlenizi ve marka kişiliğinizi yansıtmalıdır.",
      "**4. Tipografi Sistemi**\n\nİki veya üç tamamlayıcı yazı tipi ailesiyle hiyerarşik ve okunabilir bir tipografi sistemi kurmak, içerik tutarlılığını sağlar.",
      "**5. Yaşayan Marka Rehberi**\n\nTüm bu kararları belgeleyen bir marka rehberi, ekibinizin ve ajanslarınızın tutarlı uygulama yapmasını sağlar.",
    ],
  },
  {
    slug: "web-site-hizi-seo",
    locale: "tr",
    title: "Web Sitesi Hızı ve Core Web Vitals: SEO'ya Etkisi",
    description:
      "Google'ın Core Web Vitals metriklerini anlamak ve web sitenizin LCP, FID, CLS skorlarını iyileştirmek için pratik rehber.",
    excerpt:
      "Sayfa hızı artık bir Google sıralama faktörüdür. LCP, INP ve CLS metriklerini nasıl ölçeceğinizi ve iyileştireceğinizi öğrenin.",
    category: "Web & SEO",
    readTime: "6 dk okuma",
    publishedAt: "2026-02-10",
    image: "blogPerformance",
    author: "Nimedya",
    tags: ["web tasarım", "SEO", "Core Web Vitals", "sayfa hızı"],
    body: [
      "Google'ın 2021'de duyurduğu Core Web Vitals güncellemesiyle sayfa deneyimi resmi bir sıralama faktörü haline geldi. LCP, INP ve CLS metrikleri artık arama sıralamalarını doğrudan etkiliyor.",
      "**LCP (Largest Contentful Paint)**\n\nSayfanın ana içeriğinin yükleme süresini ölçer. 2.5 saniyenin altında bir LCP skoru 'İyi' kabul edilir. Hero görsellerin öncelikli yüklenmesi (priority prop) ve CDN kullanımı LCP'yi iyileştirir.",
      "**INP (Interaction to Next Paint)**\n\nKullanıcı etkileşimlerine yanıt süresini ölçer. JavaScript yürütme süresini azaltmak ve üçüncü taraf script'leri optimize etmek INP'yi iyileştirir.",
      "**CLS (Cumulative Layout Shift)**\n\nSayfa yüklenirken olan görsel kaymaları ölçer. Görsellere sabit boyut belirlemek ve reklam alanlarını rezerve etmek CLS'yi düşürür.",
      "Nimedya olarak geliştirdiğimiz web sitelerinde Next.js 16, statik üretim ve görsel optimizasyon teknikleriyle tüm Core Web Vitals metriklerini yeşil bölgede tutuyoruz.",
    ],
  },
  {
    slug: "product-photography-guide",
    locale: "en",
    title: "Professional Product Photography Guide for E-Commerce",
    description:
      "Lighting, composition and post-production techniques for product photography — visual production strategies that boost your sales.",
    excerpt:
      "From proper lighting setup and color accuracy to white background techniques and Trendyol/Amazon-optimized images — everything about e-commerce product photography.",
    category: "Photography",
    readTime: "7 min read",
    publishedAt: "2026-04-15",
    image: "blogMicroInteraction",
    author: "Nimedya",
    tags: ["product photography", "e-commerce", "Trabzon", "studio photography"],
    body: [
      "Product photography is one of the most critical marketing elements that directly impacts e-commerce sales. Research shows high-quality visuals can increase conversion rates by up to 30%.",
      "**Proper Lighting Setup**\n\nThe foundation of professional product photography is correct lighting. A three-point lighting arrangement (key light, fill light, rim light) is used to best capture the product's texture, color and form.",
      "**E-Commerce Platform Standards**\n\nPlatforms like Amazon, Shopify and eBay have specific image standards. White background, minimum 1000×1000 pixel resolution and the product occupying 85% of the frame are basic requirements.",
      "**Post-Production Process**\n\nColor correction, background removal and image optimization after the shoot determine the final quality of the product. Choosing the right color profile and output format are critical steps.",
      "At Nimedya, we manage all these processes meticulously at our Trabzon studio, producing e-commerce and catalogue images for your brands.",
    ],
  },
  {
    slug: "brand-identity-design",
    locale: "en",
    title: "5 Core Principles of Strong Brand Identity Design",
    description:
      "From logo design to color palette, from typography to brand guidelines — how to create a long-lasting and consistent brand identity.",
    excerpt:
      "Essential knowledge about brand strategy and visual identity design for businesses looking to build or refresh their brand from scratch.",
    category: "Brand Identity",
    readTime: "5 min read",
    publishedAt: "2026-03-20",
    image: "blogBrandStory",
    author: "Nimedya",
    tags: ["brand identity", "logo design", "corporate identity", "Trabzon"],
    body: [
      "A strong brand identity is not just a beautiful logo. It is an integrated system that expresses your brand's values, target audience and competitive positioning in a visual language.",
      "**1. Strategy Comes First**\n\nEvery design decision must have a strategic rationale behind it. Moving to design without defining your target audience, competitors and differentiating value proposition is costly in the long run.",
      "**2. Flexibility and Consistency**\n\nYour identity must remain consistent across digital, print and physical environments while being flexible across different sizes and usage contexts.",
      "**3. Color Psychology**\n\nColors carry powerful emotional associations. Your primary color choice should reflect your industry, target audience and brand personality.",
      "**4. Typography System**\n\nBuilding a hierarchical and readable typography system with two or three complementary typeface families ensures content consistency.",
      "**5. Living Brand Guidelines**\n\nA brand guide documenting all these decisions ensures your team and agencies apply them consistently.",
    ],
  },
  {
    slug: "website-speed-seo",
    locale: "en",
    title: "Website Speed & Core Web Vitals: Impact on SEO",
    description:
      "Understanding Google's Core Web Vitals metrics and a practical guide to improving your website's LCP, INP and CLS scores.",
    excerpt:
      "Page speed is now a Google ranking factor. Learn how to measure and improve your LCP, INP and CLS metrics.",
    category: "Web & SEO",
    readTime: "6 min read",
    publishedAt: "2026-02-10",
    image: "blogPerformance",
    author: "Nimedya",
    tags: ["web design", "SEO", "Core Web Vitals", "page speed"],
    body: [
      "With Google's 2021 Core Web Vitals update, page experience became an official ranking factor. LCP, INP and CLS metrics now directly affect search rankings.",
      "**LCP (Largest Contentful Paint)**\n\nMeasures the loading time of the main content of the page. An LCP score below 2.5 seconds is considered 'Good'. Priority loading of hero images and CDN usage improves LCP.",
      "**INP (Interaction to Next Paint)**\n\nMeasures response time to user interactions. Reducing JavaScript execution time and optimizing third-party scripts improves INP.",
      "**CLS (Cumulative Layout Shift)**\n\nMeasures visual shifts that occur while the page loads. Setting fixed dimensions on images and reserving ad slots reduces CLS.",
      "At Nimedya, we keep all Core Web Vitals metrics in the green zone on our websites using Next.js 16, static generation and image optimization techniques.",
    ],
  },
];

export function getBlogPosts(locale: "tr" | "en"): BlogPost[] {
  return blogPosts.filter((p) => p.locale === locale).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPost(locale: "tr" | "en", slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.locale === locale && p.slug === slug);
}
