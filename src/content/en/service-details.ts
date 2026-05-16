import type { ServiceDetailsContent } from "@/types/content";

export const enServiceDetailsContent: ServiceDetailsContent = [
  {
    key: "promotional-film",
    slug: "promotional-film",
    label: "Film & Brand Documentary",
    title: "Promotional Film & Brand Documentary",
    intro:
      "From 30-second social cuts to 3-minute brand films — we write, direct, and edit with distribution in mind. The same story plays on Reels, YouTube, and broadcast without recutting.",
    heroCta: "Brief Us on Your Film",
    aboutTitle: "Cinematic in craft, strategic in cut",
    aboutLead:
      "A film should not just look beautiful — it should also know where it is going to live and what decision it is asking the viewer to make.",
    aboutBody:
      "We treat film like a piece of brand architecture. Pre-production starts with the marketing context: what audience, what platform, what conversion. Direction and editing follow from there. The result is footage that earns its place in a Reels grid, a YouTube pre-roll, or a brand investor deck — without compromising on craft.",
    benefitsTitle: "What you get",
    benefits: [
      {
        title: "Distribution-Ready Edits",
        description:
          "Every project ships in multiple cuts: 60s, 30s, 15s, vertical, square, and horizontal — sized for each platform's algorithm.",
      },
      {
        title: "Story-First Direction",
        description:
          "A storyline is built around your audience's actual buying journey, not just product features. Brand recall lasts longer than awareness ads.",
      },
      {
        title: "On-Set Brand Control",
        description:
          "Brand colours, typography, and tone of voice are part of the call sheet — not corrected in post. Consistency from the first frame.",
      },
      {
        title: "Performance-Ready Variants",
        description:
          "We deliver 3–5 A/B-testable variants per concept so your performance team can iterate creative without a reshoot.",
      },
    ],
    processTitle: "Production process",
    processSteps: [
      {
        title: "Strategy & Brief",
        description:
          "Audience, distribution channels, and conversion goal mapped on day one. Reference reels and tone of voice agreed before scripting begins.",
      },
      {
        title: "Script & Storyboard",
        description:
          "Scene-by-scene shot list, voiceover script (where applicable), and a beat-board you can review before any camera moves.",
      },
      {
        title: "Production & Direction",
        description:
          "Location scouting, casting, lighting plan, and on-set direction. You approve each scene before we move on.",
      },
      {
        title: "Post & Delivery",
        description:
          "Colour grade, sound design, motion graphics, and platform-ready exports — delivered with caption files, alt versions, and thumbnails.",
      },
    ],
    deliverablesTitle: "Standard deliverables",
    deliverables: [
      "1× 60s master cut (16:9)",
      "2× 30s social cuts (9:16 + 1:1)",
      "3× 15s teaser variants for ads",
      "Branded thumbnails + captions",
      "Raw footage archive (12 months)",
      "Music + sound design licence",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        question: "How long does a brand film project take end-to-end?",
        answer:
          "From kickoff to final delivery, typical timelines are 4–6 weeks for a 60-second brand film and 8–10 weeks for a 3-minute documentary, including approvals.",
      },
      {
        question: "Do you work with our existing scripts or write from scratch?",
        answer:
          "Both. We can refine an existing script or write from scratch based on the brief. Strategy and scripting are billed transparently as part of pre-production.",
      },
      {
        question: "Can we use the footage for performance ads later?",
        answer:
          "Yes — we always shoot with multi-platform reuse in mind, and we deliver raw footage and project files so you can extract additional cuts for 12 months.",
      },
    ],
    ctaTitle: "Have a story worth filming?",
    ctaSubtitle:
      "Send us a brief — even a paragraph is enough. We will respond with a treatment direction and a realistic production timeline within 48 hours.",
    ctaButton: "Start a Film Brief",
    image: "portfolio2",
  },
  {
    key: "web-design",
    slug: "web-design",
    label: "Web & E-Commerce",
    title: "Web Design & E-Commerce Development",
    intro:
      "Mobile-first, conversion-focused builds on Next.js and modern headless stacks. We go from wireframe to live launch — including technical SEO, performance, and CMS handover.",
    heroCta: "Get a Web Proposal",
    aboutTitle: "Design that converts, code that scales",
    aboutLead:
      "Beautiful sites are common. Sites that load fast, convert reliably, and stay maintainable for two years — those are rarer.",
    aboutBody:
      "We approach every build as a product, not a project. That means treating conversion rate, page speed, and editorial flexibility as first-class design constraints — not afterthoughts. Our default stack is Next.js with a headless CMS, but we choose based on your team and growth path, not on framework preference.",
    benefitsTitle: "What you get",
    benefits: [
      {
        title: "Mobile-First, Performance-First",
        description:
          "We design for the 70–80% of traffic that arrives on mobile, and we hit Core Web Vitals targets before we hand over the codebase.",
      },
      {
        title: "Conversion-Centred Architecture",
        description:
          "Information architecture is mapped against your conversion funnel. Every section earns its place by moving a visitor toward a decision.",
      },
      {
        title: "CMS Your Team Can Actually Use",
        description:
          "Editors get a structured, no-surprises admin: previews, role-based access, and content models designed around real-world editorial flows.",
      },
      {
        title: "Built for Search From Day One",
        description:
          "Schema markup, technical SEO, multilingual routing, sitemap automation, and canonical strategy — included, not upsold.",
      },
    ],
    processTitle: "Build process",
    processSteps: [
      {
        title: "Discovery & Audit",
        description:
          "We audit the current site (if any), analytics, and competitive benchmarks. Conversion gaps and SEO opportunities are documented before design begins.",
      },
      {
        title: "Information Architecture",
        description:
          "Sitemap, content models, and key flows mapped. We agree on what the site needs to do — and what it doesn't need to do — before drawing pixels.",
      },
      {
        title: "Design System & UI",
        description:
          "Tokens, components, and responsive layouts in Figma. Built mobile-first, validated against accessibility (WCAG AA) and performance budgets.",
      },
      {
        title: "Development & QA",
        description:
          "Component-driven implementation in Next.js. Performance budgets enforced in CI. Cross-browser and cross-device QA before launch.",
      },
      {
        title: "Launch & Handover",
        description:
          "DNS, analytics, search console, CMS training, and a 30-day post-launch support window. You own the codebase.",
      },
    ],
    deliverablesTitle: "Standard deliverables",
    deliverables: [
      "Full Figma design system + library",
      "Production codebase (Next.js + CMS)",
      "Technical SEO setup + sitemap automation",
      "Performance score 90+ on Lighthouse mobile",
      "Editor training + recorded walkthroughs",
      "30-day post-launch warranty",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        question: "How long does a typical website project take?",
        answer:
          "A marketing site usually takes 6–10 weeks from kickoff. A full e-commerce build with custom integrations is typically 10–16 weeks. We commit to a delivery date after the discovery phase, not before.",
      },
      {
        question: "Do you migrate content from our old site?",
        answer:
          "Yes — migration is a standard part of the project. We map URLs, set up 301 redirects, and preserve SEO equity from the legacy site.",
      },
      {
        question: "What does ongoing support look like after launch?",
        answer:
          "We offer a 30-day warranty included with every project. Beyond that, we offer monthly retainers for content updates, performance monitoring, and iterative improvements.",
      },
    ],
    ctaTitle: "Ready to rebuild your web presence?",
    ctaSubtitle:
      "Tell us about your current site and what's not working. We will reply with a discovery proposal and a realistic timeline within 48 hours.",
    ctaButton: "Request a Web Proposal",
    image: "featuredEcommerce",
  },
  {
    key: "brand-identity",
    slug: "brand-identity",
    label: "Brand Identity",
    title: "Brand Identity & Logo System",
    intro:
      "Logo, colour palette, typography, and application rules — delivered as a living brand guideline your team can actually use. Designed to stay consistent across digital, print, and environmental.",
    heroCta: "Start a Brand Project",
    aboutTitle: "An identity that earns recognition",
    aboutLead:
      "A logo is a starting point. A brand system is what your audience actually remembers six months later.",
    aboutBody:
      "We build identity systems that flex without breaking. From the primary mark to packaging, social grids, signage, and motion — every touchpoint is designed in advance, not improvised after launch. The result: a brand your team can roll out without calling us every time a new format appears.",
    benefitsTitle: "What you get",
    benefits: [
      {
        title: "Strategic Brand Foundation",
        description:
          "Positioning, audience archetype, brand personality, and tone of voice — documented before a single visual decision is made.",
      },
      {
        title: "Flexible Visual System",
        description:
          "Primary, secondary, and responsive logo variants. Colour systems that work in print and on screen. Typography hierarchies built for digital and physical use.",
      },
      {
        title: "Living Brand Guidelines",
        description:
          "Delivered as a Notion or Figma workspace — searchable, editable, and continuously updatable as your brand evolves.",
      },
      {
        title: "Production-Ready Templates",
        description:
          "Editable Figma + Canva templates for social, presentations, and key marketing collateral. Your team launches faster without compromising consistency.",
      },
    ],
    processTitle: "Brand process",
    processSteps: [
      {
        title: "Strategy Workshop",
        description:
          "We run a half-day workshop with key stakeholders to align on positioning, audience, and competitive landscape. Outputs feed every downstream decision.",
      },
      {
        title: "Concept Direction",
        description:
          "Three distinct visual directions presented, each tied back to the strategic foundation. We refine the chosen direction in two iteration rounds.",
      },
      {
        title: "System Build",
        description:
          "Logo system, colour palette, typography, iconography, imagery direction, and motion guidelines designed as a single integrated system.",
      },
      {
        title: "Application & Mockups",
        description:
          "Real-world applications: digital ads, packaging, social grids, website hero, signage. We see the brand in context before sign-off.",
      },
      {
        title: "Documentation & Handover",
        description:
          "Living brand guidelines (Notion + Figma), source files, and a 60-minute team training session.",
      },
    ],
    deliverablesTitle: "Standard deliverables",
    deliverables: [
      "Logo system (primary + variants + favicon set)",
      "Colour palette + accessibility-tested combinations",
      "Typography system (digital + print)",
      "Brand guidelines (Notion + Figma)",
      "Editable Figma & Canva templates",
      "Application mockups (5+ scenarios)",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        question: "How long does a brand identity project take?",
        answer:
          "A focused brand identity project takes 6–8 weeks from strategy workshop to final handover. A full rebrand including web and packaging is typically 10–14 weeks.",
      },
      {
        question: "Can you refresh our existing brand instead of starting from scratch?",
        answer:
          "Yes — brand refreshes are about 60% of our identity work. We audit what's working, identify what's holding you back, and evolve rather than restart.",
      },
      {
        question: "Do you trademark the logo for us?",
        answer:
          "We do not handle trademark registration directly, but we deliver files in formats your IP lawyer will need and can recommend trusted partners in Turkey.",
      },
    ],
    ctaTitle: "Time to build the brand you deserve?",
    ctaSubtitle:
      "Send us your positioning, your current materials, and what you wish your brand could do. We'll reply with a strategy direction within 48 hours.",
    ctaButton: "Start a Brand Project",
    image: "serviceFeatured2",
  },
  {
    key: "social-media",
    slug: "social-media",
    label: "Social Content Production",
    title: "Social Media Content Production",
    intro:
      "Monthly or seasonal content production planned to your channel mix. Reels, stories, static posts, and ad creative — produced in one shoot, distributed across every format.",
    heroCta: "Plan a Content System",
    aboutTitle: "One shoot, a full content calendar",
    aboutLead:
      "Most brands shoot reactively, format by format, and burn out their teams. We design a system that produces a quarter of content in a single planned production cycle.",
    aboutBody:
      "Our social production model is built around modular shoot days: every hour on set generates assets for multiple platforms and formats simultaneously. Influencer briefs, organic posts, and paid ad creative all derive from a single visual system — so brand consistency stays high and per-asset cost stays low.",
    benefitsTitle: "What you get",
    benefits: [
      {
        title: "Multi-Format Production",
        description:
          "Each shoot day yields vertical Reels, square posts, story formats, and ad-ready cuts — sized and exported for every channel you need.",
      },
      {
        title: "Editorial Calendar Integration",
        description:
          "Content is planned against your campaign calendar, product launches, and seasonal peaks — not produced in isolation and shelved.",
      },
      {
        title: "Influencer-Ready Kits",
        description:
          "When you collaborate with influencers, we deliver brand kits and shot lists so their content arrives looking like part of your brand, not next to it.",
      },
      {
        title: "Performance Feedback Loop",
        description:
          "We review what performed (saves, shares, conversions) at the end of each cycle and feed those insights into the next shoot plan.",
      },
    ],
    processTitle: "Content cycle",
    processSteps: [
      {
        title: "Quarterly Planning",
        description:
          "We map your campaigns, launches, and content pillars across a 3-month calendar. Every shoot day has a clear purpose before it's booked.",
      },
      {
        title: "Shoot Day Production",
        description:
          "1–3 day shoot blocks producing a full quarter of content. Locations, talent, styling, and brand toolkits prepared in advance.",
      },
      {
        title: "Edit & Format Variants",
        description:
          "Each asset edited into platform-specific variants. Captions, hooks, and CTAs written and tested per channel.",
      },
      {
        title: "Schedule & Distribute",
        description:
          "Content scheduled in your tool of choice (Later, Planoly, in-house), with platform-specific best practices applied to each post.",
      },
      {
        title: "Performance Review",
        description:
          "Monthly performance review against KPIs. Top-performing creative is iterated, low-performing formats are paused.",
      },
    ],
    deliverablesTitle: "Per quarter you get",
    deliverables: [
      "12–18 short-form videos (Reels / TikTok)",
      "24–36 static posts in brand grid",
      "Story templates + animated highlight covers",
      "5–8 performance ad variants",
      "Influencer brand kit (PDF + assets)",
      "Monthly performance report",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        question: "Do we need to commit to a full quarter?",
        answer:
          "We work in quarterly cycles because it produces the lowest per-asset cost. We do offer one-off project rates for specific campaigns or launches.",
      },
      {
        question: "Who handles publishing and community management?",
        answer:
          "We produce and schedule content. Community management (replies, DMs) stays with your team — we can document tone-of-voice guidelines to support that.",
      },
      {
        question: "Can you work with our existing creators?",
        answer:
          "Yes — we frequently produce brand kits and shot lists for in-house creators or agency-of-record influencers, so production stays consistent.",
      },
    ],
    ctaTitle: "Tired of reactive content?",
    ctaSubtitle:
      "Tell us about your current channel mix and content team. We'll come back with a quarterly content plan proposal within 48 hours.",
    ctaButton: "Plan Your Content System",
    image: "featuredSocialMedia",
  },
  {
    key: "seo-content",
    slug: "seo-content",
    label: "SEO & Content Strategy",
    title: "SEO & Content Strategy",
    intro:
      "Technical SEO, keyword architecture, and landing page production mapped to your conversion funnel. We build content that attracts the right traffic and moves it toward a decision.",
    heroCta: "Get an SEO Audit",
    aboutTitle: "SEO that respects intent, content that converts",
    aboutLead:
      "Traffic is easy. Traffic that converts is the actual product.",
    aboutBody:
      "Most SEO work optimises for ranking and stops there. We start by mapping your funnel and working backwards: what queries does an in-market buyer use, what does the landing page have to prove, and what's the next step. Content production follows the strategy — not the other way around.",
    benefitsTitle: "What you get",
    benefits: [
      {
        title: "Technical SEO Foundation",
        description:
          "Core Web Vitals, schema markup, internal linking, sitemap automation, and crawl efficiency — fixed once, monitored continuously.",
      },
      {
        title: "Intent-Driven Keyword Strategy",
        description:
          "Keywords clustered by funnel stage (informational, commercial, transactional) so each piece of content has a single, clear job.",
      },
      {
        title: "Conversion-Tuned Landing Pages",
        description:
          "Each high-intent page is designed to rank AND convert — with on-page elements (FAQ schema, internal CTAs, trust signals) that move the visitor.",
      },
      {
        title: "Content That Scales Slowly On Purpose",
        description:
          "We publish quality, not volume. A focused 6–10 article roadmap per quarter outperforms 30 thin pieces, and you can defend it editorially.",
      },
    ],
    processTitle: "SEO engagement",
    processSteps: [
      {
        title: "Audit & Benchmark",
        description:
          "Technical audit (crawl, speed, schema, indexability), keyword opportunity mapping, and competitive landscape analysis in the first 2 weeks.",
      },
      {
        title: "Strategy & Roadmap",
        description:
          "Content architecture, landing page priorities, and a 90-day editorial roadmap presented and aligned with your team.",
      },
      {
        title: "Technical Implementation",
        description:
          "Core Web Vitals, schema, internal linking, and any structural fixes shipped to production. Performance baseline locked in.",
      },
      {
        title: "Content Production",
        description:
          "Briefs, drafts, editing, and publishing — coordinated with your subject-matter experts where needed.",
      },
      {
        title: "Measure & Iterate",
        description:
          "Monthly reporting against agreed KPIs (rankings, organic conversions, page-level performance). Strategy adjusted quarterly.",
      },
    ],
    deliverablesTitle: "Engagement deliverables",
    deliverables: [
      "Technical SEO audit (50+ pages)",
      "Keyword + content roadmap (Notion)",
      "8–12 landing pages or articles per quarter",
      "Schema markup + technical fixes",
      "Monthly performance dashboard",
      "Quarterly strategy review",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        question: "How long until we see results?",
        answer:
          "Technical wins (page speed, indexability) show up within 4–8 weeks. Content-driven ranking improvements typically take 3–6 months — sustainable SEO is a compounding game.",
      },
      {
        question: "Do you write the content or just brief it?",
        answer:
          "Both options are available. We have an in-house editorial team and also partner with your SMEs when domain expertise matters more than writing speed.",
      },
      {
        question: "How do you handle Google algorithm updates?",
        answer:
          "We track each core update and adjust strategy reactively when needed — but our editorial standards are designed to survive updates, not chase them.",
      },
    ],
    ctaTitle: "Want SEO that respects your funnel?",
    ctaSubtitle:
      "Share your current organic performance and what you're trying to grow. We'll respond with an audit scope and roadmap proposal within 48 hours.",
    ctaButton: "Request an SEO Audit",
    image: "featuredSeoAnalytics",
  },
];
