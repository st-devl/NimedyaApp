export const imageManifest = {
  homeHero: {
    src: "/images/home-hero.webp",
    role: "home-lcp",
    sizes: "(min-width: 768px) 50vw, 100vw",
    quality: 85,
    priority: true,
  },
  aboutHero: {
    src: "/images/about-hero.webp",
    role: "about-lcp",
    sizes: "(min-width: 768px) 50vw, 100vw",
    quality: 85,
    priority: true,
  },
  productServiceHero: {
    src: "/images/service-detail-hero.webp",
    role: "service-detail-lcp",
    sizes: "(min-width: 1024px) 45vw, 100vw",
    quality: 85,
    priority: true,
  },
  serviceFeatured1: {
    src: "/images/service-featured-1.webp",
    role: "card",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  serviceFeatured2: {
    src: "/images/service-featured-2.webp",
    role: "card",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  portfolio1: {
    src: "/images/portfolio-1.webp",
    role: "portfolio",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  portfolio2: {
    src: "/images/portfolio-2.webp",
    role: "portfolio",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  portfolio3: {
    src: "/images/portfolio-3.webp",
    role: "portfolio",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  team1: {
    src: "/images/team-1.webp",
    role: "team",
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
    quality: 80,
  },
  team2: {
    src: "/images/team-2.webp",
    role: "team",
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
    quality: 80,
  },
  team3: {
    src: "/images/team-3.webp",
    role: "team",
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
    quality: 80,
  },
  aboutWorkspace: {
    src: "/images/about-workspace.webp",
    role: "team",
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
    quality: 80,
  },
  featuredEcommerce: {
    src: "/images/featured-ecommerce.webp",
    role: "featured",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 82,
  },
  featuredSeoAnalytics: {
    src: "/images/featured-seo-analytics.webp",
    role: "featured",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 82,
  },
  featuredSocialMedia: {
    src: "/images/featured-social-media.webp",
    role: "featured",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 82,
  },
  blogMicroInteraction: {
    src: "/images/blog-micro-interaction.webp",
    role: "blog",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  blogBrandStory: {
    src: "/images/blog-brand-story.webp",
    role: "blog",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  blogPerformance: {
    src: "/images/blog-performance.webp",
    role: "blog",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  referenceWorkspace: {
    src: "/images/reference-workspace.webp",
    role: "reference",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  referenceOffice: {
    src: "/images/reference-office.webp",
    role: "reference",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
  referenceCreativeSite: {
    src: "/images/reference-creative-site.webp",
    role: "reference",
    sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    quality: 80,
  },
} as const;

export type ImageManifestKey = keyof typeof imageManifest;

export function resolveImageMeta(
  image: string,
  fallbackSizes: string,
): { src: string; sizes: string; quality: number } {
  if (image in imageManifest) {
    const e = imageManifest[image as ImageManifestKey];
    return { src: e.src, sizes: e.sizes, quality: e.quality };
  }
  return { src: image, sizes: fallbackSizes, quality: 80 };
}
