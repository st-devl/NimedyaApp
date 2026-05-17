export type HomeStat = { value: string; label: string };

export type HomeTestimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
};

export type HomeBrand = {
  name: string;
  sector: string;
  description?: string;
  imageUrl?: string;
};

export type HomeContent = {
  heroTitleA: string;
  heroTitleB: string;
  heroText: string;
  ctaA: string;
  ctaB: string;
  sectionLabel: string;
  sectionTitle: string;
  statsTitle: string;
  stats: HomeStat[];
  featured: string;
  refs: string;
  testimonialsTitle: string;
  testimonials: HomeTestimonial[];
  brandsTitle: string;
  brandsHeading?: string;
  brandsSub?: string;
  brands: HomeBrand[];
  featuredProjects: Array<{
    title: string;
    description: string;
    tag: string;
    image: string;
    metric?: string;
  }>;
  references: Array<{
    name: string;
    sector: string;
    summary: string;
    image: string;
  }>;
};

export type ServicesContent = {
  title: string;
  subtitle: string;
  services: Array<{ title: string; description: string }>;
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

export type ServiceDetailKey =
  | "promotional-film"
  | "web-design"
  | "brand-identity"
  | "social-media"
  | "seo-content";

export type ServiceDetailBenefit = { title: string; description: string };
export type ServiceDetailProcessStep = { title: string; description: string };
export type ServiceDetailFaq = { question: string; answer: string };

export type ServiceDetailContent = {
  key: ServiceDetailKey;
  slug: string;
  label: string;
  title: string;
  intro: string;
  heroCta: string;
  aboutTitle: string;
  aboutLead: string;
  aboutBody: string;
  benefitsTitle: string;
  benefits: ServiceDetailBenefit[];
  processTitle: string;
  processSteps: ServiceDetailProcessStep[];
  deliverablesTitle: string;
  deliverables: string[];
  faqTitle: string;
  faq: ServiceDetailFaq[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  image: string;
};

export type ServiceDetailsContent = ServiceDetailContent[];

export type CaseStudyMetric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  duration: string;
  year?: string;
  scope: string[];
  challenge: string;
  approach: string;
  result: string;
  metrics: CaseStudyMetric[];
  image: string;
  gallery?: string[];
  services?: string[];
  testimonial?: { quote: string; author: string; role?: string };
};

export type PortfolioContent = {
  title: string;
  subtitle: string;
  categories: string[];
  projects: Array<{ title: string; description: string; image: string; category?: string }>;
  caseStudiesTitle?: string;
  caseStudiesSubtitle?: string;
  caseStudies?: CaseStudy[];
};

export type AboutTeamMember = {
  name: string;
  role: string;
  bio: string;
  link?: string;
};

export type AboutDifferentiator = {
  title: string;
  description: string;
};

export type AboutContent = {
  pretitle: string;
  title: string;
  text: string;
  positioningTitle: string;
  positioning: string;
  differentiatorsTitle: string;
  differentiators: AboutDifferentiator[];
  valuesTitle: string;
  values: Array<{ title: string; text: string }>;
  teamTitle: string;
  team: AboutTeamMember[];
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
    publishedHint: string;
    newMessageHint: string;
    mediaFilesHint: string;
  };
  actions: {
    addContent: string;
    editContent: string;
    uploadMedia: string;
    editSeo: string;
  };
  table: {
    sectionTitle: string;
    viewAll: string;
    colTitle: string;
    colType: string;
    colDate: string;
    colStatus: string;
  };
  statusLabels: {
    published: string;
    draft: string;
    new: string;
    read: string;
    archived: string;
  };
  quickActions: string;
  systemStatus: string;
  system: {
    api: string;
    database: string;
    online: string;
    offline: string;
  };
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

export type ServiceCard = {
  title: string;
  description: string;
  imageUrl: string;
  cta: string;
};

export type HomeServicesContent = {
  sectionLabel: string;
  sectionTitle: string;
  services: [ServiceCard, ServiceCard, ServiceCard, ServiceCard];
};

export type HowWeWorkStep = {
  number: string;
  title: string;
  description: string;
};

export type HowWeWorkContent = {
  pretitle: string;
  title: string;
  subtitle: string;
  steps: HowWeWorkStep[];
  ctaLabel: string;
};
