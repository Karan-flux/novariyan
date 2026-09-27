import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

import { SERVICES_DATA } from '../data/services';
import { SITE_CONFIG } from '../config/site';
import { useSEO } from '../lib/seo';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { BookingCTA } from '../components/BookingCTA';
import { OrbitalSculpture3D } from '../components/3D/OrbitalSculpture3D';

export const Services: React.FC = () => {
useSEO({
title:
'Web Development, Design, E-Commerce & 3D Services | NOVARIYAN',
description:
'Explore Novariyan’s six core capabilities: custom web development, editorial web design, e-commerce flagships, 3D WebGL experiences, technical SEO, and website maintenance.',
path: '/services',
});

return ( <div className="bg-[#F5F5F2] text-[#0A0A0A]">
{/* ==================================================
HERO
================================================== */} <section className="py-16 lg:py-24 bg-architectural-grid border-b border-[#0A0A0A]/12"> <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12"> <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"> <div className="lg:col-span-8"> <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
Capabilities & Disciplines </p>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#0A0A0A] mb-6">
            END-TO-END DIGITAL ARCHITECTURE.
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mb-8">
            We partner with ambitious businesses from
            initial digital strategy and visual design
            through custom frontend engineering, spatial
            3D WebGL, technical SEO, and ongoing
            post-launch care.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              to="/book"
              variant="primary"
              size="lg"
            >
              Book a Discovery Call
            </Button>

            <Button
              to="/work"
              variant="outline-dark"
              size="lg"
            >
              Explore Case Studies
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-2xl bg-[#0A0A0A] p-6 border border-[#0A0A0A]/15">
            <OrbitalSculpture3D
              theme="dark"
              variant="monolith"
              className="w-full h-64"
            />

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 text-xs font-mono-tech text-neutral-400">
              <span>
                {String(SERVICES_DATA.length).padStart(
                  2,
                  '0',
                )}{' '}
                DISCIPLINES
              </span>

              <span>CUSTOM ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ==================================================
      SERVICES GRID
  ================================================== */}
  <section className="py-20 lg:py-28 bg-[#0A0A0A] text-[#F5F5F2]">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="Core Capabilities"
        title="WHAT WE BUILD"
        description="Select any discipline below to inspect our technical approach, deliverables, and architecture."
        theme="dark"
      />

      {SERVICES_DATA.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              theme="dark"
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-white/10 p-8 text-sm text-neutral-400">
          Service information is currently being
          prepared.
        </div>
      )}
    </div>
  </section>

  {/* ==================================================
      DETAILED BREAKDOWN LIST
  ================================================== */}
  <section className="py-20 lg:py-28 border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="Deliverables Matrix"
        title="ARCHITECTURAL SCOPE"
        description="Every engagement is scoped transparently around concrete engineering and design deliverables."
      />

      {SERVICES_DATA.length > 0 ? (
        <div className="mt-12 divide-y divide-[#0A0A0A]/12 border-t border-b border-[#0A0A0A]/12">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4">
                <span className="font-mono-tech text-xs text-neutral-500 block mb-2">
                  {service.number}
                </span>

                <h3 className="font-display text-3xl sm:text-4xl text-[#0A0A0A] mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                  {service.shortDescription}
                </p>

                <Link
                  to={`/services/${service.slug}`}
                  aria-label={`View ${service.title} specification`}
                  className="group inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#0A0A0A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 rounded-sm"
                >
                  <span>
                    View {service.title} Specification
                  </span>

                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="lg:col-span-5">
                <p className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500 mb-4">
                  Key Deliverables
                </p>

                {service.deliverables.length > 0 ? (
                  <ul className="space-y-2.5">
                    {service.deliverables.map(
                      (item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-[#0A0A0A]"
                        >
                          <Check
                            className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />

                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-neutral-500">
                    Deliverables will be defined during
                    project scoping.
                  </p>
                )}
              </div>

              <div className="lg:col-span-3">
                <p className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500 mb-4">
                  Core Stack &amp; Tools
                </p>

                {service.technologies.length > 0 ? (
                  <div className="text-xs font-mono-tech text-neutral-700 leading-relaxed">
                    {service.technologies.join(' · ')}
                  </div>
                ) : (
                  <p className="text-xs font-mono-tech text-neutral-500 leading-relaxed">
                    Technology selection is based on
                    project requirements.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 border-t border-b border-[#0A0A0A]/12 py-12 text-sm text-neutral-600">
          Detailed service specifications are currently
          being prepared.
        </div>
      )}
    </div>
  </section>

  {/* ==================================================
      PROCESS
  ================================================== */}
  <section className="py-20 lg:py-24 bg-white">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="Execution Methodology"
        title="HOW WE DELIVER"
        description="Structured six-stage execution from initial discovery to post-launch continuity."
      />

      {SITE_CONFIG.process.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {SITE_CONFIG.process.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-2xl bg-[#F5F5F2] border border-[#0A0A0A]/10 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono-tech text-xs text-neutral-500 block mb-4">
                  {step.number}
                </span>

                <h3 className="font-display text-2xl text-[#0A0A0A] mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <p className="font-mono-tech text-[11px] text-neutral-500 mt-5 pt-3 border-t border-[#0A0A0A]/10">
                {step.deliverables}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 border-t border-[#0A0A0A]/12 pt-8 text-sm text-neutral-600">
          Our delivery methodology is currently being
          prepared.
        </div>
      )}
    </div>
  </section>

  <BookingCTA />
</div>

);
};
