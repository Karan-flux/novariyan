import { ASSETS } from '../config/assets';

export type BlogCategory =
| 'ALL'
| 'WEB DEVELOPMENT'
| 'DESIGN'
| 'SEO';

export interface BlogArticle {
id: string;
slug: string;
title: string;
excerpt: string;
category: Exclude<BlogCategory, 'ALL'>;
date: string;
readingTime: string;
featured: boolean;
heroImage: string;
author: {
name: string;
role: string;
};
keyTakeaways: string[];
sections: {
heading: string;
paragraphs: string[];
}[];
}

export const BLOG_CATEGORIES: BlogCategory[] = [
'ALL',
'WEB DEVELOPMENT',
'DESIGN',
'SEO',
];

export const BLOG_DATA: BlogArticle[] = [
{
id: 'high-performance-website-business-impact',
slug: 'how-a-high-performance-website-can-improve-your-business',
title: 'How a High-Performance Website Can Improve Your Business',
excerpt:
'Why fast load times, clean frontend architecture, and intentional conversion flows can influence user experience, brand perception, and qualified enquiries.',
category: 'WEB DEVELOPMENT',
date: 'September 2026',
readingTime: '5 min read',
featured: true,
heroImage: ASSETS.projects.novaSystems,
author: {
name: 'Novariyan Editorial',
role: 'Engineering & Strategy',
},
keyTakeaways: [
'Website responsiveness contributes to how prospective clients experience your brand and evaluate the quality of their digital interaction.',
'Custom component architectures can reduce unnecessary dependencies and give teams greater control over frontend performance.',
'Performance is an important user-experience consideration, and Core Web Vitals are part of Google’s page experience systems.',
],
sections: [
{
heading: 'Speed as an Immediate Signal of Digital Quality',
paragraphs: [
'Before a prospective client reads a single sentence of your value proposition, they experience how your website responds. Fast, stable interactions can create a sense of precision and respect for the visitor’s time, while avoidable delays can introduce friction before the conversation even begins.',
'Conversely, when a website stutters during scroll, shifts layout as images load, or takes several seconds to become interactive on a mobile network, the resulting friction can interrupt the visitor’s journey and make important content harder to reach.',
],
},
{
heading: 'Why Template Stacks Can Accumulate Technical Debt',
paragraphs: [
'Many businesses launch on multipurpose visual page builders because they provide a convenient path to market. Over time, however, additional analytics scripts, sliders, form plugins, third-party widgets, and high-resolution media can increase the amount of code and assets delivered to visitors.',
'At Novariyan, we use modular TypeScript and React architectures with deliberate asset and dependency budgets. This gives the implementation greater control over what code and media are loaded, when they are loaded, and how they affect the visitor experience.',
],
},
{
heading: 'Connecting Frontend Engineering to Conversion Clarity',
paragraphs: [
'High performance is not solely about benchmark scores—it is about preserving momentum across the buyer journey. When navigation from a service overview to a case study and into a consultation form feels responsive and predictable, visitors have fewer technical obstacles between discovering the service and submitting an enquiry.',
],
},
],
},

{
id: 'what-makes-a-website-feel-premium',
slug: 'what-makes-a-website-feel-premium',
title: 'What Makes a Website Feel Premium?',
excerpt:
'An editorial breakdown of typography hierarchy, negative space, grid asymmetry, and restrained motion in modern digital design.',
category: 'DESIGN',
date: 'September 2026',
readingTime: '6 min read',
featured: false,
heroImage: ASSETS.projects.aurelia,
author: {
name: 'Novariyan Editorial',
role: 'Design Direction',
},
keyTakeaways: [
'Luxury in digital design can come from architectural restraint, considered spacing, and clear visual hierarchy rather than visual clutter.',
'Monumental display typography paired with crisp body prose creates strong hierarchy and editorial character.',
'Motion should feel calm, weighted, and purposeful rather than flashy or distracting.',
],
sections: [
{
heading: 'The Discipline of Negative Space',
paragraphs: [
'Walk into a high-end architectural gallery or luxury flagship store and notice what dominates the room: space. Objects are given room to breathe so the eye knows where to rest and which details deserve attention.',
'The same principle can govern premium web design. When every part of the viewport is packed with floating badges, competing banners, and nested card borders, the interface can feel anxious. Generous margins and subtle structural dividers create breathing room and help establish visual hierarchy.',
],
},
{
heading: 'Typographic Contrast & Editorial Pacing',
paragraphs: [
'Generic interfaces often rely on uniform font weights and limited scale contrast, making headings difficult to distinguish from supporting content. A premium digital experience can establish stronger contrast by pairing bold, architectural display headlines with highly legible body prose and comfortable reading widths.',
'Metadata such as dates, categories, and numerical indices should support the hierarchy rather than compete with the primary message, using restrained typography and subtle separators where appropriate.',
],
},
{
heading: 'Weighted, Purposeful Micro-Interactions',
paragraphs: [
'True polish often lives in how buttons, links, and interactive forms respond to human input. Instead of constant spinning animations or exaggerated effects, premium interfaces can use smooth easing, subtle parallax, and carefully timed transitions that reward curiosity without delaying access to content.',
],
},
],
},

{
id: 'technical-seo-foundations-for-modern-websites',
slug: 'technical-seo-foundations-for-modern-websites',
title: 'Technical SEO Foundations for Modern Websites',
excerpt:
'How semantic HTML5 landmarks, Schema.org JSON-LD structured data, and Core Web Vitals contribute to a technically sound search foundation.',
category: 'SEO',
date: 'August 2026',
readingTime: '7 min read',
featured: false,
heroImage: ASSETS.projects.vertexHotel,
author: {
name: 'Novariyan Editorial',
role: 'Technical SEO & Architecture',
},
keyTakeaways: [
'Semantic HTML helps browsers, assistive technologies, and search engines interpret the structure and purpose of page content.',
'JSON-LD structured data provides machine-readable information about entities and content and can support eligibility for certain search enhancements.',
'Core Web Vitals—LCP, INP, and CLS—provide useful measurements of loading performance, responsiveness, and visual stability.',
],
sections: [
{
heading: 'Why SEO Starts in the Codebase, Not in a Plugin',
paragraphs: [
'Too often, search optimization is treated as a checklist applied after a website is already built. By then, structural issues—such as unclear heading hierarchies, sluggish rendering, or inconsistent URL structures—may already be embedded in the implementation.',
'When technical SEO is considered during component and route architecture, pages can inherit consistent canonical URLs, Open Graph metadata, semantic HTML structures, and logical heading hierarchies from the beginning.',
],
},
{
heading: 'Structured Data & Entity Clarity with Schema.org',
paragraphs: [
'Modern search systems need to interpret the entities, relationships, and content represented on a page. Embedding valid JSON-LD structured data can provide explicit machine-readable context about organizations, services, articles, FAQs, products, and other supported entities.',
'Structured data does not guarantee higher rankings. Its value depends on accurate implementation, supported schema types, page quality, and how search engines choose to use the supplied information.',
],
},
{
heading: 'Core Web Vitals and Layout Stability',
paragraphs: [
'Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) provide standardized measurements for important aspects of real-world user experience.',
'Specifying explicit image dimensions or aspect ratios, optimizing critical assets, reducing unnecessary main-thread JavaScript, and loading resources deliberately can help create a faster and more stable experience for both users and search crawlers.',
],
},
],
},
];

export function getBlogBySlug(
slug: string,
): BlogArticle | undefined {
const normalizedSlug = slug.trim().toLowerCase();

if (!normalizedSlug) {
return undefined;
}

return BLOG_DATA.find(
(article) => article.slug === normalizedSlug,
);
}
