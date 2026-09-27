import { ASSETS } from '../config/assets';

export type ProjectCategory =
| 'ALL'
| 'WEB'
| 'E-COMMERCE'
| '3D'
| 'REAL ESTATE'
| 'HOSPITALITY'
| 'TECHNOLOGY';

export interface ProjectItem {
id: string;
number: string;
slug: string;
title: string;
clientPlaceholderNote: string;
industry: string;
categories: Exclude<ProjectCategory, 'ALL'>[];
services: string[];
year: string;
featured: boolean;
heroImage: string;
galleryImages: {
src: string;
caption: string;
aspect: '16:9' | '4:3';
}[];
summary: string;
overview: string;
challenge: string;
approach: string;
designDetails: string;
developmentDetails: string;
technologies: string[];
resultsPlaceholder: {
notice: string;
metrics: {
label: string;
value: string;
context: string;
}[];
};
}

export const PROJECT_FILTERS: ProjectCategory[] = [
'ALL',
'WEB',
'E-COMMERCE',
'3D',
'REAL ESTATE',
'HOSPITALITY',
'TECHNOLOGY',
];

export const PROJECTS_DATA: ProjectItem[] = [
{
id: 'aurelia-residences',
number: '01',
slug: 'aurelia-residences',
title: 'AURELIA RESIDENCES',
clientPlaceholderNote:
'Sample Concept Case Study — Replace with verified client project details.',
industry: 'Real Estate',
categories: ['REAL ESTATE', 'WEB', '3D'],
services: ['Web Design', 'Web Development', '3D & Interactive'],
year: '2026',
featured: true,
heroImage: ASSETS.projects.aurelia,
galleryImages: [
{
src: ASSETS.projects.aurelia,
caption:
'Architectural Hero Viewport & Interactive Massing Explorer',
aspect: '16:9',
},
{
src: ASSETS.projects.vertexHotel,
caption:
'Residence Floorplan Selector & Material Specification View',
aspect: '16:9',
},
],
summary:
'An architectural digital flagship and private viewing portal concept for a luxury brutalist residential development.',
overview:
'Aurelia Residences is a concept digital experience designed to explore how a luxury residential development could translate its architectural character into a high-end online presence. The concept combines editorial storytelling, interactive floorplan inspection, daylight exposure previews, and a private consultation booking flow.',
challenge:
'Conventional real estate websites can overwhelm prospective buyers with dense PDF brochures and listing grids, making it difficult to communicate spatial character or guide visitors toward qualified private viewing enquiries.',
approach:
'We structured the concept like an architectural monograph—opening with dramatic twilight imagery and spatial typography, followed by an interactive residence finder that can filter penthouses and duplexes without requiring a full page reload.',
designDetails:
'A restrained monochrome palette of raw concrete gray, obsidian black, and warm alabaster allows the architectural photography and floorplan linework to command full attention.',
developmentDetails:
'Designed with React, TypeScript, and scroll-based motion transitions. Interactive SVG and WebGL spatial layers are structured to load progressively, with performance budgets considered for mobile delivery.',
technologies: [
'React',
'TypeScript',
'Three.js / WebGL',
'Tailwind CSS',
'Motion',
],
resultsPlaceholder: {
notice:
'Concept Specification — Replace with verified post-launch client metrics when applicable.',
metrics: [
{
label: 'ARCHITECTURE',
value: 'Bespoke Portal',
context:
'Concept for interactive residence and floorplan exploration',
},
{
label: 'PERFORMANCE',
value: 'Performance Budget',
context:
'Target Lighthouse performance thresholds defined during implementation',
},
{
label: 'CONVERSION FLOW',
value: 'Private Viewing',
context:
'Concept consultation flow with calendar and WhatsApp enquiry options',
},
],
},
},

{
id: 'noir-time',
number: '02',
slug: 'noir-time',
title: 'NOIR TIME',
clientPlaceholderNote:
'Sample Concept Case Study — Replace with verified client project details.',
industry: 'Luxury E-Commerce',
categories: ['E-COMMERCE', 'WEB', '3D'],
services: ['E-Commerce', 'Web Design', '3D & Interactive'],
year: '2026',
featured: true,
heroImage: ASSETS.projects.noirTime,
galleryImages: [
{
src: ASSETS.projects.noirTime,
caption:
'Macro Horology Product Showcase & Caliber Specification Module',
aspect: '16:9',
},
{
src: ASSETS.projects.novaSystems,
caption:
'Collector Product Catalog Interface',
aspect: '16:9',
},
],
summary:
'A direct-to-collector horology e-commerce flagship concept built around tactile macro storytelling and streamlined acquisition.',
overview:
'Noir Time is a concept for an independent watchmaker producing limited-edition mechanical chronographs. The digital experience explores how an online store could bridge the atmosphere of a physical salon with a focused e-commerce acquisition journey.',
challenge:
'Selling high-value mechanical timepieces online requires strong visual communication and product trust. Standard e-commerce templates can compress macro photography and place detailed caliber specifications inside cramped or secondary interfaces.',
approach:
'We created an obsidian-themed digital salon where each timepiece is presented through scroll-directed macro photography, movement schematics, and a focused collector reservation drawer.',
designDetails:
'Deep obsidian surfaces (#0A0A0A) with hairline graphite borders and tabular monospace numerals echo the precision of a mechanical chronograph dial.',
developmentDetails:
'Designed as a headless commerce frontend concept with responsive variant state management, deliberate image loading, and concierge enquiry pathways.',
technologies: [
'React',
'TypeScript',
'Headless Commerce Architecture',
'Tailwind CSS',
'Motion',
],
resultsPlaceholder: {
notice:
'Concept Specification — Replace with verified post-launch client metrics when applicable.',
metrics: [
{
label: 'STOREFRONT UX',
value: 'Zero-Reload PDP',
context:
'Concept for instant strap, bezel, and edition switching with macro zoom',
},
{
label: 'PRODUCT DISCOVERY',
value: 'Product Detail Views',
context:
'Responsive product variants and WhatsApp concierge concept',
},
{
label: 'SEARCH & SCHEMA',
value: 'Rich Product JSON-LD',
context:
'Structured product metadata designed to support organic product discovery',
},
],
},
},

{
id: 'vertex-hotel',
number: '03',
slug: 'vertex-hotel',
title: 'VERTEX HOTEL',
clientPlaceholderNote:
'Sample Concept Case Study — Replace with verified client project details.',
industry: 'Hospitality',
categories: ['HOSPITALITY', 'WEB'],
services: ['Web Design', 'Web Development', 'SEO Optimization'],
year: '2026',
featured: true,
heroImage: ASSETS.projects.vertexHotel,
galleryImages: [
{
src: ASSETS.projects.vertexHotel,
caption:
'Sanctuary Courtyard Editorial Introduction & Suite Selector',
aspect: '16:9',
},
{
src: ASSETS.projects.aurelia,
caption:
'Architectural Dining & Wellness Reservation Experience',
aspect: '16:9',
},
],
summary:
'A serene editorial booking platform concept designed to shift a boutique architectural hotel toward direct guest reservations.',
overview:
'Vertex Hotel is a concept digital experience for an architectural sanctuary defined by monumental concrete arches and tranquil water courts. The project explores how a hospitality website can immerse guests in the atmosphere of a property while keeping direct reservation pathways clear.',
challenge:
'Over-reliance on third-party travel aggregators can reduce direct booking opportunities and separate the guest from the property’s own brand experience before arrival.',
approach:
'We designed an unhurried editorial journey that pairs full-bleed architectural photography with a persistent, minimal availability bar—allowing guests to move from suite exploration toward a direct reservation pathway with minimal friction.',
designDetails:
'Warm stone neutrals paired with bold condensed display headings create the sensation of leafing through a curated architecture and travel journal.',
developmentDetails:
'Designed with responsive image art direction, hospitality-focused structured data, and a clean booking-engine integration layer.',
technologies: [
'React',
'TypeScript',
'Tailwind CSS',
'Hospitality Schema JSON-LD',
'Motion',
],
resultsPlaceholder: {
notice:
'Concept Specification — Replace with verified post-launch client metrics when applicable.',
metrics: [
{
label: 'BOOKING PATH',
value: '2-Click Suite Select',
context:
'Concept reservation journey designed around rapid suite discovery',
},
{
label: 'MOBILE UX',
value: 'Thumb-First Bar',
context:
'Intentional mobile suite browsing and availability interaction',
},
{
label: 'SEO STRUCTURE',
value: 'Hotel & Local Schema',
context:
'Semantic architecture designed around high-intent hospitality queries',
},
],
},
},

{
id: 'nova-systems',
number: '04',
slug: 'nova-systems',
title: 'NOVA SYSTEMS',
clientPlaceholderNote:
'Sample Concept Case Study — Replace with verified client project details.',
industry: 'Technology',
categories: ['TECHNOLOGY', 'WEB', '3D'],
services: ['Web Development', '3D & Interactive', 'SEO Optimization'],
year: '2026',
featured: true,
heroImage: ASSETS.projects.novaSystems,
galleryImages: [
{
src: ASSETS.projects.novaSystems,
caption:
'Hardware & Telemetry Platform Architecture Showcase',
aspect: '16:9',
},
{
src: ASSETS.projects.noirTime,
caption:
'Interactive Component Specification & Documentation Grid',
aspect: '16:9',
},
],
summary:
'A precision B2B web platform and interactive product architecture showcase concept for an enterprise technology company.',
overview:
'Nova Systems is a concept for a technology company building mission-critical compute and industrial telemetry hardware. The digital experience explores how a flagship website could explain complex hardware-software integration to both executive buyers and technical audiences.',
challenge:
'Enterprise technology websites often fall into two extremes: broad marketing language without technical substance, or dense specification tables that can make complex products difficult for executive audiences to navigate.',
approach:
'We created a dual-layered narrative architecture: clear executive value propositions at the top level, paired with interactive 3D hardware breakdowns and expandable technical specifications underneath.',
designDetails:
'Inspired by industrial design manuals—combining a 12-column Swiss grid, hairline technical borders, and crisp tabular numerals.',
developmentDetails:
'Designed with React, TypeScript, and Three.js interactive geometry inspection, alongside route-level code organization and documentation-friendly content structures.',
technologies: [
'React',
'TypeScript',
'Three.js',
'React Three Fiber',
'Tailwind CSS',
],
resultsPlaceholder: {
notice:
'Concept Specification — Replace with verified post-launch client metrics when applicable.',
metrics: [
{
label: 'PRODUCT CLARITY',
value: 'Interactive 3D Spec',
context:
'Spatial hardware inspection paired with semantic technical specifications',
},
{
label: 'LEAD CAPTURE',
value: 'Enterprise Qualification',
context:
'Structured technical consultation and RFQ enquiry concept',
},
{
label: 'CODEBASE',
value: 'Type-Safe Architecture',
context:
'Modular frontend structure designed for maintainable product launches',
},
],
},
},

{
id: 'kinetix-mobility',
number: '05',
slug: 'kinetix-mobility',
title: 'KINETIX MOBILITY',
clientPlaceholderNote:
'Sample Concept Case Study — Replace with verified client project details.',
industry: 'Technology',
categories: ['TECHNOLOGY', '3D', 'WEB'],
services: ['3D & Interactive', 'Web Development', 'Web Design'],
year: '2026',
featured: false,
heroImage: ASSETS.projects.novaSystems,
galleryImages: [
{
src: ASSETS.projects.novaSystems,
caption:
'Electric Drivetrain Spatial Overview & Range Calculator',
aspect: '16:9',
},
],
summary:
'An interactive launch platform and configurator concept for an urban electric mobility company.',
overview:
'Kinetix Mobility is a concept launch experience exploring how an urban electric vehicle company could introduce a new vehicle architecture while collecting pre-order and fleet consultation enquiries.',
challenge:
'Communicating battery density, chassis rigidity, and modular accessories through static 2D presentation alone can make complex vehicle specifications difficult to understand.',
approach:
'We engineered a scroll-synchronized presentation with interactive specification comparisons and a streamlined fleet consultation booking funnel.',
designDetails:
'High-contrast monochrome typography paired with technical diagrams and responsive comparison tables.',
developmentDetails:
'Engineered in React and TypeScript with bundle-size and asset-loading considerations so the configurator can remain responsive across a range of mobile network conditions.',
technologies: [
'React',
'TypeScript',
'Three.js',
'Tailwind CSS',
'Motion',
],
resultsPlaceholder: {
notice:
'Concept Specification — Replace with verified post-launch client metrics when applicable.',
metrics: [
{
label: 'EXPERIENCE',
value: 'Interactive Launch',
context:
'Real-time trim and specification comparison concept',
},
{
label: 'ACCESSIBILITY',
value: 'Accessibility Target',
context:
'Keyboard navigation and reduced-motion considerations included in the experience design',
},
{
label: 'CONVERSION',
value: 'Pre-Order Funnel',
context:
'Direct reservation and fleet enquiry capture concept',
},
],
},
},

{
id: 'solis-atelier',
number: '06',
slug: 'solis-atelier',
title: 'SOLIS ATELIER',
clientPlaceholderNote:
'Sample Concept Case Study — Replace with verified client project details.',
industry: 'Architectural Lighting & E-Commerce',
categories: ['E-COMMERCE', 'REAL ESTATE', 'WEB'],
services: ['E-Commerce', 'Web Design', 'SEO Optimization'],
year: '2026',
featured: false,
heroImage: ASSETS.projects.aurelia,
galleryImages: [
{
src: ASSETS.projects.aurelia,
caption:
'Architectural Lighting Lookbook & Trade Specification Portal',
aspect: '16:9',
},
],
summary:
'A hybrid digital lookbook and trade e-commerce platform concept for an architectural lighting studio.',
overview:
'Solis Atelier is a concept for a studio creating sculptural luminaires for architects and interior designers. The platform explores a unified digital experience serving both direct retail customers and commercial trade specifiers.',
challenge:
'Architectural buyers often need immediate access to photometric data, CAD files, and finish information, while retail customers expect a visually engaging product discovery and shopping experience.',
approach:
'We designed a clean dual-mode product page where editorial installation photography sits alongside technical tear-sheet downloads, specification information, and sample-ordering pathways.',
designDetails:
'Minimalist gallery framing with generous alabaster whitespace and precise typographic metadata separators.',
developmentDetails:
'Designed around client-side catalog filtering by luminaire type, kelvin temperature, and architectural finish, with structured product content for search visibility.',
technologies: [
'React',
'TypeScript',
'Tailwind CSS',
'Schema.org Product JSON-LD',
],
resultsPlaceholder: {
notice:
'Concept Specification — Replace with verified post-launch client metrics when applicable.',
metrics: [
{
label: 'CATALOG UX',
value: 'Dual Retail + Trade',
context:
'Unified specification downloads and direct sample-ordering concept',
},
{
label: 'FILTERING',
value: 'Instant Filtering',
context:
'Responsive client-side filtering across architectural collections',
},
{
label: 'SEO',
value: 'Semantic Catalog',
context:
'Structured product and trade specification architecture designed for indexability',
},
],
},
},
];

export function getProjectBySlug(
slug: string,
): ProjectItem | undefined {
const normalizedSlug = slug.trim().toLowerCase();

if (!normalizedSlug) {
return undefined;
}

return PROJECTS_DATA.find(
(project) => project.slug === normalizedSlug,
);
}
