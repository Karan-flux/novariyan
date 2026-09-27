
export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceSectionItem {
  title: string;
  detail: string;
}

export interface ServiceSectionBlock {
  label: string;
  title: string;
  description: string;
  items: ServiceSectionItem[];
}

export type ServiceIconName =
  | 'code'
  | 'layout'
  | 'shopping-bag'
  | 'box'
  | 'search'
  | 'shield';

export interface ServiceProcessStep {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  iconName: ServiceIconName;
  deliverables: string[];
  technologies: string[];
  problemStatement: {
    headline: string;
    description: string;
    painPoints: string[];
  };
  solutionStatement: {
    headline: string;
    description: string;
    outcomes: string[];
  };
  specializedSections: ServiceSectionBlock[];
  processSummary: ServiceProcessStep[];
  faqs: ServiceFAQ[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    number: '01',
    slug: 'web-development',
    title: 'Web Development',
    shortTitle: 'Web Development',
    shortDescription:
      'Custom, performant, and scalable web architectures engineered with modern frameworks and clean code.',
    heroHeadline:
      'ENGINEERING HIGH-PERFORMANCE WEB ARCHITECTURES.',
    heroSubheadline:
      'We build bespoke, resilient websites and web applications using React, TypeScript, and modern infrastructure—designed for speed, longevity, maintainability, and conversion.',
    iconName: 'code',
    deliverables: [
      'Custom Frontend & Full-Stack Architecture',
      'Headless CMS Integration & Content Modeling',
      'API Integrations & Custom Business Logic',
      'Core Web Vitals & Load Performance Optimization',
      'WCAG 2.2 AA-Targeted Accessibility & Cross-Browser QA',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'GraphQL / REST',
    ],
    problemStatement: {
      headline:
        'Why off-the-shelf templates can hold ambitious companies back.',
      description:
        'Bloated page builders and rigid templates can introduce sluggish load times, fragile plugin dependencies, and generic layouts that weaken brand perception.',
      painPoints: [
        'Slow mobile performance that can affect search visibility and visitor retention',
        'Rigid templates that cannot adapt to custom brand storytelling or product flows',
        'Fragile third-party plugins that can break during routine updates',
        'Inconsistent rendering across modern desktop, tablet, and mobile viewports',
      ],
    },
    solutionStatement: {
      headline:
        'Purpose-built code tailored to your business objectives.',
      description:
        'Novariyan engineers websites from clean, modular TypeScript components—giving your team a maintainable digital foundation with performance and security considered throughout the build.',
      outcomes: [
        'Responsive page transitions and optimized asset delivery',
        'Modular component architecture built to evolve as your company grows',
        'Semantic HTML5 structure designed for search engines and assistive technologies',
        'Structured CMS workflows so your marketing team can publish without unnecessary developer bottlenecks',
      ],
    },
    specializedSections: [
      {
        label: 'CORE FEATURES',
        title:
          'ENGINEERED FOR RELIABILITY & SCALE',
        description:
          'Every line of code is written with performance budgets, type safety, and long-term maintainability in mind.',
        items: [
          {
            title: 'Component-Driven Architecture',
            detail:
              'Reusable, strictly typed UI primitives ensure visual consistency across every route and future landing page.',
          },
          {
            title: 'Performance-First Asset Pipeline',
            detail:
              'Code splitting, lazy loading, modern image formats, and efficient JavaScript delivery help control loading and interaction costs.',
          },
          {
            title: 'Headless CMS Freedom',
            detail:
              'Structured content schemas allow non-technical editors to update copy, case studies, and articles safely.',
          },
          {
            title: 'Security & Edge Deployment',
            detail:
              'Modern deployment architecture with SSL, security headers, and automated CI/CD pipelines where the hosting environment supports them.',
          },
        ],
      },
    ],
    processSummary: [
      {
        step: '01',
        title: 'Technical Discovery & Architecture',
        detail:
          'Defining stack requirements, data models, integration endpoints, and measurable performance targets.',
      },
      {
        step: '02',
        title: 'Component & System Engineering',
        detail:
          'Developing responsive layouts, interactive states, and clean CMS schemas in TypeScript.',
      },
      {
        step: '03',
        title: 'Performance Tuning & QA',
        detail:
          'Auditing Core Web Vitals, keyboard accessibility, device responsiveness, and SEO metadata.',
      },
      {
        step: '04',
        title: 'Deployment & Handover',
        detail:
          'Launching through a controlled deployment process with documentation and post-launch verification.',
      },
    ],
    faqs: [
      {
        question:
          'Do you use WordPress templates or custom code?',
        answer:
          'We specialize in custom-engineered websites using modern frameworks like React, Next.js, and TypeScript, paired with headless CMS platforms when content management is required.',
      },
      {
        question:
          'Will my team be able to edit text and images after launch?',
        answer:
          'Yes. We structure content cleanly so your team can update copy, portfolio items, and blog posts without touching application code when a CMS is part of the project scope.',
      },
      {
        question:
          'How long does a typical custom web development project take?',
        answer:
          'Timeline depends on scope, integrations, content readiness, and custom interactive features. During discovery, we provide a milestone schedule based on the agreed project requirements.',
      },
    ],
  },

