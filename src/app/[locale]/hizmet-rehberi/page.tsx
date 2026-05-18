import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { localizedPath } from "@/lib/i18n/routes";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const content = {
  tr: {
    hero: {
      pretitle: "KARAR REHBERİ",
      title: "Markanız için doğru hizmet hangisi?",
      subtitle:
        "Her işletmenin ihtiyacı farklıdır. Aşağıdaki rehber, hedeflerinize göre size en uygun hizmetleri gösterir.",
    },
    quiz: [
      {
        question: "Temel hedefiniz ne?",
        options: [
          { label: "Çevrimiçi satışlarımı artırmak", service: "Ürün Fotoğrafçılığı", key: "productPhotography" },
          { label: "Marka bilinirliğimi yükseltmek", service: "Tanıtım Filmi", key: "services" },
          { label: "Yeni müşteri çekmek (Google'dan)", service: "SEO & Web Tasarım", key: "trabzonSeo" },
          { label: "Sosyal medya etkileşimimi artırmak", service: "Sosyal Medya İçerik Üretimi", key: "trabzonSosyalMedya" },
        ],
      },
    ],
    comparison: {
      title: "Hizmet karşılaştırması",
      subtitle: "Tüm hizmetlerimizi tek tabloda karşılaştırın.",
      headers: ["Hizmet", "Kim İçin?", "Teslimat", "Sonuç"],
      rows: [
        ["Ürün Fotoğrafçılığı", "E-ticaret & katalog", "3–7 iş günü", "Dönüşüm artışı"],
        ["Tanıtım Filmi", "Marka & kurumsal", "2–4 hafta", "Güven & bilinirlik"],
        ["Web Tasarım & E-Ticaret", "Tüm işletmeler", "4–8 hafta", "Organik büyüme"],
        ["Marka Kimliği", "Yeni & yenilenen markalar", "3–6 hafta", "Tutarlı görsel dil"],
        ["Sosyal Medya Üretimi", "Aktif markalar", "Aylık döngü", "Topluluk & bağ"],
        ["SEO & İçerik Stratejisi", "Web sitesi olanlar", "3+ ay", "Google trafiği"],
      ],
    },
    budget: {
      title: "Bütçenize göre nereden başlamalısınız?",
      tiers: [
        {
          range: "₺5.000 – ₺15.000",
          title: "Başlangıç Paketi",
          desc: "Marka kimliği temel paketi veya tek ürün grubu fotoğraf çekimi. Dijital varlığınızı kurmak için ideal başlangıç.",
          cta: "Teklif Alın",
          key: "contact",
        },
        {
          range: "₺15.000 – ₺40.000",
          title: "Büyüme Paketi",
          desc: "Web sitesi + SEO kurulumu veya tanıtım filmi + sosyal medya içerik paketinin birleşimi. En popüler kombinasyon.",
          cta: "Detayları Görüşelim",
          key: "contact",
          highlight: true,
        },
        {
          range: "₺40.000+",
          title: "Tam Ekosistem",
          desc: "Fotoğraf, video, web tasarım ve süregelen SEO & sosyal medya yönetimini kapsayan tam kapsamlı dijital ekosistem.",
          cta: "Strateji Görüşmesi",
          key: "contact",
        },
      ],
    },
    faq: {
      title: "Sık sorulan sorular",
      items: [
        {
          q: "Birden fazla hizmete aynı anda ihtiyaç duyarsam ne olur?",
          a: "Paket kombinasyonları indirimli fiyatlandırılır. İlk görüşmede tüm ihtiyaçlarınızı paylaşmanız en uygun paketi belirlememizi sağlar.",
        },
        {
          q: "Hangi hizmetten başlamalıyım?",
          a: "Çoğu marka için önerimiz: önce güçlü bir görsel kimlik (fotoğraf veya logo), ardından web sitesi, ardından içerik dağıtımı (SEO + sosyal medya).",
        },
        {
          q: "Trabzon dışındaki işletmelere de hizmet veriyor musunuz?",
          a: "Evet. Dijital teslimatlar (web tasarım, SEO, sosyal medya) Türkiye genelinde sunulur. Stüdyo çekimleri için Trabzon'da çalışıyoruz.",
        },
      ],
    },
    cta: {
      title: "Hâlâ karar veremediniz mi?",
      subtitle: "15 dakikalık ücretsiz bir strateji görüşmesi ayarlayalım. Markanızın ihtiyacını birlikte belirleyeceğiz.",
      button: "Ücretsiz Görüşme Ayarla",
    },
  },
  en: {
    hero: {
      pretitle: "DECISION GUIDE",
      title: "Which service is right for your brand?",
      subtitle:
        "Every business has different needs. The guide below shows you the most suitable services based on your goals.",
    },
    quiz: [
      {
        question: "What is your primary goal?",
        options: [
          { label: "Increase my online sales", service: "Product Photography", key: "productPhotography" },
          { label: "Build brand awareness", service: "Promotional Film", key: "services" },
          { label: "Attract new customers (via Google)", service: "SEO & Web Design", key: "trabzonSeo" },
          { label: "Grow social media engagement", service: "Social Media Content", key: "trabzonSosyalMedya" },
        ],
      },
    ],
    comparison: {
      title: "Service comparison",
      subtitle: "Compare all our services in a single table.",
      headers: ["Service", "Who For?", "Delivery", "Outcome"],
      rows: [
        ["Product Photography", "E-commerce & catalogue", "3–7 business days", "Conversion lift"],
        ["Promotional Film", "Brand & corporate", "2–4 weeks", "Trust & awareness"],
        ["Web Design & E-Commerce", "All businesses", "4–8 weeks", "Organic growth"],
        ["Brand Identity", "New & rebranding", "3–6 weeks", "Consistent visual language"],
        ["Social Media Production", "Active brands", "Monthly cycle", "Community & engagement"],
        ["SEO & Content Strategy", "Existing websites", "3+ months", "Google traffic"],
      ],
    },
    budget: {
      title: "Where to start based on your budget",
      tiers: [
        {
          range: "$500 – $1,500",
          title: "Starter Package",
          desc: "Core brand identity or a single product group photo shoot. The ideal starting point to build your digital presence.",
          cta: "Get a Quote",
          key: "contact",
        },
        {
          range: "$1,500 – $4,000",
          title: "Growth Package",
          desc: "Website + SEO setup or promotional film + social media content package. The most popular combination.",
          cta: "Discuss Details",
          key: "contact",
          highlight: true,
        },
        {
          range: "$4,000+",
          title: "Full Ecosystem",
          desc: "Full-scope digital ecosystem covering photography, video, web design and ongoing SEO & social media management.",
          cta: "Strategy Session",
          key: "contact",
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "What if I need multiple services at once?",
          a: "Package combinations are priced at a discount. Sharing all your needs in the first conversation lets us identify the most suitable package.",
        },
        {
          q: "Which service should I start with?",
          a: "For most brands, we recommend: strong visuals first (photography or logo), then website, then content distribution (SEO + social media).",
        },
        {
          q: "Do you serve businesses outside Trabzon?",
          a: "Yes. Digital deliverables (web design, SEO, social media) are offered across Turkey. Studio shoots are based in Trabzon.",
        },
      ],
    },
    cta: {
      title: "Still not sure?",
      subtitle: "Let's arrange a free 15-minute strategy call. We'll identify your brand's needs together.",
      button: "Schedule a Free Call",
    },
  },
} as const;

