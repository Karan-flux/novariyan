import React from 'react';
import { CheckCircle2 } from 'lucide-react';

import { SITE_CONFIG } from '../config/site';
import { SERVICES_DATA } from '../data/services';
import { useSEO } from '../lib/seo';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { ResilientImage } from '../components/ResilientImage';
import { BookingCTA } from '../components/BookingCTA';
import { OrbitalSculpture3D } from '../components/3D/OrbitalSculpture3D';

const BELIEFS = [
{
number: '01',
title: 'Clarity Over Decoration',
description:
'Every visual element on a page should either strengthen brand perception, clarify complex information, or guide the visitor toward action. Anything else is noise.',
},
{
number: '02',
title: 'Performance Is Part of the Design',
description:
'A visually striking website that takes five seconds to load is a broken design. We treat Core Web Vitals, clean code, and asset optimization as first-class design requirements.',
},
{
number: '03',
title: 'Built From First Principles',
description:
'We avoid generic multi-purpose templates. Your business has a distinct commercial posture, and your website architecture should reflect that individuality.',
},
{
number: '04',
title: 'Long-Term Engineering Maintainability',
description:
'We write modular, strictly typed React and TypeScript codebases so your website remains stable, extensible, and easy to evolve long after launch day.',
},
];

const TECH_STACK_GROUPS = [
{
category: 'Frontend & Frameworks',
items: 'React · TypeScript · Next.js · Vite · Tailwind CSS',
},
{
category: '3D Spatial & Motion',
items: 'Three.js · React Three Fiber · Drei · WebGL · Framer Motion',
},
{
category: 'Commerce & Content',
items: 'Headless Shopify · Custom CMS Schemas · Product Catalogs',
},
{
category: 'Search & Infrastructure',
items:
'Schema.org JSON-LD · Semantic HTML5 · Edge CDN Deployment · Lighthouse CI',
},
];

