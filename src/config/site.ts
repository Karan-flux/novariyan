import { ASSETS } from './assets';

export const SITE_CONFIG = {
  name: 'NOVARIYAN',
  legalName: 'Novariyan',
  tagline: 'Premium Web Development Agency',
  description:
    'Novariyan designs and develops high-performance websites and digital experiences for ambitious businesses.',
  url: 'https://novariyan.tech',

  // Business contact
  whatsappNumber: '918471986282',
  whatsappDisplay: '+91 84719 86282',

  // Business email not created yet — replace when ready.
  email: 'hello@novariyan.tech',

  location: 'India · Working Globally',
  responseWindow: 'Typical response within 4 business hours',

  socials: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/novariyan.in',
      handle: '@novariyan.in',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/143673014/',
      handle: 'novariyan',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/Novariyan-studio',
      handle: 'NOVARIYAN',
    },
  ],

  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],

  founder: {
    name: 'KARNAJIT GHOSH',
    role: 'Founder & Lead Developer',

    placeholderNotice:
      'Profile details and biography structured as replaceable studio placeholders.',

    image: ASSETS.founderPortrait,

    shortBio:
      'An independent design-focused engineer dedicated to building websites where architectural clarity meets modern frontend performance. Replace this placeholder biography with your personal background and studio origin.',

    philosophy:
      'A website should never feel like an assembly line template. Every typography scale, layout grid, and interaction curve should be engineered specifically around the business it represents.',

    expertise: [
      'Full-Stack Web Architecture (React, TypeScript, Next.js)',
      'Interactive 3D & WebGL Experiences (Three.js, React Three Fiber)',
      'Design Systems & Editorial UI Engineering',
      'Core Web Vitals & Technical SEO Optimization',
    ],

    socials: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/karnajit-ghosh-014646384/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/Karan-flux',
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/kran_ghosh/',
      },
    ],
  },

  capabilities: [
    {
      index: '01',
      title: 'CUSTOM',
      subtitle: 'Bespoke Architecture',
      description:
        'Every project is designed and engineered from a blank canvas around the client’s specific business model, audience, and positioning.',
    },
    {
      index: '02',
      title: 'PERFORMANCE',
      subtitle: 'Sub-Second Responsiveness',
      description:
        'Fast, responsive, and scalable experiences engineered with strict asset budgets, clean code, and modern rendering pipelines.',
    },
    {
      index: '03',
      title: 'RESPONSIVE',
      subtitle: 'Intentional Multi-Device Layouts',
      description:
        'Designed purposefully for every viewport—from 1440px+ desktop displays to touch-first mobile interfaces.',
    },
    {
      index: '04',
      title: 'SEO READY',
      subtitle: 'Semantic & Crawlable Foundations',
      description:
        'Built from day one with semantic HTML, structured schema data, clean URL hierarchy, and technical search visibility in mind.',
    },
  ],

  process: [
    {
      number: '01',
      title: 'DISCOVER',
      description:
        'Understand the business, audience, competitive landscape, and conversion goals.',
      deliverables:
        'Discovery Brief · Audience Mapping · Technical Audit',
    },
    {
      number: '02',
      title: 'STRATEGY',
      description:
        'Define the information architecture, content structure, and digital direction.',
      deliverables:
        'Sitemap Architecture · Wireframes · Conversion Flow',
    },
    {
      number: '03',
      title: 'DESIGN',
      description:
        'Create the bespoke visual system, editorial typography, and interactive user experience.',
      deliverables:
        'UI Design System · Interactive Prototypes · Motion Specs',
    },
    {
      number: '04',
      title: 'DEVELOP',
      description:
        'Build the experience with clean, maintainable, high-performance modern technologies.',
      deliverables:
        'Frontend Engineering · 3D/WebGL · CMS Integration',
    },
    {
      number: '05',
      title: 'LAUNCH',
      description:
        'Rigorous cross-device testing, speed optimization, SEO verification, and deployment.',
      deliverables:
        'QA Testing · Core Web Vitals Tuning · Edge Deployment',
    },
    {
      number: '06',
      title: 'SUPPORT',
      description:
        'Maintain, monitor, and continuously evolve the website after launch.',
      deliverables:
        'Security Updates · Uptime Monitoring · Iterative Growth',
    },
  ],

  industries: [
    {
      id: 'real-estate',
      name: 'REAL ESTATE',
      headline: 'Architectural Showcases & Property Developments',
      description:
        'High-impact digital presentations for luxury developments, architectural practices, and commercial real estate portfolios with interactive floorplans and lead capture.',
      focus:
        'Interactive Floorplans · 3D Massing · Private Enquiry Flows',
      previewImage: ASSETS.projects.aurelia,
    },
    {
      id: 'hospitality',
      name: 'HOSPITALITY',
      headline: 'Boutique Hotels, Resorts & Culinary Destinations',
      description:
        'Atmospheric digital flagships that translate physical warmth and architectural calm into direct bookings and guest anticipation.',
      focus:
        'Direct Booking UX · Editorial Storytelling · Visual Galleries',
      previewImage: ASSETS.projects.vertexHotel,
    },
    {
      id: 'ecommerce',
      name: 'E-COMMERCE',
      headline: 'Direct-to-Consumer & Luxury Retail Flagships',
      description:
        'Distinctive online stores built for tactile product storytelling, clear catalog navigation, and instant page transitions.',
      focus:
        'Bespoke Product Pages · Headless Commerce · Catalog UX',
      previewImage: ASSETS.projects.noirTime,
    },
    {
      id: 'startups',
      name: 'STARTUPS',
      headline: 'Venture-Backed Products & Category Challengers',
      description:
        'Category-defining launch websites that articulate complex value propositions with immediate visual authority and investor-grade polish.',
      focus:
        'Positioning Clarity · Interactive Product Demos · Scalable CMS',
      previewImage: ASSETS.projects.novaSystems,
    },
    {
      id: 'professional-services',
      name: 'PROFESSIONAL SERVICES',
      headline: 'Consultancies, Legal, Finance & Advisory Firms',
      description:
        'Authoritative digital platforms designed to build institutional trust, showcase partner expertise, and attract high-value client enquiries.',
      focus:
        'Editorial Authority · Case Study Archives · Lead Qualification',
      previewImage: ASSETS.projects.aurelia,
    },
    {
      id: 'technology',
      name: 'TECHNOLOGY',
      headline: 'Software Platforms, Hardware & Engineering Systems',
      description:
        'Technical web experiences that explain sophisticated engineering through interactive diagrams, 3D visualizers, and crisp documentation.',
      focus:
        '3D Product Inspection · Technical Storytelling · High Speed',
      previewImage: ASSETS.projects.novaSystems,
    },
    {
      id: 'health-wellness',
      name: 'HEALTH & WELLNESS',
      headline: 'Modern Clinics, Longevity Studios & Wellness Brands',
      description:
        'Calm, accessible, and trustworthy digital experiences with seamless consultation booking and patient-first information design.',
      focus:
        'Appointment Booking · WCAG Accessibility · Calm Editorial UI',
      previewImage: ASSETS.projects.vertexHotel,
    },
    {
      id: 'creative-brands',
      name: 'CREATIVE BRANDS',
      headline: 'Design Studios, Fashion Houses & Cultural Institutions',
      description:
        'Bespoke editorial portfolios and digital exhibitions crafted with unconventional layouts, smooth motion, and typographic precision.',
      focus:
        'Art Direction · Custom Motion · Archive Systems',
      previewImage: ASSETS.projects.noirTime,
    },
  ],
} as const;