  {
    id: 'web-design',
    number: '02',
    slug: 'web-design',
    title: 'Web Design',
    shortTitle: 'Web Design',
    shortDescription:
      'Editorial, conversion-focused digital design systems that make your brand unmistakable.',
    heroHeadline:
      'EDITORIAL DESIGN SYSTEMS WITH COMMERCIAL CLARITY.',
    heroSubheadline:
      'We combine architectural typography, intentional whitespace, and intuitive user journeys to turn first impressions into clear brand differentiation and commercial action.',
    iconName: 'layout',
    deliverables: [
      'Digital Art Direction & Visual Identity Extension',
      'Information Architecture & UX Wireframing',
      'Bespoke Typography & Grid Systems',
      'Interactive Figma Prototypes & Motion Direction',
      'Multi-Breakpoint Responsive Design Specifications',
    ],
    technologies: [
      'Figma',
      'Design Tokens',
      'Editorial Grid Systems',
      'Interactive Prototyping',
      'WCAG Contrast Systems',
    ],
    problemStatement: {
      headline:
        'When every competitor uses the same SaaS layout, differentiation becomes harder.',
      description:
        'Many websites rely on predictable layouts and generic stock visuals that fail to communicate the true caliber of the business behind them.',
      painPoints: [
        'Visual identity that feels disconnected from the quality of the actual product or service',
        'Cluttered pages where competing calls-to-action can confuse prospective clients',
        'Weak typographic hierarchy that forces visitors to hunt for key information',
        'Mobile layouts that feel like cramped afterthoughts rather than intentional experiences',
      ],
    },
    solutionStatement: {
      headline:
        'Intentional design where every pixel serves perception and conversion.',
      description:
        'We craft bespoke visual systems anchored by strong typography, balanced asymmetry, and clear narrative pacing.',
      outcomes: [
        'A distinctive visual system designed to communicate authority from the first interaction',
        'Cohesive design tokens covering typography, spacing, borders, and dark/light surfaces',
        'Guided narrative flow that leads visitors naturally toward booking or enquiry',
        'Dedicated layouts crafted specifically for desktop, tablet, and mobile viewports',
      ],
    },
    specializedSections: [
      {
        label: 'DESIGN PHILOSOPHY',
        title:
          'ARCHITECTURAL RESTRAINT OVER VISUAL NOISE',
        description:
          'We believe luxury and authority come from clarity, proportion, and restraint—never from excessive decoration.',
        items: [
          {
            title: 'UX Process & Narrative Pacing',
            detail:
              'We map user intent before drawing a single frame—structuring pages from proposition to capability, proof, and action.',
          },
          {
            title: 'Scalable Design Systems',
            detail:
              'Every project includes a documented system of type scales, grid columns, button states, and form patterns.',
          },
          {
            title: 'Intentional Responsive Design',
            detail:
              'Rather than merely shrinking desktop screens, we re-compose spacing, navigation, and touch targets for mobile ergonomics.',
          },
          {
            title: 'Motion as Communication',
            detail:
              'Subtle transitions and hover micro-interactions guide attention and provide tactile feedback without unnecessarily slowing the user experience.',
          },
        ],
      },
    ],
    processSummary: [
      {
        step: '01',
        title: 'Brand & Visual Direction',
        detail:
          'Establishing moodboards, typographic pairings, monochrome/accent ratios, and grid rules.',
      },
      {
        step: '02',
        title: 'UX Architecture & Wireframes',
        detail:
          'Structuring page hierarchy, navigation flows, and conversion checkpoints.',
      },
      {
        step: '03',
        title: 'High-Fidelity Interface Design',
        detail:
          'Crafting desktop and mobile screens with real copy structure and interactive states.',
      },
      {
        step: '04',
        title: 'Design System & Engineering Sync',
        detail:
          'Translating design tokens directly into production CSS and React components.',
      },
    ],
    faqs: [
      {
        question:
          'Can you work with our existing brand guidelines?',
        answer:
          'Absolutely. We can either extend your existing brand identity into a comprehensive web design system or establish a fresh digital art direction from scratch.',
      },
      {
        question:
          'Do you design for mobile devices separately?',
        answer:
          'Yes. Every key template is designed across desktop, tablet, and mobile viewports to ensure effortless readability and touch usability.',
      },
    ],
  },

