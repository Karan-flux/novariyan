export type TestimonialServiceCategory =
  | 'Web Development'
  | 'Web Design'
  | 'E-Commerce'
  | '3D & Interactive'
  | 'SEO Optimization';

export interface TestimonialItem {
  id: string;
  isPlaceholder: true;
  quote: string;
  clientName: string;
  role: string;
  company: string;
  projectType: string;
  serviceCategory: TestimonialServiceCategory;
  /**
   * Placeholder testimonials intentionally do not contain a rating.
   * Add a verified rating only when supplied by the real client.
   */
  rating?: number;
  hasVideoPlaceholder?: boolean;
}

/**
 * IMPORTANT:
 * Every item below is an explicitly structured placeholder.
 *
 * These entries must NOT be presented as genuine client reviews,
 * verified testimonials, ratings, or customer endorsements.
 *
 * Replace them with verified client-provided testimonials before
 * publishing them as social proof.
 */
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'placeholder-review-01',
    isPlaceholder: true,
    quote:
      '[Placeholder Review] Replace this with a verified client quote describing the actual project experience, collaboration, and measurable outcomes where those outcomes have been documented.',
    clientName: '[Client Name — Placeholder]',
    role: 'Managing Director',
    company: '[Real Estate Brand — Placeholder]',
    projectType: 'Custom Web Architecture & 3D Showcase',
    serviceCategory: 'Web Development',
    hasVideoPlaceholder: true,
  },
  {
    id: 'placeholder-review-02',
    isPlaceholder: true,
    quote:
      '[Placeholder Review] Replace this with a verified client testimonial covering the actual design process, e-commerce experience, communication, and project outcomes.',
    clientName: '[Client Name — Placeholder]',
    role: 'Founder & Creative Director',
    company: '[Luxury E-Commerce Brand — Placeholder]',
    projectType: 'Bespoke E-Commerce Flagship',
    serviceCategory: 'E-Commerce',
    hasVideoPlaceholder: true,
  },
  {
    id: 'placeholder-review-03',
    isPlaceholder: true,
    quote:
      '[Placeholder Review] Replace this with a verified client statement regarding the actual hospitality website experience, booking journey, visual storytelling, and collaboration.',
    clientName: '[Client Name — Placeholder]',
    role: 'General Manager',
    company: '[Boutique Hospitality Brand — Placeholder]',
    projectType: 'Editorial Website & Booking Flow',
    serviceCategory: 'Web Design',
  },
  {
    id: 'placeholder-review-04',
    isPlaceholder: true,
    quote:
      '[Placeholder Review] Replace this with a verified client statement describing the actual technical SEO work, semantic architecture, performance improvements, and measurable search outcomes where documented.',
    clientName: '[Client Name — Placeholder]',
    role: 'Head of Growth',
    company: '[B2B Technology Brand — Placeholder]',
    projectType: 'Technical SEO & Interactive Product Site',
    serviceCategory: 'SEO Optimization',
  },
  {
    id: 'placeholder-review-05',
    isPlaceholder: true,
    quote:
      '[Placeholder Review] Replace this with a verified client quote describing the actual Three.js / WebGL experience, product visualization work, collaboration, and project outcomes.',
    clientName: '[Client Name — Placeholder]',
    role: 'VP of Product',
    company: '[Industrial Technology Brand — Placeholder]',
    projectType: '3D WebGL Configurator & Web Platform',
    serviceCategory: '3D & Interactive',
  },
];
