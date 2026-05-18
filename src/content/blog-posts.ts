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
    slug: "trabzon-web-tasarim-rehberi",
    locale: "tr",
    title: "Trabzon'da Web Sitesi Yaptırmak: 2026 Rehberi",
    description:
      "Trabzon'daki işletmeler için web sitesi yaptırırken dikkat edilmesi gereken teknik, SEO ve fiyat kriterleri — doğru ajans seçiminden lansman sürecine kapsamlı rehber.",
    excerpt:
      "Next.js, CMS seçimi, yerel SEO altyapısı ve mobil performans — Trabzon işletmelerinin web sitesi projelerinde sorduğu tüm sorular ve yanıtları.",
    category: "Web Tasarım",
    readTime: "8 dk okuma",
    publishedAt: "2026-05-10",
    image: "blogPerformance",
    author: "Nimedya",
    tags: ["Trabzon web tasarım", "web sitesi", "yerel SEO", "dijital ajans"],
    body: [
      "Trabzon'daki işletmeler için profesyonel bir web sitesi artık bir tercih değil, zorunluluktur. Yerel rekabet güçlenirken Google aramaları satın alma kararlarının başlangıç noktası haline geldi. Peki Trabzon'da web sitesi yaptırırken nelere dikkat etmek gerekiyor?",
      "**Trabzon'a Özgü SEO Altyapısı**\n\nTrabzon merkezli aramalarda (\"Trabzon web tasarım\", \"Trabzon e-ticaret\") görünebilmek için sitenin teknik SEO altyapısının yerel sinyallerle desteklenmesi gerekiyor. LocalBusiness schema, Google Haritalar entegrasyonu, NAP (İsim-Adres-Telefon) tutarlılığı ve Trabzon odaklı anahtar kelime stratejisi her projemizde standart geliyor.",
      "**Mobil-Öncelikli Tasarım Kaçınılmaz**\n\nTrabzon'daki web trafiğinin %70'inden fazlası mobil cihazlardan geliyor. Bu gerçeği görmezden gelen siteler hem kullanıcı deneyiminde hem de Google sıralamalarında ciddi kayıplar yaşıyor. Mobil-öncelikli geliştirme, masaüstünü uyarlayan değil — mobili birincil ekran kabul eden bir mimari anlayışıdır.",
      "**Doğru Teknoloji Seçimi**\n\nTrabzon'daki proje taleplerimizde en sık karşılaştığımız soru: \"WordPress mu, Next.js mi?\" Her ikisi de geçerli seçenekler, ancak farklı ihtiyaçlara hitap ediyor. Katalog siteler ve bloglar için WordPress yeterli olabilirken, yüksek trafik ve performans gerektiren e-ticaret veya kurumsal siteler için Next.js ile headless mimariler belirgin şekilde öne çıkıyor.",
      "**Fiyat Nasıl Belirleniyor?**\n\nTrabzon'da web sitesi fiyatları proje kapsamına göre büyük farklılık gösteriyor. Kurumsal bir pazarlama sitesi için genellikle 15.000–40.000 ₺ aralığı, e-ticaret entegrasyonu içeren projeler için 30.000–80.000 ₺ aralığı geçerli. Bu rakamlar tasarım, geliştirme, SEO kurulumu ve teslim sonrası eğitimi kapsıyor.",
      "Nimedya olarak Trabzon merkezli ajansımızda, projenizin keşfinden lansmanına kadar her aşamada yanınızdayız. Ücretsiz keşif görüşmesi için iletişim formunu doldurmanız yeterli.",
    ],
  },
  {
    slug: "trabzon-seo-stratejisi",
    locale: "tr",
    title: "Trabzon İşletmeleri için Yerel SEO Stratejisi",
    description:
      "Trabzon'da Google'ın ilk sayfasına çıkmak için uygulanabilir yerel SEO teknikleri — Google Business Profile, yerel içerik kümeleri ve backlink stratejisi.",
    excerpt:
      "\"Trabzon reklam ajansı\", \"Trabzon web tasarım\" gibi sorgularda öne çıkmak için sistematik yerel SEO yol haritası.",
    category: "SEO",
    readTime: "7 dk okuma",
    publishedAt: "2026-05-01",
    image: "blogMicroInteraction",
    author: "Nimedya",
    tags: ["Trabzon SEO", "yerel SEO", "Google Business Profile", "dijital pazarlama"],
    body: [
      "Trabzon'daki dijital rekabet hâlâ olgunlaşma aşamasında — bu, doğru altyapıyı kuran işletmeler için büyük bir fırsat anlamına geliyor. Yerel SEO çalışmalarında erken davrananlar, rakipler sahneye çıkmadan kalıcı görünürlük kazanıyor.",
      "**Google Business Profile: Temel Zorunluluk**\n\nTrabzon'daki aramalarda Google harita sonuçlarına (local pack) girmenin tek yolu doğru optimize edilmiş bir Google Business Profile'dır. Doğru kategoriler, tam adres bilgisi, çalışma saatleri, fotoğraflar ve düzenli post paylaşımı — bunların tamamı yerel sıralamayı doğrudan etkiliyor. En önemlisi: müşteri yorumlarına yanıt vermek hem sıralamayı hem de güveni artırıyor.",
      "**NAP Tutarlılığı**\n\nGoogle, işletmenizin adını, adresini ve telefon numarasını (NAP) web genelinde tutarlı görmeyi bekliyor. Trabzon ve İstanbul adresini aynı anda listeliyorsanız bu çelişki yerel sıralamayı olumsuz etkiler. Tüm dizinlerde (Yandex, Apple Maps, Facebook) tek bir NAP kullanın.",
      "**Yerel İçerik Kümeleri**\n\n'Trabzon web tasarım', 'Trabzon fotoğrafçı' gibi anahtar kelimeleri hedefleyen özgün landing page'ler oluşturmak yerel aramalar için en etkili içerik stratejisidir. Her landing page, hedef anahtar kelimeyi H1'de barındırmalı, en az 600 kelime içermeli ve yerel referanslar içermelidir.",
      "**Backlink Stratejisi**\n\nTrabzon Ticaret ve Sanayi Odası, yerel haber siteleri, Karadeniz Teknik Üniversitesi ve sektörel bloglardan alınacak backlink'ler domain otoritesini artırır. Yerel etkinliklere sponsor olmak ve bülten haberlerine katkı sağlamak ücretsiz ve etkili backlink kaynaklarıdır.",
      "Nimedya SEO ekibi, Trabzon merkezli işletmeler için teknik denetimden içerik üretimine tam kapsamlı yerel SEO hizmeti sunuyor. Ücretsiz site denetimi için iletişime geçin.",
    ],
  },
  {
    slug: "tanitim-filmi-senaryosu",
    locale: "tr",
    title: "Tanıtım Filmi Senaryosu Nasıl Yazılır? Adım Adım Rehber",
    description:
      "Marka tanıtım filmi için senaryo yazımının temel ilkeleri — hedef kitle analizi, hikaye yapısı, storyboard ve çekim listesi hazırlama.",
    excerpt:
      "İyi bir tanıtım filmi senaryosu, çekimden önce başlar. Hedef kitleden platformlara, voiceover'dan beat-board'a — tüm süreç bu yazıda.",
    category: "Video Prodüksiyon",
    readTime: "6 dk okuma",
    publishedAt: "2026-04-25",
    image: "blogBrandStory",
    author: "Nimedya",
    tags: ["tanıtım filmi", "senaryo yazımı", "video prodüksiyon", "Trabzon"],
    body: [
      "Profesyonel bir tanıtım filmi, set gününden çok önce başlar — senaryo aşamasında. Stüdyo saatleri ve ekipman maliyetleri göz önüne alındığında, zayıf planlanan bir senaryo sette onarılamaz kayıplara yol açabilir.",
      "**1. Hedef Kitle ve Platform Analizi**\n\nSenaryo yazmadan önce iki soruya net yanıt şart: Bu film kimin için? Ve nerede yaşayacak? Instagram Reels için yazılan bir senaryo YouTube öncesi reklam için işe yaramaz. Her platformun ritmi, dikkat eşiği ve izleyici beklentisi farklıdır.",
      "**2. Tek Bir Mesaj, Güçlü Bir Kanca**\n\nEn iyi tanıtım filmleri tek bir fikri mükemmel şekilde anlatır. İzleyicinin ilk 3 saniyede 'Bu benim için' demesini sağlayan bir kanca ile başlamalı, ardından o fikri kanıtlayan görsel ve sessel argümanlar gelmelidir.",
      "**3. Beat-Board Hazırlama**\n\nHer sahneyi, geçişi ve konuşmayı sıralayan bir beat-board, çekim gününde rehberiniz olur. Metin, görsel ve ses tasarımını eşzamanlı düşünmek için en verimli araçtır.",
      "**4. Çekim Listesi (Shot List)**\n\nBeat-board'un sahne bazında kamera açısı, hareket ve ekipman notlarıyla detaylandırılmış versiyonudur. Kamera açılmadan önce her kare kafanızda netlenmiş olmalıdır.",
      "Nimedya olarak Trabzon'daki projelerimizde senaryo ve storyboard aşamasını prodüksiyonun ayrılmaz bir parçası olarak ele alıyoruz. Prodüksiyon öncesi süreç, sette harcanan zamanı en az ikiye katlamadan önce değer katar.",
    ],
  },
  {
    slug: "sosyal-medya-icerik-takvimi",
    locale: "tr",
    title: "Sosyal Medya İçerik Takvimi Oluşturma Rehberi",
    description:
      "Markanız için etkili bir sosyal medya içerik takvimi nasıl kurulur? Çeyreklik planlama, içerik sütunları ve platform bazlı üretim stratejisi.",
    excerpt:
      "Reaktif içerik üretiminden sistematik çeyreklik planlamaya geçiş — Nimedya'nın içerik takvimi yaklaşımı.",
    category: "Sosyal Medya",
    readTime: "5 dk okuma",
    publishedAt: "2026-04-05",
    image: "blogPerformance",
    author: "Nimedya",
    tags: ["sosyal medya", "içerik takvimi", "içerik stratejisi", "Trabzon"],
    body: [
      "Çoğu marka sosyal medyayı reaktif yönetir: bir etkinlik olduğunda paylaşır, ürün lansmanı geldiğinde içerik üretmeye çalışır. Bu yaklaşım hem ekibi yorar hem de marka tutarlılığını zedeler.",
      "**İçerik Sütunları Belirleyin**\n\nİçerik takviminin temeli, markanızın ne hakkında konuşacağını belirleyen 3–5 içerik sütunudur. Örnek: Eğitim içerikleri, Perde Arkası, Müşteri Hikayeleri, Ürün/Hizmet ve Yerel Trabzon içerikleri. Her sütun, markanın farklı bir boyutunu temsil eder.",
      "**Çeyreklik Planlama Döngüsü**\n\nÜç aylık bir planlama döngüsü, hem yeterince uzun vadeli düşünmeyi hem de değişen koşullara uyum sağlamayı mümkün kılar. Çeyrek başında kampanya takvimi, ürün lansmanları ve sezonsal yoğunluklar haritalanır; ardından haftalık içerik detaylandırılır.",
      "**Platform Bazlı Format Uyarlaması**\n\nAynı içerik her platformda farklı şekilde tüketilir. Instagram Reels dikey ve hızlı, LinkedIn yatay ve düşündürücü, TikTok ise özgün ve eğlenceli içerik bekler. Bir çekim gününde üretilen ham içerik, her platforma özgü kurgularla çoğaltılır.",
      "**Performans Geri Besleme Döngüsü**\n\nHer içerik döngüsünün sonunda kaydetme, paylaşım ve dönüşüm verilerini inceleyin. En iyi performans gösteren formatlar bir sonraki çeyreğin önceliği olsun. Bu döngü, zaman içinde içerik verimliliğini önemli ölçüde artırır.",
      "Nimedya olarak Trabzon'daki markalar için çeyreklik içerik üretimi yapıyoruz. Tek planlı çekim günüyle tüm kanal takviminizi dolduran sistematik üretim modeli hakkında bilgi almak için iletişime geçin.",
    ],
  },
  {
    slug: "trabzon-web-design-guide",
    locale: "en",
    title: "Getting a Website Built in Trabzon: 2026 Guide",
    description:
      "What to expect when commissioning a website in Trabzon — costs, timelines, technology choices and questions to ask every agency.",
    excerpt:
      "A practical guide for Trabzon businesses: how to evaluate web design agencies, what a realistic budget looks like, and which technology stack actually supports growth.",
    category: "Web Design",
    readTime: "8 min read",
    publishedAt: "2026-05-10",
    image: "blogPerformance",
    author: "Nimedya",
    tags: ["web design", "Trabzon", "e-commerce", "website"],
    body: [
      "For a Trabzon business owner, commissioning a website feels like stepping into a crowded market where every provider sounds identical. This guide cuts through the noise with practical criteria you can apply today.",
      "**What Does a Professional Website Actually Cost?**\n\nA landing-page style site (5–7 pages, no back-end) typically runs ₺15,000–₺35,000 when done properly. An e-commerce store with payment integration and admin panel starts around ₺40,000. Anything below these thresholds almost always means a template with no custom work — fine for some needs, fatal for others.",
      "**Technology That Supports Growth**\n\nThe most common regret we hear: 'we chose the cheapest option and had to rebuild everything 18 months later.' Next.js, headless CMS and a proper CI/CD pipeline cost more upfront but compound positively — page speed, SEO and maintainability all improve over time rather than degrading.",
      "**5 Questions to Ask Every Agency**\n\n1. Can I see live URLs of sites you've built in the last 12 months? 2. Who owns the code and hosting after delivery? 3. What does post-launch support cost? 4. How do you handle mobile performance? 5. Do you provide analytics and SEO setup as part of the project?",
      "**Trabzon-Specific Considerations**\n\nLocal search visibility matters enormously for Trabzon businesses. Your site needs proper structured data (LocalBusiness schema), Turkish-language SEO, and hreflang tags if you serve international visitors. Ask whether the agency has experience with Turkish e-commerce platforms like Trendyol and Hepsiburada integrations.",
      "At Nimedya we build performance-first websites from our Trabzon studio. If you'd like a no-obligation project review, get in touch through our contact page.",
    ],
  },
  {
    slug: "trabzon-seo-strategy",
    locale: "en",
    title: "Local SEO Strategy for Trabzon Businesses",
    description:
      "How Trabzon businesses can rank in Google for high-intent local searches — a practical roadmap from technical setup to content execution.",
    excerpt:
      "Local SEO is the highest-ROI marketing channel for most Trabzon SMEs. Here's how to set it up correctly and build compounding organic visibility.",
    category: "SEO",
    readTime: "9 min read",
    publishedAt: "2026-05-01",
    image: "blogMicroInteraction",
    author: "Nimedya",
    tags: ["SEO", "local SEO", "Trabzon", "Google"],
    body: [
      "When a potential customer in Trabzon searches 'product photography Trabzon' or 'web design agency Trabzon', who appears? If it's not you, a competitor is capturing that intent. Local SEO is how you change that.",
      "**Google Business Profile: The Highest-Leverage Starting Point**\n\nClaim and fully complete your Google Business Profile. Add every relevant service category, upload at least 15 photos, collect responses to every review, and post weekly updates. Businesses with complete profiles receive 7× more clicks than those with minimal information.",
      "**On-Page SEO for Local Intent**\n\nEvery service page should target a specific city + service keyword ('Trabzon brand identity design', 'Trabzon product photography studio'). Use that phrase in the H1, the meta title, the first paragraph, and at least one subheading. Add LocalBusiness structured data with your NAP (name, address, phone) matching exactly what's on your GBP.",
      "**Content Clusters That Build Authority**\n\nA single page rarely ranks for competitive terms. Build content clusters: a pillar page ('Trabzon web design') supported by spoke articles ('how much does a website cost in Trabzon', 'best CMS for Trabzon e-commerce'). Internal links between cluster pages distribute authority and help Google understand topic depth.",
      "**Technical Foundations You Cannot Skip**\n\nCore Web Vitals (LCP under 2.5s, CLS under 0.1, INP under 200ms) are ranking factors. HTTPS, canonical tags, XML sitemap, correct hreflang for TR/EN, and no broken links are table stakes. Run a Screaming Frog crawl quarterly.",
      "Nimedya provides end-to-end SEO services for Trabzon businesses — keyword architecture, technical audit, content production and monthly reporting. Contact us to discuss a roadmap for your sector.",
    ],
  },
  {
    slug: "promotional-film-script",
    locale: "en",
    title: "How to Write a Promotional Film Script",
    description:
      "A step-by-step guide to scripting a promotional video that actually converts — from brief to final screenplay.",
    excerpt:
      "Most promotional films fail because the script tries to say everything. Learn how to build a focused narrative structure that drives the viewer to act.",
    category: "Video Production",
    readTime: "6 min read",
    publishedAt: "2026-04-25",
    image: "blogBrandStory",
    author: "Nimedya",
    tags: ["promotional film", "video production", "scriptwriting", "brand video"],
    body: [
      "A promotional film script is not a catalogue. It is a 60–180 second narrative that moves a specific viewer from indifference to intent. Most scripts fail because they try to include everything the brand wants to say rather than everything the viewer needs to hear.",
      "**Start With One Sentence**\n\nBefore writing a word of script, answer this: 'After watching this film, I want [target viewer] to feel [emotion] and do [action].' If you can't write that sentence clearly, the script will ramble. This single sentence becomes your north star for every creative decision.",
      "**The 3-Act Structure for 90 Seconds**\n\nAct 1 (0–20s): Establish the tension or problem your viewer recognises. Act 2 (20–70s): Show transformation — how your product or service resolves that tension. Act 3 (70–90s): Deliver the desired future state and a clear call to action. This structure works for brand documentaries, product films, and social media ads alike.",
      "**Visual Thinking, Not Just Words**\n\nScript columns should include both dialogue/voiceover and visual description. 'We work hard for you' is a claim. A close-up of hands adjusting a product under studio lighting, followed by a satisfied customer unboxing it, is evidence. Write what the camera should show, not just what the narrator should say.",
      "**Common Mistakes to Avoid**\n\nOpening with the company name and founding year. Using passive voice throughout. Including more than three key messages. Ending without a specific call to action. Writing for the client's internal approval rather than the viewer's emotional journey.",
      "Nimedya produces promotional films and brand documentaries for businesses across Turkey. Our Trabzon studio handles scripting, direction, filming and post-production end to end.",
    ],
  },
  {
    slug: "social-media-content-calendar",
    locale: "en",
    title: "Social Media Content Calendar: A Practical Guide",
    description:
      "How to plan, produce and schedule social media content systematically — so you never run out of ideas or miss a posting day.",
    excerpt:
      "Reactive social media management exhausts teams and produces inconsistent results. A quarterly content calendar solves both problems at once.",
    category: "Social Media",
    readTime: "7 min read",
    publishedAt: "2026-04-05",
    image: "blogPerformance",
    author: "Nimedya",
    tags: ["social media", "content calendar", "content strategy", "Reels"],
    body: [
      "Most brands manage social media reactively: post when there's news, scramble when a product launches, go quiet when the team is busy. This approach burns out the content team and produces an inconsistent brand presence that audiences learn to ignore.",
      "**Define Your Content Pillars First**\n\nBefore building a calendar, define 3–5 content pillars — the fixed topics your brand will consistently address. Examples: Educational content, Behind the Scenes, Customer Stories, Products/Services, Local Trabzon content. Each pillar represents a different dimension of your brand and ensures variety without randomness.",
      "**The Quarterly Planning Cycle**\n\nA 12-week planning horizon is long enough to think strategically but short enough to stay responsive. At the start of each quarter, map campaign windows, product launches and seasonal peaks. Then populate weekly content slots from your pillars, leaving 20% of capacity unscheduled for reactive and trending content.",
      "**Platform-Specific Format Adaptation**\n\nThe same idea performs differently on each platform. Instagram Reels reward fast vertical storytelling, LinkedIn favours horizontal formats with depth, TikTok prizes authenticity over polish. One shoot day can produce raw material for all three — the key is planning the adaptations before the shoot, not after.",
      "**The Feedback Loop That Compounds Results**\n\nAt the end of every content cycle, review saves, shares and conversion data. Identify which formats and topics overperformed and weight the next quarter accordingly. Over 12 months this feedback loop dramatically improves content ROI without increasing production budget.",
      "Nimedya produces quarterly content packages for Trabzon brands — one planned shoot day fills your entire channel calendar. Get in touch to learn about our content production model.",
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