  {
    id: 'ecommerce',
    number: '03',
    slug: 'ecommerce',
    title: 'E-Commerce',
    shortTitle: 'E-Commerce',
    shortDescription:
      'Distinctive online flagships engineered for tactile product presentation and intuitive catalog browsing.',
    heroHeadline:
      'DIGITAL FLAGSHIPS BUILT FOR MODERN COMMERCE.',
    heroSubheadline:
      'We design and develop bespoke e-commerce storefronts that elevate product presentation and make catalog browsing effortless across modern devices.',
    iconName: 'shopping-bag',
    deliverables: [
      'Custom Storefront Design & Development',
      'High-Conversion Product Detail Pages (PDP)',
      'Product Variant Selection & Catalog Navigation',
      'Catalog Architecture, Filtering & Search',
      'Inventory CMS Integration',
    ],
    technologies: [
      'Shopify Headless / Hydrogen',
      'Next.js Commerce',
      'React',
      'Tailwind CSS',
    ],
    problemStatement: {
      headline:
        'Standard store themes can commoditize premium products.',
      description:
        'When your storefront looks identical to thousands of other shops, customers may judge you primarily on price rather than craftsmanship and brand value.',
      painPoints: [
        'Clunky product galleries and slow variant selectors that can cause mobile drop-off',
        'Difficult product discovery across large or complex catalogs',
        'Heavy third-party tracking and app scripts that can reduce mobile page speed',
        'Limited editorial storytelling space on product and collection pages',
      ],
    },
    solutionStatement: {
      headline:
        'Tactile product storytelling paired with effortless discovery.',
      description:
        'We combine luxury editorial presentation with clear product information so customers can explore a catalog with confidence.',
      outcomes: [
        'Responsive collection filtering and efficient variant selection',
        'Editorial product pages that weave specifications, materials, and social proof together',
        'Mobile-first catalog browsing and precise product variant selection',
        'Structured inventory management integrations for your operations team',
      ],
    },
    specializedSections: [
      {
        label: 'COMMERCE ARCHITECTURE',
        title:
          'EVERY STAGE OF PRODUCT DISCOVERY, REFINED',
        description:
          'From the first collection scroll to detailed product information, we create a clear and considered browsing experience.',
        items: [
          {
            title:
              'Store Experience & Collection Curation',
            detail:
              'Asymmetric lookbooks and fast multi-attribute filtering help shoppers discover the right product without unnecessary cognitive overload.',
          },
          {
            title:
              'Product UX & Variant Precision',
            detail:
              'High-resolution media zoom, clear sizing and specification tables, and intuitive product variant controls support confident product evaluation.',
          },
          {
            title:
              'CMS & Commercial Performance',
            detail:
              'Structured merchandising controls and efficient page delivery help protect advertising efficiency and organic search visibility.',
          },
        ],
      },
    ],
    processSummary: [
      {
        step: '01',
        title: 'Catalog & Conversion Audit',
        detail:
          'Mapping product taxonomy, customer questions, and catalog navigation requirements.',
      },
      {
        step: '02',
        title: 'Storefront & PDP UX Design',
        detail:
          'Designing collection grids, product storytelling modules, and mobile catalog browsing.',
      },
      {
        step: '03',
        title: 'Commerce Engineering',
        detail:
          'Building the frontend storefront, product variant interactions, and CMS synchronization.',
      },
      {
        step: '04',
        title: 'Load Testing & Launch',
        detail:
          'Verifying catalog performance, mobile usability, and analytics attribution before launch.',
      },
    ],
    faqs: [
      {
        question:
          'Which e-commerce platforms do you work with?',
        answer:
          'We build custom headless storefronts connected to platforms such as Shopify and bespoke commerce frontends tailored to your catalog size and operational requirements.',
      },
      {
        question:
          'Can you migrate our existing product catalog?',
        answer:
          'Yes. We can handle structured product data migration and URL redirect mapping so you can preserve important search visibility during a redesign or platform migration.',
      },
    ],
  },

