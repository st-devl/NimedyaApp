export type HomeContent = {
  heroTitleA: string;
  heroTitleB: string;
  heroText: string;
  ctaA: string;
  ctaB: string;
  sectionLabel: string;
  sectionTitle: string;
  featured: string;
  refs: string;
  blog: string;
  featuredProjects: Array<{
    title: string;
    description: string;
    tag: string;
    image: "featuredEcommerce" | "featuredSeoAnalytics" | "featuredSocialMedia";
  }>;
  references: Array<{
    name: string;
    sector: string;
    summary: string;
    image: "referenceWorkspace" | "referenceOffice" | "referenceCreativeSite";
  }>;
  blogHighlights: Array<{
    title: string;
    excerpt: string;
    category: string;
    image: "blogMicroInteraction" | "blogBrandStory" | "blogPerformance";
  }>;
};

export type ServicesContent = {
  title: string;
  subtitle: string;
  services: string[];
  cta: string;
};

export type ProductPhotographyContent = {
  label: string;
  title: string;
  desc: string;
  cta: string;
  aboutTitle: string;
  processTitle: string;
  processSteps: string[];
};

export type PortfolioContent = {
  title: string;
  subtitle: string;
  categories: string[];
  projects: Array<{ title: string; description: string; image: "portfolio1" | "portfolio2" | "portfolio3" }>;
};

export type AboutContent = {
  pretitle: string;
  title: string;
  text: string;
  valuesTitle: string;
  values: Array<{ title: string; text: string }>;
  teamTitle: string;
  team: string[];
};

export type ContactContent = {
  title: string;
  text: string;
  formTitle: string;
  send: string;
  labels: {
    fullName: string;
    email: string;
    message: string;
  };
  hqTitle: string;
  city: string;
};

export type AdminDashboardContent = {
  title: string;
  subtitle: string;
  stats: {
    projects: string;
    messages: string;
    posts: string;
  };
  quickActions: string;
  systemStatus: string;
  tableTitle: string;
  tableViewAll: string;
};

export type AdminSliderContent = {
  breadcrumbAdmin: string;
  breadcrumbPage: string;
  title: string;
  subtitle: string;
  addNew: string;
  activeSliders: string;
  activeCount: string;
  formTitle: string;
  formSubtitle: string;
  previewTitle: string;
  translateButton: string;
  translating: string;
};
