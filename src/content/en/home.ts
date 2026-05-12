import type { HomeContent } from "@/types/content";

export const enHomeContent: HomeContent = {
  heroTitleA: "Creative",
  heroTitleB: "Digital Form",
  heroText:
    "Nimedya is a digital partner combining aesthetics and strategy for high-growth brands. We transform ideas into compelling visual experiences.",
  ctaA: "Meet Us",
  ctaB: "Our Projects",
  sectionLabel: "What We Do",
  sectionTitle: "Creative Service Spectrum",
  featured: "Featured Projects",
  refs: "References",
  blog: "From the Blog",
  featuredProjects: [
    {
      title: "Lunessa Home Commerce Experience",
      description: "A clean, conversion-driven storefront was designed from mobile browsing to checkout flow.",
      tag: "Commerce Design",
      image: "featuredEcommerce",
    },
    {
      title: "Atlas Clinic SEO Conversion Revamp",
      description: "A service-driven landing architecture was built to increase qualified organic traffic.",
      tag: "SEO + Web Architecture",
      image: "featuredSeoAnalytics",
    },
    {
      title: "Mira Beauty Social Campaign System",
      description: "A unified campaign language across reels, stories, and landing pages improved engagement quality.",
      tag: "Social Creative",
      image: "featuredSocialMedia",
    },
  ],
  references: [
    {
      name: "Northline Interiors",
      sector: "Architecture",
      summary: "End-to-end creative partnership for corporate web presence and visual production workflows.",
      image: "referenceWorkspace",
    },
    {
      name: "Vega Dental",
      sector: "Healthcare",
      summary: "Treatment-focused content, SEO structure, and appointment conversion were optimized together.",
      image: "referenceOffice",
    },
    {
      name: "Riva Studio",
      sector: "Lifestyle",
      summary: "Creative concept, production, and landing delivery for seasonal campaigns became a repeatable system.",
      image: "referenceCreativeSite",
    },
  ],
  blogHighlights: [
    {
      title: "How Micro-Interactions Improve Conversion",
      excerpt: "A practical breakdown of how small motion decisions accelerate user confidence and action.",
      category: "UX Performance",
      image: "blogMicroInteraction",
    },
    {
      title: "Brand Narrative Is More Than a Logo",
      excerpt: "We shared a practical framework to align color, typography, and messaging into one clear brand story.",
      category: "Brand Strategy",
      image: "blogBrandStory",
    },
    {
      title: "7 Fast Wins for Better Web Performance",
      excerpt: "Quick gains for LCP, visual loading, and content hierarchy that improve perceived speed.",
      category: "Technical SEO",
      image: "blogPerformance",
    },
  ],
};
