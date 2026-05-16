import {
  getAboutContent,
  getContactContent,
  getHomeContent,
  getHowWeWorkContent,
  getPortfolioContent,
  getProductPhotographyContent,
  getServiceDetailsContent,
  getServicesContent,
} from "@/content";
import type { AboutContent, CaseStudy, ContactContent, HomeContent, HomeServicesContent, HowWeWorkContent, PortfolioContent, ProductPhotographyContent, ServiceDetailContent, ServiceDetailsContent, ServicesContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { getPublishedContentBlock } from "@/lib/cms/content";
import { prisma } from "@/lib/db/prisma";

export type PublicSliderItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  linkUrl: string | null;
};

export async function getActiveSliderItems(locale: Locale): Promise<PublicSliderItem[]> {
  try {
    const items = await prisma.sliderItem.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return items.map((item) => ({
      id: item.id,
      title: locale === "tr" ? item.trTitle : item.enTitle,
      description: locale === "tr" ? item.trDescription : item.enDescription,
      imageUrl: item.imageUrl,
      linkUrl: item.linkUrl,
    }));
  } catch {
    return [];
  }
}

async function getManagedContent<T extends object>(key: Parameters<typeof getPublishedContentBlock<T>>[0], locale: Locale, fallback: T): Promise<T> {
  const db = await getPublishedContentBlock<T>(key, locale);
  if (!db) return fallback;
  // Shallow-merge so newly added fields in the type are filled from fallback
  // when the stored DB content predates them.
  return { ...fallback, ...db };
}

export function getManagedHomeContent(locale: Locale): Promise<HomeContent> {
  return getManagedContent("home", locale, getHomeContent(locale));
}

export function getManagedServicesContent(locale: Locale): Promise<ServicesContent> {
  return getManagedContent("services", locale, getServicesContent(locale));
}

export function getManagedProductPhotographyContent(locale: Locale): Promise<ProductPhotographyContent> {
  return getManagedContent("productPhotography", locale, getProductPhotographyContent(locale));
}

export function getManagedPortfolioContent(locale: Locale): Promise<PortfolioContent> {
  return getManagedContent("portfolio", locale, getPortfolioContent(locale));
}

export function getManagedAboutContent(locale: Locale): Promise<AboutContent> {
  return getManagedContent("about", locale, getAboutContent(locale));
}

export function getManagedContactContent(locale: Locale): Promise<ContactContent> {
  return getManagedContent("contact", locale, getContactContent(locale));
}

export function getManagedHowWeWorkContent(locale: Locale): Promise<HowWeWorkContent> {
  return getManagedContent("howWeWork", locale, getHowWeWorkContent(locale));
}

const defaultHomeServices: HomeServicesContent = {
  sectionLabel: "HİZMETLERİMİZ",
  sectionTitle: "Markanızın görsel ekosistemini kuruyoruz",
  services: [
    {
      title: "Ürün & Kampanya Fotoğrafçılığı",
      description:
        "E-ticaret, katalog ve kampanya çekimlerini, performans reklam metriklerine göre kurgulanmış görsel sistemlerle teslim ederiz.",
      imageUrl: "/images/service-featured-1.webp",
      cta: "",
    },
    {
      title: "Tanıtım Filmi & Marka Belgeseli",
      description:
        "Markanın hikayesini sinematik bir dille anlatan, sosyal medyadan TV'ye kadar yayın formatlarına uyarlanmış videolar.",
      imageUrl: "",
      cta: "KEŞFET",
    },
    {
      title: "Web Tasarım & E-Ticaret",
      description:
        "Mobil dönüşüme odaklı, hızlı yüklenen, satışı tetikleyen modern arayüzler. Tasarımdan canlı yayına tek elden teslim.",
      imageUrl: "",
      cta: "",
    },
    {
      title: "Marka Kimliği & Logo Sistemi",
      description:
        "Logodan tipografiye, renk paletinden uygulama kurallarına markanın tüm görsel dilini tutarlı bir sistem olarak kurarız.",
      imageUrl: "/images/portfolio-3.webp",
      cta: "",
    },
  ],
};

export function getManagedHomeServicesContent(locale: Locale): Promise<HomeServicesContent> {
  return getManagedContent<HomeServicesContent>("homeServices", locale, defaultHomeServices);
}

export async function getManagedServiceDetailsContent(locale: Locale): Promise<ServiceDetailsContent> {
  const staticFallback = getServiceDetailsContent(locale);

  const rows = await prisma.serviceDetail.findMany({
    where: { locale, status: "PUBLISHED" },
    orderBy: { key: "asc" },
  });

  if (rows.length === 0) return staticFallback;

  // Merge DB rows into static array: DB wins for matching keys, static fills gaps
  return staticFallback.map((staticItem): ServiceDetailContent => {
    const db = rows.find((r) => r.key === staticItem.key);
    if (!db) return staticItem;
    return {
      key: staticItem.key,
      slug: db.slug,
      label: db.label,
      title: db.title,
      intro: db.intro,
      heroCta: db.heroCta,
      aboutTitle: db.aboutTitle,
      aboutLead: db.aboutLead,
      aboutBody: db.aboutBody,
      benefitsTitle: db.benefitsTitle,
      benefits: db.benefits as ServiceDetailContent["benefits"],
      processTitle: db.processTitle,
      processSteps: db.processSteps as ServiceDetailContent["processSteps"],
      deliverablesTitle: db.deliverablesTitle,
      deliverables: db.deliverables as string[],
      faqTitle: db.faqTitle,
      faq: db.faq as ServiceDetailContent["faq"],
      ctaTitle: db.ctaTitle,
      ctaSubtitle: db.ctaSubtitle,
      ctaButton: db.ctaButton,
      image: db.image,
    };
  });
}

export async function getManagedCaseStudies(locale: Locale): Promise<CaseStudy[]> {
  const staticPortfolio = getPortfolioContent(locale);
  const staticFallback: CaseStudy[] = staticPortfolio.caseStudies ?? [];

  const rows = await prisma.caseStudy.findMany({
    where: { locale, status: "PUBLISHED" },
    orderBy: { client: "asc" },
  });

  if (rows.length === 0) return staticFallback;

  const dbStudies: CaseStudy[] = rows.map((r) => ({
    slug: r.slug,
    client: r.client,
    sector: r.sector,
    duration: r.duration,
    year: r.year ?? undefined,
    image: r.image,
    challenge: r.challenge,
    approach: r.approach,
    result: r.result,
    scope: r.scope as string[],
    services: r.services ? (r.services as string[]) : undefined,
    metrics: r.metrics as CaseStudy["metrics"],
    gallery: r.gallery ? (r.gallery as string[]) : undefined,
    testimonial: r.testimonial ? (r.testimonial as CaseStudy["testimonial"]) : undefined,
  }));

  // DB records replace matching static ones (by slug); static-only items fill the rest
  const staticSlugs = new Set(dbStudies.map((d) => d.slug));
  const remainingStatic = staticFallback.filter((s) => !staticSlugs.has(s.slug));
  return [...dbStudies, ...remainingStatic];
}
