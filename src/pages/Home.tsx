import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
ArrowDown,
ArrowLeft,
ArrowRight,
ArrowUpRight,
CheckCircle2,
Plus,
Star,
} from 'lucide-react';

import { SITE_CONFIG } from '../config/site';
import { SERVICES_DATA } from '../data/services';
import { PROJECTS_DATA } from '../data/projects';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { BLOG_DATA } from '../data/blog';
import { useSEO } from '../lib/seo';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { ResilientImage } from '../components/ResilientImage';
import { BookingCTA } from '../components/BookingCTA';
import {
MonumentMode,
NovariyanMonument3D,
} from '../components/3D/NovariyanMonument3D';
import { OrbitalSculpture3D } from '../components/3D/OrbitalSculpture3D';

const MONUMENT_MODES: {
id: MonumentMode;
label: string;
}[] = [
{ id: 'monolith', label: 'Design' },
{ id: 'wireframe', label: 'Develop' },
{ id: 'kinetic', label: 'Deploy' },
{ id: 'exploded', label: 'Support' },
];

export const Home: React.FC = () => {
useSEO({
title:
'NOVARIYAN — Premium Web Development & Digital Experience Agency',
description:
'Novariyan designs and develops high-performance websites, custom e-commerce platforms, and interactive 3D digital experiences for ambitious businesses.',
path: '/',
});

const [monumentMode, setMonumentMode] =
useState<MonumentMode>('monolith');

const [activeIndustryIndex, setActiveIndustryIndex] =
useState(0);

const [activeTestimonialIndex, setActiveTestimonialIndex] =
useState(0);

const featuredProjects = PROJECTS_DATA
.filter((project) => project.featured)
.slice(0, 4);

const activeIndustry =
SITE_CONFIG.industries[activeIndustryIndex] ??
SITE_CONFIG.industries[0];

const currentTestimonial =
TESTIMONIALS_DATA[activeTestimonialIndex] ??
TESTIMONIALS_DATA[0];

const hasTestimonials =
TESTIMONIALS_DATA.length > 0;

const handlePrevTestimonial = () => {
if (!hasTestimonials) {
return;
}


setActiveTestimonialIndex((prev) =>
  prev === 0
    ? TESTIMONIALS_DATA.length - 1
    : prev - 1,
);

};

const handleNextTestimonial = () => {
if (!hasTestimonials) {
return;
}


setActiveTestimonialIndex((prev) =>
  prev === TESTIMONIALS_DATA.length - 1
    ? 0
    : prev + 1,
);

};

return ( <div className="bg-[#F5F5F2] text-[#0A0A0A]">
{/* ==================================================
SECTION 1 — HERO
================================================== */} <section className="relative min-h-[calc(100vh-72px)] flex flex-col justify-between bg-architectural-grid border-b border-[#0A0A0A]/12 overflow-hidden"> <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-14 lg:py-16 my-auto"> <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
{/* Left Column: Monumental Typography & CTAs */} <div className="lg:col-span-6 z-10"> <p className="font-mono-tech text-xs tracking-[0.22em] uppercase text-neutral-600 mb-5">
Premium Web Development Agency </p>


          <h1 className="font-display text-[3.6rem] sm:text-[5.25rem] xl:text-[6.5rem] leading-[0.91] tracking-tight text-[#0A0A0A] mb-6">
            WE BUILD
            <br />
            DIGITAL
            <br />
            EXPERIENCES.
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-lg mb-9">
            Websites engineered to help ambitious businesses
            stand out.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              to="/book"
              variant="primary"
              size="lg"
            >
              Book a Free Consultation
            </Button>

            <Button
              to="/work"
              variant="outline-dark"
              size="lg"
            >
              View Our Work
            </Button>
          </div>
        </div>

        {/* Right Column: Interactive 3D Novariyan Monument + Mode Controls */}
        <div className="lg:col-span-6 relative flex flex-col lg:flex-row items-center">
          <div
            className="w-full h-[400px] sm:h-[480px] lg:h-[560px]"
            aria-label="Interactive NOVARIYAN 3D monument"
          >
            <NovariyanMonument3D
              mode={monumentMode}
            />
          </div>

          <div
            className="flex flex-row lg:flex-col gap-2.5 mt-4 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-20 flex-wrap justify-center"
            role="group"
            aria-label="Interactive 3D Monument View Modes"
          >
            {MONUMENT_MODES.map((mode) => {
              const active =
                monumentMode === mode.id;

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() =>
                    setMonumentMode(mode.id)
                  }
                  aria-pressed={active}
                  className={`group flex items-center justify-between gap-4 rounded-full px-4 py-2 text-xs font-mono-tech uppercase tracking-wider border transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
                    active
                      ? 'bg-[#0A0A0A] text-[#F5F5F2] border-[#0A0A0A]'
                      : 'bg-[#F5F5F2]/90 text-[#0A0A0A] border-[#0A0A0A]/20 hover:border-[#0A0A0A]'
                  }`}
                >
                  <span>{mode.label}</span>

                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      active
                        ? 'border-white/40'
                        : 'border-[#0A0A0A]/30'
                    }`}
                    aria-hidden="true"
                  >
                    <Plus
                      className={`w-2.5 h-2.5 transition-transform duration-200 ${
                        active
                          ? 'rotate-45'
                          : ''
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="mt-10 pt-6 border-t border-[#0A0A0A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href="#introduction"
            className="group inline-flex items-center gap-2.5 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-[#0A0A0A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
          >
            <span>Scroll</span>

            <ArrowDown
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>

          <span
            className="hidden sm:inline text-neutral-300"
            aria-hidden="true"
          >
            |
          </span>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-neutral-600">
            <span>Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Interface</span>
            <span aria-hidden="true">·</span>
            <span>WebGL</span>
            <span aria-hidden="true">·</span>
            <span>Commerce</span>
          </div>
        </div>

        <div className="flex items-baseline gap-1 font-display">
          <span className="text-4xl sm:text-5xl text-[#0A0A0A] tabular-nums">
            01
          </span>

          <span className="font-mono-tech text-xs text-neutral-500 tabular-nums">
            /06
          </span>
        </div>
      </div>
    </div>
  </section>

  {/* ==================================================
      SECTION 2 — TRUST / INTRODUCTION
  ================================================== */}
  <section
    id="introduction"
    className="py-20 lg:py-28 border-b border-[#0A0A0A]/12"
  >
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-4">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
            What We Do
          </p>

          <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
            Independent digital design and web engineering
            studio crafting bespoke websites from first
            principles.
          </p>
        </div>

        <div className="lg:col-span-8">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#0A0A0A] mb-8 text-balance">
            WE TURN IDEAS INTO DIGITAL EXPERIENCES.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-neutral-700 leading-relaxed mb-10">
            <p>
              Novariyan combines strategic positioning,
              editorial design, and modern frontend
              engineering to build distinctive digital
              experiences. We do not assemble
              off-the-shelf themes.
            </p>

            <p>
              Every layout grid, typographic scale,
              interactive 3D scene, and conversion path
              is architected specifically around your
              business objectives—resulting in digital
              platforms designed to remain fast,
              scalable, and distinctive.
            </p>
          </div>

          <div className="pt-6 border-t border-[#0A0A0A]/12 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono-tech text-xs uppercase tracking-[0.18em] text-[#0A0A0A]">
            <span>Design</span>
            <span
              className="text-neutral-400"
              aria-hidden="true"
            >
              ·
            </span>

            <span>Development</span>
            <span
              className="text-neutral-400"
              aria-hidden="true"
            >
              ·
            </span>

            <span>Performance</span>
            <span
              className="text-neutral-400"
              aria-hidden="true"
            >
              ·
            </span>

            <span>SEO</span>
            <span
              className="text-neutral-400"
              aria-hidden="true"
            >
              ·
            </span>

            <span>Support</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ==================================================
      SECTION 3 — SERVICES
  ================================================== */}
  <section className="bg-[#0A0A0A] text-[#F5F5F2] py-20 lg:py-28">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="What We Build"
        title="SERVICES"
        description="End-to-end digital architecture designed to position, launch, and scale ambitious businesses."
        theme="dark"
        rightElement={
          <Button
            to="/services"
            variant="outline-light"
            size="sm"
          >
            View All Services
          </Button>
        }
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES_DATA.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            theme="dark"
          />
        ))}
      </div>
    </div>
  </section>

  {/* ==================================================
      SECTION 4 — FEATURED WORK
  ================================================== */}
  <section className="py-20 lg:py-28 border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="Our Work"
        title="SELECTED WORK"
        description="Curated digital flagships, custom e-commerce stores, and spatial web experiences."
        rightElement={
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#0A0A0A] hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
          >
            <span>View All Work</span>

            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        }
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  </section>

  {/* ==================================================
      SECTION 5 — NUMBERS / CAPABILITIES
  ================================================== */}
  <section className="py-20 lg:py-24 bg-white border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Engineering Standards
          </p>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A]">
            BUILT ON VERIFIABLE CAPABILITIES
          </h2>
        </div>

        <p className="font-mono-tech text-xs text-neutral-500">
          Structured for measurable studio benchmarks
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#0A0A0A]/12">
        {SITE_CONFIG.capabilities.map((cap) => (
          <div
            key={cap.index}
            className="p-7 sm:p-8 border-r border-b border-[#0A0A0A]/12 flex flex-col justify-between bg-[#F5F5F2]/40"
          >
            <div>
              <span className="font-mono-tech text-xs text-neutral-400 block mb-6">
                {cap.index}
              </span>

              <h3 className="font-display text-3xl sm:text-4xl text-[#0A0A0A] mb-2">
                {cap.title}
              </h3>

              <p className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500 mb-4">
                {cap.subtitle}
              </p>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">
              {cap.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ==================================================
      SECTION 6 — PROCESS
  ================================================== */}
  <section className="py-20 lg:py-28 border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="Our Process"
        title="HOW WE WORK"
        description="A transparent six-stage methodology from initial discovery to post-launch engineering care."
      />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 relative">
        {SITE_CONFIG.process.map((step, idx) => (
          <div
            key={step.number}
            className="relative flex flex-col"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-full border border-[#0A0A0A]/25 bg-white flex items-center justify-center font-mono-tech text-xs font-semibold text-[#0A0A0A] shrink-0">
                {step.number}
              </span>

              {idx <
                SITE_CONFIG.process.length - 1 && (
                <div
                  className="hidden lg:block h-[1px] flex-1 border-t border-dashed border-[#0A0A0A]/25"
                  aria-hidden="true"
                />
              )}
            </div>

            <h3 className="font-display text-2xl tracking-wide text-[#0A0A0A] mb-2">
              {step.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 flex-1">
              {step.description}
            </p>

            <p className="font-mono-tech text-[11px] text-neutral-500 pt-3 border-t border-[#0A0A0A]/10">
              {step.deliverables}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ==================================================
      SECTION 7 — INDUSTRIES
  ================================================== */}
  <section className="py-20 lg:py-28 bg-white border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="Sectors & Domains"
        title="BUILT FOR AMBITIOUS BUSINESSES"
        description="Select an industry below to inspect how we tailor digital architecture for specialized markets."
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Interactive Industry List */}
        <div className="lg:col-span-6 divide-y divide-[#0A0A0A]/12 border-t border-b border-[#0A0A0A]/12">
          {SITE_CONFIG.industries.map(
            (industry, idx) => {
              const isSelected =
                idx === activeIndustryIndex;

              return (
                <button
                  key={industry.id}
                  type="button"
                  onMouseEnter={() =>
                    setActiveIndustryIndex(idx)
                  }
                  onFocus={() =>
                    setActiveIndustryIndex(idx)
                  }
                  onClick={() =>
                    setActiveIndustryIndex(idx)
                  }
                  aria-pressed={isSelected}
                  className={`w-full py-4 px-3 flex items-center justify-between text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0A0A0A] ${
                    isSelected
                      ? 'bg-[#0A0A0A] text-[#F5F5F2]'
                      : 'hover:bg-[#F5F5F2] text-[#0A0A0A]'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono-tech text-xs ${
                        isSelected
                          ? 'text-neutral-400'
                          : 'text-neutral-400'
                      }`}
                    >
                      0{idx + 1}
                    </span>

                    <span className="font-display text-2xl sm:text-3xl tracking-wide">
                      {industry.name}
                    </span>
                  </div>

                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected
                        ? 'text-white translate-x-0.5 -translate-y-0.5'
                        : 'text-neutral-400'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            },
          )}
        </div>

        {/* Right Industry Visual Preview Panel */}
        {activeIndustry && (
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl bg-[#0A0A0A] text-[#F5F5F2] overflow-hidden border border-[#0A0A0A]/15">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#141414]">
              <ResilientImage
                src={
                  activeIndustry.previewImage
                }
                alt={activeIndustry.name}
                fallbackLabel={
                  activeIndustry.name
                }
                className="w-full h-full object-cover object-center transition-all duration-500"
                containerClassName="w-full h-full"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute bottom-4 left-6">
                <span className="font-mono-tech text-xs uppercase tracking-widest text-neutral-300">
                  Sector Focus ·{' '}
                  {activeIndustry.name}
                </span>
              </div>
            </div>

            <div className="p-7 sm:p-9 space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                {activeIndustry.headline}
              </h3>

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                {activeIndustry.description}
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="font-mono-tech text-xs text-neutral-300">
                  {activeIndustry.focus}
                </span>

                <Link
                  to="/book"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-wider text-white hover:underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                >
                  <span>
                    Discuss Sector Project
                  </span>

                  <ArrowRight
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </section>

  {/* ==================================================
      SECTIONS 8, 9 & 10 — EDITORIAL STUDIO TRIAD
  ================================================== */}
  <section className="py-20 lg:py-28 border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
        {/* SECTION 8 — ABOUT PREVIEW */}
        <div className="lg:col-span-4 flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#0A0A0A]/10">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
              About Us
            </p>

            <h2 className="font-display text-4xl sm:text-5xl text-[#0A0A0A] mb-5">
              BUILT WITH INTENTION.
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              Novariyan was founded on a clear
              conviction: websites should do more than
              occupy a domain. We combine design clarity,
              modern frontend engineering, performance,
              and business strategy to create digital
              experiences designed to endure.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm font-medium text-[#0A0A0A] mb-8">
              <li className="flex items-center gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#0A0A0A] shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Bespoke Editorial &amp; Modern UI
                  Systems
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#0A0A0A] shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Clean, Maintainable TypeScript
                  Codebases
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#0A0A0A] shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Technical SEO &amp; Core Web Vitals
                  Focus
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#0A0A0A] shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Direct Founder-Led Communication
                </span>
              </li>
            </ul>
          </div>

          <div>
            <OrbitalSculpture3D
              theme="light"
              variant="orbital"
              className="w-full h-44 mb-4"
            />

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#0A0A0A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            >
              <span>
                More About Novariyan
              </span>

              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* SECTION 9 — FOUNDER */}
        <div className="lg:col-span-4 flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#0A0A0A]/10">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
              The Person Behind Novariyan
            </p>

            <h2 className="font-display text-4xl sm:text-5xl text-[#0A0A0A]">
              {SITE_CONFIG.founder.name}
            </h2>

            <p className="text-xs font-mono-tech text-neutral-500 mt-1 mb-5">
              {SITE_CONFIG.founder.role}
            </p>

            <div className="relative aspect-[4/4] w-full rounded-xl overflow-hidden bg-[#141414] mb-5">
              <ResilientImage
                src={SITE_CONFIG.founder.image}
                alt={`${SITE_CONFIG.founder.name} — ${SITE_CONFIG.founder.role}`}
                fallbackLabel="FOUNDER PORTRAIT PLACEHOLDER"
                className="w-full h-full object-cover object-center"
                containerClassName="w-full h-full"
              />
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
              {SITE_CONFIG.founder.shortBio}
            </p>
          </div>

          <div className="pt-4 border-t border-[#0A0A0A]/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              {SITE_CONFIG.founder.socials.map(
                (social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full border border-[#0A0A0A]/20 text-[11px] font-mono-tech uppercase text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F5F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
                  >
                    {social.label}
                  </a>
                ),
              )}
            </div>

            <Link
              to="/about"
              className="font-mono-tech text-xs uppercase tracking-wider text-[#0A0A0A] hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            >
              Full Bio →
            </Link>
          </div>
        </div>

        {/* SECTION 10 — TESTIMONIALS */}
        <div className="lg:col-span-4 flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#0A0A0A]/10">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
              Client Feedback
            </p>

            <h2 className="font-display text-4xl sm:text-5xl text-[#0A0A0A] mb-6">
              WHAT CLIENTS SAY
            </h2>

            {hasTestimonials &&
            currentTestimonial ? (
              <div
                className="p-6 rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/8 mb-6"
                aria-live="polite"
              >
                <div
                  className="font-display text-4xl text-[#0A0A0A] leading-none mb-3"
                  aria-hidden="true"
                >
                  “
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                  {currentTestimonial.quote}
                </p>

                <div className="pt-4 border-t border-[#0A0A0A]/10">
                  <div className="font-semibold text-sm text-[#0A0A0A]">
                    {currentTestimonial.clientName}
                  </div>

                  <div className="text-xs text-neutral-500 mt-0.5">
                    {currentTestimonial.role} ·{' '}
                    {currentTestimonial.company}
                  </div>

                  <div className="text-[11px] font-mono-tech text-neutral-500 mt-1">
                    Project:{' '}
                    {currentTestimonial.projectType}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/8 mb-6">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Client feedback will be published
                  here as verified testimonials become
                  available.
                </p>
              </div>
            )}
          </div>

          <div>
            {hasTestimonials &&
              currentTestimonial && (
                <div className="flex items-center justify-between pt-4 border-t border-[#0A0A0A]/10">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center gap-0.5 mr-2"
                      aria-label={`${currentTestimonial.rating} out of 5 stars`}
                    >
                      {Array.from({
                        length:
                          currentTestimonial.rating ?? 0,
                      }).map((_, index) => (
                        <Star
                          key={index}
                          className="w-3.5 h-3.5 fill-[#0A0A0A] text-[#0A0A0A]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {TESTIMONIALS_DATA.map(
                        (item, idx) => {
                          const active =
                            idx ===
                            activeTestimonialIndex;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() =>
                                setActiveTestimonialIndex(
                                  idx,
                                )
                              }
                              aria-label={`View testimonial ${idx + 1}`}
                              aria-pressed={active}
                              className={`w-2 h-2 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
                                active
                                  ? 'bg-[#0A0A0A] w-4'
                                  : 'bg-[#0A0A0A]/25'
                              }`}
                            />
                          );
                        },
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={
                        handlePrevTestimonial
                      }
                      aria-label="Previous testimonial"
                      className="w-9 h-9 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center hover:bg-[#0A0A0A] hover:text-[#F5F5F2] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
                    >
                      <ArrowLeft
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={
                        handleNextTestimonial
                      }
                      aria-label="Next testimonial"
                      className="w-9 h-9 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center hover:bg-[#0A0A0A] hover:text-[#F5F5F2] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
                    >
                      <ArrowRight
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              )}

            <div className="mt-4">
              <Link
                to="/reviews"
                className="font-mono-tech text-xs uppercase tracking-wider text-[#0A0A0A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
              >
                View Full Reviews Archive →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ==================================================
      SECTION 11 — BLOG / INSIGHTS
  ================================================== */}
  <section className="py-20 lg:py-28 bg-white">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="Journal & Perspectives"
        title="INSIGHTS"
        description="Technical notes on web architecture, digital design systems, and search visibility."
        rightElement={
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#0A0A0A] hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
          >
            <span>All Articles</span>

            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        }
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-7">
        {BLOG_DATA.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-[#0A0A0A]/12 bg-[#F5F5F2] overflow-hidden hover:border-[#0A0A0A]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
          >
            <div>
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#141414]">
                <ResilientImage
                  src={post.heroImage}
                  alt={post.title}
                  fallbackLabel={post.category}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-2 font-mono-tech text-xs text-neutral-500 mb-3">
                  <span>{post.category}</span>
                  <span
                    aria-hidden="true"
                  >
                    ·
                  </span>
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-[#0A0A0A] mb-3 group-hover:underline">
                  {post.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#0A0A0A]/10 flex items-center justify-between">
              <span className="font-mono-tech text-xs text-neutral-500">
                {post.date}
              </span>

              <span className="inline-flex items-center gap-1 font-mono-tech text-xs uppercase tracking-wider text-[#0A0A0A]">
                <span>Read Article</span>

                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>

  {/* ==================================================
      SECTION 12 — BOOKING CTA
  ================================================== */}
  <BookingCTA />
</div>

);
};
