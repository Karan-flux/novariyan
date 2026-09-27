
import React, { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
} from 'lucide-react';

import { SERVICES_DATA } from '../data/services';
import { PROJECTS_DATA } from '../data/projects';
import { useSEO } from '../lib/seo';

import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { BookingCTA } from '../components/BookingCTA';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const normalizedSlug = slug?.trim().toLowerCase() ?? '';

  const service = useMemo(
    () =>
      SERVICES_DATA.find(
        (item) => item.slug.toLowerCase() === normalizedSlug,
      ),
    [normalizedSlug],
  );

  useSEO({
    title: service
      ? `${service.title} | NOVARIYAN`
      : 'Service Not Found | NOVARIYAN',
    description: service
      ? service.shortDescription
      : 'Explore Novariyan services across web development, design, e-commerce, 3D experiences, technical SEO, and website maintenance.',
    path: service ? `/services/${service.slug}` : '/services',
  });

  if (!service) {
    return (
      <main
        className="min-h-[75vh] bg-[#F5F5F2] px-5 py-24 text-[#0A0A0A] sm:px-8 lg:px-12"
        aria-labelledby="service-not-found-title"
      >
        <div className="mx-auto flex min-h-[55vh] max-w-[1000px] flex-col items-center justify-center text-center">
          <p className="mb-5 font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500">
            Service Specification
          </p>

          <h1
            id="service-not-found-title"
            className="font-display text-6xl leading-none tracking-tight sm:text-8xl"
          >
            SERVICE NOT FOUND.
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
            The service specification you requested does not exist or may
            have moved.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/services" variant="primary" size="lg">
              View All Services
            </Button>

            <Button to="/contact" variant="outline-dark" size="lg">
              Contact Novariyan
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const relatedServices = SERVICES_DATA.filter(
    (item) => item.slug !== service.slug,
  ).slice(0, 3);

  const relatedProjects = PROJECTS_DATA.filter(
    (project) => project.featured,
  ).slice(0, 2);

  const processSteps = service.processSummary;
  const specializedSections = service.specializedSections;
  const faqs = service.faqs;

  return (
    <div className="bg-[#F5F5F2] text-[#0A0A0A]">
      {/* ==================================================
          HERO
      ================================================== */}
      <section className="border-b border-[#0A0A0A]/12 bg-architectural-grid py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="mb-10 inline-flex min-h-10 items-center gap-2 rounded-sm font-mono-tech text-xs uppercase tracking-wider text-neutral-500 transition-colors hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            aria-label="Back to all services"
          >
            <ArrowLeft
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            Back to Services
          </button>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500">
                  {service.number}
                </span>

                <span
                  className="h-px w-8 bg-[#0A0A0A]/20"
                  aria-hidden="true"
                />

                <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500">
                  Service Specification
                </span>
              </div>

              <h1 className="font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl lg:text-9xl">
                {service.title}
              </h1>

              <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
                {service.shortDescription}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button to="/book" variant="primary" size="lg">
                  Start a Project
                </Button>

                <Button to="/contact" variant="outline-dark" size="lg">
                  Discuss Your Requirements
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-[#0A0A0A]/10 bg-white p-6">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500">
                    Architecture
                  </span>

                  <span className="font-mono-tech text-xs text-neutral-400">
                    {service.number}
                  </span>
                </div>

                <div
                  className="flex h-40 items-center justify-center rounded-xl bg-[#0A0A0A] p-6"
                  aria-hidden="true"
                >
                  <div className="h-20 w-20 rotate-45 border border-white/30">
                    <div className="flex h-full w-full -rotate-45 items-center justify-center">
                      <div className="h-8 w-8 rounded-full border border-white/50" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#0A0A0A]/10 pt-5">
                  <p className="font-mono-tech text-[11px] uppercase leading-5 tracking-wider text-neutral-500">
                    Custom architecture shaped around project requirements,
                    business goals, and technical constraints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          OVERVIEW / DELIVERABLES
      ================================================== */}
      <section className="border-b border-[#0A0A0A]/12 py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Scope & Deliverables"
            title="WHAT WE DELIVER"
            description="A clearly defined technical scope built around the requirements of your project."
          />

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {service.deliverables.length > 0 ? (
                <ul className="divide-y divide-[#0A0A0A]/10 border-y border-[#0A0A0A]/10">
                  {service.deliverables.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-start gap-5 py-5"
                    >
                      <span className="pt-0.5 font-mono-tech text-[11px] text-neutral-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="flex items-start gap-3">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />

                        <span className="text-sm leading-6 text-neutral-800 sm:text-base">
                          {item}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="border-y border-[#0A0A0A]/10 py-8 text-sm text-neutral-600">
                  Deliverables will be defined during project discovery and
                  technical scoping.
                </p>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0A0A0A] p-7 text-[#F5F5F2] sm:p-8">
                <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-white/45">
                  Core Stack & Tools
                </p>

                {service.technologies.length > 0 ? (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {service.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-white/15 px-3 py-2 font-mono-tech text-[11px] uppercase tracking-wider text-white/75"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-7 text-sm leading-6 text-white/55">
                    Technology selection is determined by the requirements
                    of each engagement.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SPECIALIZED APPROACH
      ================================================== */}
      {specializedSections.length > 0 && (
        <section className="bg-[#0A0A0A] py-20 text-[#F5F5F2] lg:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Specialized Architecture"
              title="HOW WE APPROACH IT"
              description="The technical considerations that shape this discipline."
              theme="dark"
            />

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
              {specializedSections.map((section, index) => (
                <article
                  key={`${section.title}-${index}`}
                  className="bg-[#0A0A0A] p-7 sm:p-9"
                >
                  <span className="font-mono-tech text-xs text-white/35">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h2 className="mt-6 font-display text-3xl uppercase leading-none sm:text-4xl">
                    {section.title}
                  </h2>

                  {section.description && (
                    <p className="mt-5 text-sm leading-7 text-white/55">
                      {section.description}
                    </p>
                  )}

                  {section.items.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {section.items.map((item) => (
                        <li
                          key={item.title}
                          className="flex items-start gap-3 text-sm text-white/70"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-white/50"
                            aria-hidden="true"
                          />

                          <div>
                            <span className="font-medium text-white/85">
                              {item.title}
                            </span>

                            <p className="mt-1 leading-6 text-white/55">
                              {item.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          PROCESS
      ================================================== */}
      <section className="border-b border-[#0A0A0A]/12 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Execution"
            title="FROM BRIEF TO LAUNCH"
            description="A structured delivery process designed to keep decisions, scope, and implementation aligned."
          />

          {processSteps.length > 0 ? (
            <div className="mt-12 divide-y divide-[#0A0A0A]/10 border-y border-[#0A0A0A]/10">
              {processSteps.map((step) => (
                <div
                  key={`${step.step}-${step.title}`}
                  className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-12 sm:gap-8"
                >
                  <div className="sm:col-span-2">
                    <span className="font-mono-tech text-xs text-neutral-400">
                      {step.step}
                    </span>
                  </div>

                  <div className="sm:col-span-4">
                    <h3 className="font-display text-3xl uppercase leading-none">
                      {step.title}
                    </h3>
                  </div>

                  <div className="sm:col-span-6">
                    <p className="text-sm leading-7 text-neutral-600">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 border-y border-[#0A0A0A]/10 py-10 text-sm text-neutral-600">
              A project-specific delivery process will be defined during
              discovery.
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          FAQ
      ================================================== */}
      {faqs.length > 0 && (
        <section className="border-b border-[#0A0A0A]/12 py-20 lg:py-28">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
            <SectionHeading
              eyebrow="Questions"
              title="SERVICE FAQ"
              description="Practical answers to common questions about this service."
            />

            <div className="mt-12 divide-y divide-[#0A0A0A]/10 border-y border-[#0A0A0A]/10">
              {faqs.map((faq, index) => {
                const faqId = `${service.slug}-faq-${index}`;

                return (
                  <details
                    key={`${faq.question}-${index}`}
                    className="group"
                  >
                    <summary
                      aria-controls={faqId}
                      className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden"
                    >
                      <span className="text-sm font-semibold leading-6 sm:text-base">
                        {faq.question}
                      </span>

                      <ChevronDown
                        className="h-5 w-5 shrink-0 text-neutral-400 transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>

                    <div
                      id={faqId}
                      className="max-w-3xl pb-7 pr-8 text-sm leading-7 text-neutral-600"
                    >
                      {faq.answer}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          RELATED CASE STUDIES
      ================================================== */}
      {relatedProjects.length > 0 && (
        <section className="bg-[#F5F5F2] py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500">
                  Selected Work
                </p>

                <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
                  RELATED CASE STUDIES.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600">
                  Explore selected concept case studies that relate to this
                  discipline.
                </p>
              </div>

              <Link
                to="/work"
                className="group inline-flex min-h-10 items-center gap-2 self-start rounded-sm font-mono-tech text-xs uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-4 sm:self-auto"
              >
                View All Work
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/work/${project.slug}`}
                  className="group rounded-2xl border border-[#0A0A0A]/10 bg-white p-7 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-4 sm:p-9"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-mono-tech text-xs uppercase tracking-wider text-neutral-400">
                      Concept Case Study
                    </span>

                    <ArrowRight
                      className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-12 font-display text-4xl uppercase leading-none sm:text-5xl">
                    {project.title}
                  </h3>

                  <p className="mt-5 font-mono-tech text-[11px] uppercase tracking-wider text-neutral-500">
                    Explore Project Specification
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          RELATED SERVICES
      ================================================== */}
      {relatedServices.length > 0 && (
        <section className="border-t border-[#0A0A0A]/12 bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Adjacent Disciplines"
              title="OTHER CAPABILITIES"
              description="Additional disciplines that can complement this engagement."
            />

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedServices.map((item) => (
                <Link
                  key={item.id}
                  to={`/services/${item.slug}`}
                  className="group rounded-2xl border border-[#0A0A0A]/10 p-6 transition-colors hover:border-[#0A0A0A]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-4"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="font-mono-tech text-xs text-neutral-400">
                      {item.number}
                    </span>

                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-10 font-display text-3xl uppercase leading-none">
                    {item.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-600">
                    {item.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          CTA
      ================================================== */}
      <BookingCTA />
    </div>
  );
};