  {
    id: '3d-interactive',
    number: '04',
    slug: '3d-interactive',
    title: '3D & Interactive',
    shortTitle: '3D & Interactive',
    shortDescription:
      'Sophisticated WebGL, Three.js, and spatial web experiences that bring products and concepts to life.',
    heroHeadline:
      'SPATIAL WEBGL & INTERACTIVE STORYTELLING.',
    heroSubheadline:
      'We engineer tasteful, hardware-accelerated 3D visuals and interactive product viewports using Three.js and React Three Fiber—balancing visual impact with performance and usability.',
    iconName: 'box',
    deliverables: [
      'Custom Three.js & React Three Fiber Scenes',
      'Interactive 3D Product Viewers & Configurators',
      'Scroll-Linked Spatial Storytelling',
      'Custom PBR Materials & Studio Lighting Setups',
      'Graceful Low-Power & Mobile Fallbacks',
    ],
    technologies: [
      'Three.js',
      'React Three Fiber',
      'Drei',
      'WebGL',
      'GLSL Shaders',
      'Motion',
    ],
    problemStatement: {
      headline:
        'Flat images cannot always explain spatial products or technical depth.',
      description:
        'Yet poorly optimized 3D websites can suffer from long loading times, excessive GPU usage, and gimmicky effects that distract from the message.',
      painPoints: [
        'Static photography that fails to communicate physical form, finish, or spatial architecture',
        'Heavy, unoptimized WebGL canvases that can affect scrolling on laptops and phones',
        'Flashy effects that obscure navigation and reduce conversion clarity',
        'Lack of accessibility support for users who prefer reduced motion',
      ],
    },
    solutionStatement: {
      headline:
        'Restrained, studio-lit 3D integrated seamlessly into semantic HTML.',
      description:
        'We treat 3D as an editorial focal anchor—pairing physically based materials and smooth interaction with crisp DOM typography and deliberate performance budgets.',
      outcomes: [
        'Interactive 3D objects that can respond to cursor parallax, drag, and scroll',
        'Semantic HTML text overlays that remain selectable, accessible, and search-engine readable',
        'Device capability detection with simplified or static fallback visuals when appropriate',
        'Reduced-motion behavior designed around user accessibility preferences',
      ],
    },
    specializedSections: [
      {
        label: 'SPATIAL ENGINEERING',
        title:
          'WEBGL CRAFTED WITH DISCIPLINE & PERFORMANCE',
        description:
          'Every 3D scene is engineered with loading behavior, device constraints, and the core brand narrative in mind.',
        items: [
          {
            title:
              'Interactive 3D Product & Brand Objects',
            detail:
              'Allow visitors to inspect architectural forms, hardware products, or sculptural brand marks from multiple angles.',
          },
          {
            title:
              'Scroll-Choreographed Storytelling',
            detail:
              'Synchronize camera movement, lighting shifts, and exploded views with natural page scrolling.',
          },
          {
            title:
              'Three-Point Studio Lighting & PBR Shaders',
            detail:
              'Calibrated key, fill, and rim lighting over brushed metal, matte obsidian, and architectural glass materials.',
          },
          {
            title:
              'Performance Budgets & Fallbacks',
            detail:
              'Compressed geometries, controlled rendering, WebGL error handling, and mobile fallback strategies help keep the experience resilient.',
          },
        ],
      },
    ],
    processSummary: [
      {
        step: '01',
        title:
          'Spatial Concept & Storyboarding',
        detail:
          'Defining how 3D interaction supports the product story without blocking usability.',
      },
      {
        step: '02',
        title:
          'Geometry & Material Look-Dev',
        detail:
          'Crafting optimized forms, studio lighting rigs, and metallic/matte material treatments.',
      },
      {
        step: '03',
        title:
          'React Three Fiber Integration',
        detail:
          'Connecting 3D scenes with DOM scroll, cursor interaction, and interactive UI controls.',
      },
      {
        step: '04',
        title:
          'Performance & Device Profiling',
        detail:
          'Benchmarking GPU usage, mobile performance, loading behavior, and reduced-motion accessibility.',
      },
    ],
    faqs: [
      {
        question:
          'Will 3D graphics slow down my website on mobile phones?',
        answer:
          'We design 3D experiences around device constraints using lightweight geometry, optimized assets, controlled rendering, and fallback visuals. Final performance depends on scene complexity, assets, device hardware, browser behavior, network conditions, and hosting infrastructure.',
      },
      {
        question:
          'Does a 3D website hurt SEO?',
        answer:
          'Not inherently. When architected properly, headings, body copy, navigation, and other important content can remain in semantic HTML DOM layers around the WebGL experience, keeping the core information accessible to search engines and users.',
      },
    ],
  },