export default async function HizmetRehberiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  const t = content[resolvedLocale];
  const contactHref = localizedPath(resolvedLocale, "contact");

  return (
    <>
      <TopNav locale={resolvedLocale} />
      <main>
        {/* Hero */}
        <section className="nmd-container nmd-page-x py-[120px] text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--secondary)]">{t.hero.pretitle}</p>
          <h1 className="nmd-headline-xl mx-auto max-w-3xl text-[color:var(--primary)]">{t.hero.title}</h1>
          <p className="nmd-body-lg mx-auto mt-5 max-w-2xl text-[color:var(--app-muted)]">{t.hero.subtitle}</p>
        </section>

        {/* Goal-based quick guide */}
        <section className="bg-[color:var(--app-card)] py-20">
          <div className="nmd-container nmd-page-x">
            <h2 className="nmd-headline-lg mb-12 text-center text-[color:var(--primary)]">{t.quiz[0].question}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {t.quiz[0].options.map((opt) => (
                <Link
                  className="group flex flex-col gap-4 rounded-2xl border border-[color:var(--app-border)]/30 bg-white p-8 shadow-sm nmd-transition hover:-translate-y-1 hover:border-[color:var(--secondary)]/40 hover:shadow-xl"
                  href={localizedPath(resolvedLocale, opt.key as Parameters<typeof localizedPath>[1])}
                  key={opt.label}
                >
                  <p className="text-base font-semibold text-[color:var(--primary)]">{opt.label}</p>
                  <div className="mt-auto">
                    <span className="rounded-full bg-[color:var(--secondary)]/10 px-3 py-1 text-xs font-bold text-[color:var(--secondary)]">
                      {resolvedLocale === "tr" ? "Öneri: " : "Recommended: "}{opt.service}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[color:var(--secondary)] group-hover:underline">
                    {resolvedLocale === "tr" ? "İncele →" : "Explore →"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="nmd-container nmd-page-x py-[100px]">
          <div className="mb-12 text-center">
            <h2 className="nmd-headline-lg text-[color:var(--primary)]">{t.comparison.title}</h2>
            <p className="nmd-body-md mt-3 text-[color:var(--app-muted)]">{t.comparison.subtitle}</p>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 md:overflow-x-visible md:px-0">
            <table className="min-w-[600px] w-full border-collapse text-sm md:min-w-0">
              <thead>
                <tr className="border-b-2 border-[color:var(--app-border)]/40">
                  {t.comparison.headers.map((h) => (
                    <th className="pb-4 text-left text-xs font-bold uppercase tracking-wider text-[color:var(--app-muted)]" key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--app-border)]/20">
                {t.comparison.rows.map((row) => (
                  <tr className="nmd-transition hover:bg-[color:var(--surface-container)]" key={row[0]}>
                    <td className="py-4 font-semibold text-[color:var(--primary)]">{row[0]}</td>
                    <td className="py-4 text-[color:var(--app-muted)]">{row[1]}</td>
                    <td className="py-4 text-[color:var(--app-muted)]">{row[2]}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-[color:var(--secondary)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--secondary)]">{row[3]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Budget tiers */}
        <section className="bg-[color:var(--app-card)] py-[100px]">
          <div className="nmd-container nmd-page-x">
            <h2 className="nmd-headline-lg mb-12 text-center text-[color:var(--primary)]">{t.budget.title}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {t.budget.tiers.map((tier) => (
                <article
                  className={`flex flex-col rounded-2xl border p-8 ${
                    "highlight" in tier && tier.highlight
                      ? "border-[color:var(--secondary)] bg-[color:var(--primary)] text-[color:var(--on-primary)] shadow-2xl"
                      : "border-[color:var(--app-border)]/30 bg-white"
                  }`}
                  key={tier.range}
                >
                  {"highlight" in tier && tier.highlight && (
                    <span className="mb-4 inline-block rounded-full bg-[color:var(--secondary)] px-3 py-1 text-xs font-bold text-white w-fit">
                      {resolvedLocale === "tr" ? "Popüler" : "Popular"}
                    </span>
                  )}
                  <p className={`text-xl font-bold ${"highlight" in tier && tier.highlight ? "text-white" : "text-[color:var(--primary)]"}`}>{tier.range}</p>
                  <p className={`mt-1 text-sm font-semibold ${"highlight" in tier && tier.highlight ? "text-white/80" : "text-[color:var(--secondary)]"}`}>{tier.title}</p>
                  <p className={`mt-4 flex-1 text-sm ${"highlight" in tier && tier.highlight ? "text-white/70" : "text-[color:var(--app-muted)]"}`}>{tier.desc}</p>
                  <Link
                    className={`mt-8 inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold nmd-transition hover:-translate-y-0.5 ${
                      "highlight" in tier && tier.highlight
                        ? "bg-[color:var(--secondary)] text-white hover:opacity-90"
                        : "border-2 border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-[color:var(--on-primary)]"
                    }`}
                    href={contactHref}
                  >
                    {tier.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="nmd-container nmd-page-x py-[100px]">
          <h2 className="nmd-headline-lg mb-12 text-center text-[color:var(--primary)]">{t.faq.title}</h2>
          <div className="mx-auto max-w-3xl divide-y divide-[color:var(--app-border)]/30">
            {t.faq.items.map((item) => (
              <div className="py-6" key={item.q}>
                <p className="font-semibold text-[color:var(--primary)]">{item.q}</p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--app-muted)]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[color:var(--primary)] py-24 text-center">
          <div className="nmd-container nmd-page-x">
            <h2 className="nmd-headline-xl mb-4 text-[color:var(--on-primary)]">{t.cta.title}</h2>
            <p className="nmd-body-lg mx-auto mb-10 max-w-2xl text-[color:var(--on-primary)]/70">{t.cta.subtitle}</p>
            <Link
              className="inline-flex min-h-[44px] items-center rounded-xl bg-[color:var(--secondary)] px-10 py-4 text-sm font-semibold text-white nmd-transition hover:-translate-y-1 hover:opacity-90"
              href={contactHref}
            >
              {t.cta.button}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={resolvedLocale} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "serviceGuide");
}