export const About: React.FC = () => {
useSEO({
title: 'About Novariyan — Digital Design & Web Engineering Studio',
description:
'Learn about Novariyan’s story, design philosophy, engineering standards, technical stack, and the founder behind the studio.',
path: '/about',
});

return ( <div className="bg-[#F5F5F2] text-[#0A0A0A]">
{/* OUR STORY — HERO */} <section className="py-16 lg:py-24 bg-architectural-grid border-b border-[#0A0A0A]/12"> <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12"> <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"> <div className="lg:col-span-7"> <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
Our Story & Studio Identity </p>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#0A0A0A] mb-6">
            BUILT WITH INTENTION. ENGINEERED FOR IMPACT.
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mb-8">
            Novariyan is a web development and digital experience studio
            created for businesses that refuse to blend in. We bridge the
            gap between high-fashion editorial design and rigorous
            software engineering.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button to="/book" variant="primary" size="lg">
              Start a Conversation
            </Button>

            <Button to="/work" variant="outline-dark" size="lg">
              View Selected Work
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="p-8 rounded-2xl bg-[#0A0A0A] text-[#F5F5F2] border border-[#0A0A0A]">
            <OrbitalSculpture3D
              theme="dark"
              variant="orbital"
              className="w-full h-64 sm:h-72"
            />

            <div className="pt-5 border-t border-white/10 flex items-center justify-between font-mono-tech text-xs text-neutral-400">
              <span>NOVARIYAN STUDIO</span>
              <span>DESIGN · CODE · 3D</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* OUR PHILOSOPHY */}
  <section className="py-20 lg:py-28 border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
            01 · Our Philosophy
          </p>

          <h2 className="font-display text-4xl sm:text-5xl text-[#0A0A0A]">
            WHY NOVARIYAN EXISTS
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-neutral-700 leading-relaxed">
          <p>
            Most businesses face a frustrating choice when commissioning a
            website: hire a traditional creative agency that delivers
            static mockups with slow, fragile code—or hire a technical
            contractor who writes functional code with generic,
            uninspiring visuals.
          </p>

          <p>
            Novariyan was established to unify both disciplines under a
            single roof. We treat typographic hierarchy, negative space,
            3D WebGL choreography, and frontend performance as inseparable
            parts of a single craft.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* WHAT WE BELIEVE */}
  <section className="py-20 lg:py-28 bg-white border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="02 · Principles"
        title="WHAT WE BELIEVE"
        description="Four architectural convictions that govern every project we take on."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {BELIEFS.map((belief) => (
          <div
            key={belief.number}
            className="p-8 rounded-2xl bg-[#F5F5F2] border border-[#0A0A0A]/10"
          >
            <span className="font-mono-tech text-xs text-neutral-400 block mb-3">
              {belief.number}
            </span>

            <h3 className="font-display text-3xl text-[#0A0A0A] mb-3">
              {belief.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {belief.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* OUR CAPABILITIES & TECHNOLOGY */}
  <section className="py-20 lg:py-28 bg-[#0A0A0A] text-[#F5F5F2]">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="03 · Capabilities & Stack"
        title="TECHNOLOGY & DISCIPLINES"
        description="Modern, type-safe engineering tools chosen for reliability, speed, and longevity."
        theme="dark"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-6 space-y-4">
          <p className="font-mono-tech text-xs uppercase tracking-widest text-neutral-400 mb-4">
            Core Studio Capabilities
          </p>

          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="p-5 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-between"
            >
              <div>
                <span className="font-mono-tech text-xs text-neutral-500 mr-3">
                  {service.number}
                </span>

                <span className="font-semibold text-white">
                  {service.title}
                </span>
              </div>

              <span className="font-mono-tech text-xs text-neutral-400 hidden sm:inline">
                {service.technologies.slice(0, 2).join(' · ')}
              </span>
            </div>
          ))}
        </div>

        <div className="lg:col-span-6 space-y-4">
          <p className="font-mono-tech text-xs uppercase tracking-widest text-neutral-400 mb-4">
            Production Technology Stack
          </p>

          {TECH_STACK_GROUPS.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-xl bg-[#121212] border border-white/10"
            >
              <h3 className="font-mono-tech text-xs uppercase tracking-wider text-neutral-400 mb-2">
                {group.category}
              </h3>

              <p className="text-sm sm:text-base text-white font-medium">
                {group.items}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* PROCESS */}
  <section className="py-20 lg:py-28 border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="04 · Studio Method"
        title="OUR PROCESS"
        description="Six structured phases designed to keep projects transparent, on schedule, and aligned with business outcomes."
      />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {SITE_CONFIG.process.map((step) => (
          <div
            key={step.number}
            className="p-6 rounded-2xl bg-white border border-[#0A0A0A]/10 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono-tech text-xs text-neutral-400 block mb-3">
                {step.number}
              </span>

              <h3 className="font-display text-2xl text-[#0A0A0A] mb-2">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>

            <p className="font-mono-tech text-[11px] text-neutral-500 mt-4 pt-3 border-t border-[#0A0A0A]/10">
              {step.deliverables}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* DEDICATED FOUNDER SECTION */}
  <section className="py-20 lg:py-28 bg-white">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="05 · Leadership"
        title="THE PERSON BEHIND NOVARIYAN"
        description={SITE_CONFIG.founder.placeholderNotice}
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#141414] border border-[#0A0A0A]/12">
            <ResilientImage
              src={SITE_CONFIG.founder.image}
              alt={`Portrait of ${SITE_CONFIG.founder.name}, ${SITE_CONFIG.founder.role}`}
              fallbackLabel="FOUNDER PORTRAIT PLACEHOLDER"
              className="w-full h-full object-cover object-center"
              containerClassName="w-full h-full"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              {SITE_CONFIG.founder.role}
            </span>

            <h3 className="font-display text-4xl sm:text-6xl text-[#0A0A0A]">
              {SITE_CONFIG.founder.name}
            </h3>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500">
              Biography
            </h4>

            <p className="text-base text-neutral-700 leading-relaxed">
              {SITE_CONFIG.founder.shortBio}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F5F5F2] border border-[#0A0A0A]/10">
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Design &amp; Engineering Philosophy
            </h4>

            <p className="text-base font-medium text-[#0A0A0A] leading-relaxed">
              “{SITE_CONFIG.founder.philosophy}”
            </p>
          </div>

          <div>
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500 mb-4">
              Technical Focus Areas
            </h4>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SITE_CONFIG.founder.expertise.map((expertise) => (
                <li
                  key={expertise}
                  className="flex items-start gap-2.5 text-sm text-[#0A0A0A]"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />

                  <span>{expertise}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-[#0A0A0A]/12 flex flex-wrap items-center gap-3">
            {SITE_CONFIG.founder.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${SITE_CONFIG.founder.name}'s ${social.label} profile`}
                className="px-4 py-2 rounded-full border border-[#0A0A0A]/25 font-mono-tech text-xs uppercase tracking-wider text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F5F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  <BookingCTA />
</div>

);
};