  {
    id: 'seo',
    number: '05',
    slug: 'seo',
    title: 'SEO Optimization',
    shortTitle: 'SEO Optimization',
    shortDescription:
      'Technical SEO architecture, semantic HTML, Core Web Vitals optimization, and structured schema.',
    heroHeadline:
      'TECHNICAL SEO ENGINEERED INTO THE CODEBASE.',
    heroSubheadline:
      'Search visibility is not an afterthought plugin. We build clean semantic markup, strong technical foundations, and structured data directly into your website architecture.',
    iconName: 'search',
    deliverables: [
      'Comprehensive Technical SEO Audit & Remediation',
      'Semantic HTML5 Heading & Landmark Architecture',
      'Schema.org JSON-LD Structured Data Implementation',
      'Core Web Vitals (LCP, INP, CLS) Optimization',
      'Canonical URL, Sitemap & Robots Configuration',
    ],
    technologies: [
      'Schema.org JSON-LD',
      'Semantic HTML5',
      'Core Web Vitals',
      'OpenGraph Protocol',
      'Google Search Console',
    ],
    problemStatement: {
      headline:
        'Beautiful websites can struggle if qualified buyers cannot find them.',
      description:
        'Many visually impressive agency websites hide content inside non-semantic structures, ship unoptimized scripts, and neglect metadata hierarchy.',
      painPoints: [
        'Poor Core Web Vitals scores that can affect organic search performance',
        'Missing or duplicate meta titles, descriptions, and canonical tags across routes',
        'Broken heading hierarchy that can make content structure harder to understand',
        'Lack of structured JSON-LD schema for services, articles, and organization entities',
      ],
    },
    solutionStatement: {
      headline:
        'Search-ready engineering designed for long-term organic growth.',
      description:
        'We align code quality, site speed, information architecture, and on-page semantics with how modern search engines crawl and interpret websites.',
      outcomes: [
        'Clear URL taxonomy and internal linking across services, case studies, and insights',
        'Structured data implemented to support search-engine understanding and potential rich-result eligibility',
        'Improved Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) where the project allows',
        'Clear analytics and conversion tracking setup for measurable organic performance',
      ],
    },
    specializedSections: [
      {
        label: 'SEARCH FOUNDATIONS',
        title:
          'FOUR PILLARS OF TECHNICAL SEARCH VISIBILITY',
        description:
          'We focus on engineering-grade SEO fundamentals that can compound over time without spammy keyword stuffing.',
        items: [
          {
            title:
              'Technical SEO & Crawlability',
            detail:
              'Clean robots.txt rules, XML sitemaps, canonical URL resolution, and structured route architecture.',
          },
          {
            title:
              'On-Page Semantic Hierarchy',
            detail:
              'Logical heading structure, descriptive alt attributes, and intent-aligned service and location architecture.',
          },
          {
            title:
              'Core Web Vitals Performance',
            detail:
              'Optimizing server response, image sizing, font loading, and main-thread JavaScript for stronger speed metrics.',
          },
          {
            title:
              'Content Structure & Analytics',
            detail:
              'Topic-cluster content architecture and privacy-conscious conversion tracking to measure qualified organic enquiries.',
          },
        ],
      },
    ],
    processSummary: [
      {
        step: '01',
        title:
          'Technical & Search Intent Audit',
        detail:
          'Analyzing current crawl health, speed bottlenecks, and high-intent commercial queries.',
      },
      {
        step: '02',
        title:
          'Information & URL Architecture',
        detail:
          'Structuring service pages, case studies, and insights around clear search topics.',
      },
      {
        step: '03',
        title:
          'Code & Schema Implementation',
        detail:
          'Deploying semantic markup, OpenGraph tags, JSON-LD schema, and performance optimizations.',
      },
      {
        step: '04',
        title:
          'Indexing & Analytics Verification',
        detail:
          'Validating sitemaps, structured data, canonical URLs, and conversion event tracking.',
      },
    ],
    faqs: [
      {
        question:
          'Do you guarantee #1 rankings overnight?',
        answer:
          'No ethical agency can promise instant #1 rankings. We focus on a strong technical SEO foundation, useful content structure, site performance, and measurable improvements that give your domain a sound basis for organic growth.',
      },
      {
        question:
          'Is SEO included when you build a new website?',
        answer:
          'Yes—every website we build includes technical SEO foundations such as semantic HTML, metadata, sitemap configuration, appropriate structured data, and performance optimization. Deeper ongoing SEO campaigns can be scoped separately.',
      },
    ],
  },

