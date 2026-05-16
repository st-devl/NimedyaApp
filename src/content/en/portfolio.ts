import type { PortfolioContent } from "@/types/content";

export const enPortfolioContent: PortfolioContent = {
  title: "Selected Work",
  subtitle:
    "Different sectors, different scales — but every project follows one rule: the visuals speak the same language as the marketing goal.",
  categories: ["Photography", "Video", "Web", "Brand Identity"],
  projects: [
    {
      title: "Lunessa Home — Product Showcase",
      description: "Seasonal e-commerce catalogue: 220 visuals across studio and lifestyle, in one consistent system.",
      image: "portfolio1",
      category: "Photography",
    },
    {
      title: "Atlas Clinic — Treatment Story Film",
      description: "A three-minute short telling the patient journey while reinforcing institutional trust.",
      image: "portfolio2",
      category: "Video",
    },
    {
      title: "Mira Beauty — Campaign Microsite",
      description: "A Next.js landing built for the seasonal campaign, optimised for performance ad traffic.",
      image: "portfolio3",
      category: "Web",
    },
  ],
  caseStudiesTitle: "Case Studies",
  caseStudiesSubtitle:
    "What happens when creative speaks the same language as marketing? Three projects from three sectors, each ending with a measurable outcome.",
  caseStudies: [
    {
      slug: "lunessa-home",
      client: "Lunessa Home",
      sector: "Lifestyle · E-Commerce",
      duration: "8 weeks",
      year: "2025",
      services: ["Web Design & E-Commerce", "Product Photography", "Brand Identity"],
      scope: ["E-commerce design", "Product photography", "Mobile conversion optimisation"],
      challenge:
        "As seasonal collections grew, the existing storefront loaded slowly on mobile and cart abandonment crossed 78%. Product visuals were shot in different studios across seasons, breaking brand consistency.",
      approach:
        "We rebuilt the storefront mobile-first, then produced 220 product images across studio + lifestyle styles using a single lighting and composition guideline. Checkout was reduced from five to three steps; visuals shipped as WebP with responsive sizes.",
      result:
        "Within the first 90 days post-launch, mobile conversion improved meaningfully and average page load time was nearly halved.",
      metrics: [
        { value: "+38%", label: "Mobile conversion lift" },
        { value: "-51%", label: "Cart abandonment" },
        { value: "1.9s → 0.9s", label: "LCP improvement" },
      ],
      image: "featuredEcommerce",
      gallery: ["portfolio1", "featuredEcommerce", "serviceFeatured1"],
      testimonial: {
        quote:
          "Nimedya didn't just deliver visuals — they built a system. Every asset coming out of the shoot served a specific channel and purpose. Our creative fatigue almost disappeared.",
        author: "Ayşe Kara",
        role: "Brand Manager, Lunessa Home",
      },
    },
    {
      slug: "atlas-clinic",
      client: "Atlas Clinic",
      sector: "Healthcare · Aesthetic Dentistry",
      duration: "12 weeks + ongoing SEO",
      year: "2024–2026",
      services: ["SEO & Content Strategy", "Web Design", "Promotional Film"],
      scope: ["Service-specific landing architecture", "Content strategy", "Technical SEO", "Brand film"],
      challenge:
        "The clinic ranked for premium treatments but most traffic was informational — appointment conversion stayed low. The existing single-page structure couldn't position different treatments as distinct marketing channels.",
      approach:
        "We architected eight treatment-specific landing pages, each enriched with before-after imagery, FAQs, and a clear treatment-journey narrative. Schema.org markup, internal linking, and page speed work formed the technical SEO layer.",
      result:
        "Within six months, organic appointment requests doubled; implant and smile-design pages drove the highest conversion.",
      metrics: [
        { value: "+112%", label: "Organic traffic growth" },
        { value: "2.3x", label: "Monthly appointment requests" },
        { value: "28%", label: "Form conversion rate" },
      ],
      image: "featuredSeoAnalytics",
      gallery: ["portfolio2", "featuredSeoAnalytics", "serviceFeatured2"],
      testimonial: {
        quote:
          "We went from scattered content to a coherent brand presence in a single project cycle. The team understood our clinical context immediately and never overcomplicated the process.",
        author: "Dr. Murat Yıldız",
        role: "Founder, Atlas Clinic",
      },
    },
    {
      slug: "mira-beauty",
      client: "Mira Beauty",
      sector: "Cosmetics · D2C",
      duration: "6-week campaign system + 90 days of production",
      year: "2025",
      services: ["Social Media Production", "Promotional Film", "Brand Identity"],
      scope: ["Seasonal campaign", "Reels & story production", "Influencer creative kit", "Performance ad creative"],
      challenge:
        "The brand was running three channels (organic social, influencer, performance ads) with a fragmented visual identity — accelerating ad fatigue and pulling ROAS down. Per-campaign shoots inflated cost.",
      approach:
        "We designed a modular campaign system that produced an entire season of channel needs in a single three-day shoot. 18 reels, 24 stills, 12 story formats, and 8 influencer briefs were derived from one visual system.",
      result:
        "Campaign ROAS closed above target; because influencer collaborations followed the same visual language as the brand kit, customer reviews started consistently mentioning 'cohesion'.",
      metrics: [
        { value: "4.7x", label: "Campaign ROAS" },
        { value: "+62%", label: "Engagement rate" },
        { value: "-34%", label: "Production cost" },
      ],
      image: "featuredSocialMedia",
      gallery: ["portfolio3", "featuredSocialMedia", "serviceFeatured1"],
      testimonial: {
        quote:
          "The ROAS numbers speak for themselves. What impressed me most was how they understood the customer before the brief was even finished.",
        author: "Elif Şahin",
        role: "Growth Director, Mira Beauty",
      },
    },
  ],
};