  {
    id: 'maintenance',
    number: '06',
    slug: 'maintenance',
    title: 'Website Maintenance',
    shortTitle: 'Maintenance',
    shortDescription:
      'Proactive security updates, performance monitoring, content updates, and continuous engineering support.',
    heroHeadline:
      'PROACTIVE CARE FOR MISSION-CRITICAL WEBSITES.',
    heroSubheadline:
      'Your website is a living business asset. We provide ongoing engineering support, security patching, performance audits, and rapid content updates.',
    iconName: 'shield',
    deliverables: [
      'Proactive Dependency & Security Patching',
      'Uptime & SSL Certificate Monitoring',
      'Monthly Core Web Vitals & Speed Audits',
      'Scheduled Backups & Rollback Protection',
      'Dedicated Priority Engineering Hours for New Features',
    ],
    technologies: [
      'Automated CI/CD',
      'Edge Monitoring',
      'Lighthouse CI',
      'Dependency Auditing',
      'Git Version Control',
    ],
    problemStatement: {
      headline:
        'Unmaintained websites quietly degrade in speed, security, and conversion.',
      description:
        'After launch, outdated dependencies, unoptimized media uploads, and expired scripts can introduce regressions at inconvenient moments.',
      painPoints: [
        'Outdated packages and security vulnerabilities left unpatched for extended periods',
        'Gradual performance slowdown as new images and scripts are added without oversight',
        'No dedicated engineer available when you need a new landing page or urgent update',
        'Broken forms or third-party integrations going unnoticed until leads drop',
      ],
    },
    solutionStatement: {
      headline:
        'Peace of mind with a dedicated engineering partner on retainer.',
      description:
        'Novariyan helps keep your digital presence fast, secure, and continuously evolving—acting as an ongoing web engineering partner.',
      outcomes: [
        'Dependency updates reviewed and tested before production release',
        'Uptime and critical form-health monitoring where supported by the infrastructure',
        'Regular Core Web Vitals and performance reviews',
        'Direct engineering support through agreed WhatsApp and email channels',
      ],
    },
    specializedSections: [
      {
        label: 'CARE & CONTINUITY',
        title:
          'FOUR LAYERS OF ONGOING PROTECTION & GROWTH',
        description:
          'Structured maintenance retainers designed for businesses that need dependable technical support and continuous digital improvement.',
        items: [
          {
            title:
              'Security & Dependency Hardening',
            detail:
              'Regular package audits, security header verification, SSL checks, and vulnerability remediation.',
          },
          {
            title:
              'Routine Content & Feature Updates',
            detail:
              'Turnaround on new sections, campaign landing pages, case study uploads, and copy refinements according to the agreed support plan.',
          },
          {
            title:
              'Performance & Speed Preservation',
            detail:
              'Regular Lighthouse and Core Web Vitals reviews to identify performance regressions as new media and functionality are introduced.',
          },
          {
            title:
              'Uptime Monitoring & Priority Support',
            detail:
              'Automated health checks on critical routes and enquiry forms where supported by the hosting stack, backed by responsive engineering support.',
          },
        ],
      },
    ],
    processSummary: [
      {
        step: '01',
        title:
          'Codebase & Infrastructure Onboarding',
        detail:
          'Auditing repository health, deployment pipelines, backups, and current performance baselines.',
      },
      {
        step: '02',
        title:
          'Stabilization & Hardening',
        detail:
          'Resolving immediate technical debt, updating core packages, and configuring appropriate uptime alerts.',
      },
      {
        step: '03',
        title:
          'Monthly Proactive Maintenance',
        detail:
          'Scheduled security updates, speed verification, monitoring reviews, and backup integrity checks.',
      },
      {
        step: '04',
        title:
          'Iterative Feature Evolution',
        detail:
          'Deploying new pages, UX enhancements, and conversion experiments as your business grows.',
      },
    ],
    faqs: [
      {
        question:
          'Can you maintain a website that was built by another agency?',
        answer:
          'We begin with a technical codebase audit. If the existing architecture is clean and modern, we can onboard it directly; if it has structural issues, we will recommend a pragmatic remediation plan before ongoing support begins.',
      },
      {
        question:
          'How quickly do you respond to support requests?',
        answer:
          'Retainer clients receive priority engineering support through the agreed channels and response window. Critical uptime or form issues are triaged according to their severity and the terms of the support plan.',
      },
    ],
  },
];

export function getServiceBySlug(
  slug: string,
): ServiceItem | undefined {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!normalizedSlug) {
    return undefined;
  }

  return SERVICES_DATA.find(
    (service) => service.slug === normalizedSlug,
  );
}
