import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { useSEO } from '../lib/seo';
import { TestimonialCard } from '../components/TestimonialCard';
import { BookingCTA } from '../components/BookingCTA';

const SERVICE_FILTERS = [
  'ALL',
  'Web Development',
  'Web Design',
  'E-Commerce',
  '3D & Interactive',
  'SEO Optimization',
] as const;

export const Reviews: React.FC = () => {
  useSEO({
    title: 'Client Reviews & Testimonials Archive | NOVARIYAN',
    description:
      'Client review and testimonial structure for Novariyan across custom web development, web design, e-commerce, and 3D interactive projects.',
    path: '/reviews',
  });

  const [selectedService, setSelectedService] =
    useState<(typeof SERVICE_FILTERS)[number]>('ALL');

  const filteredTestimonials =
    selectedService === 'ALL'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((t) => t.serviceCategory === selectedService);

  return (
    <div className="bg-[#F5F5F2] text-[#0A0A0A]">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-architectural-grid border-b border-[#0A0A0A]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
            <span>Client Feedback Archive</span>
            <span aria-hidden="true">·</span>
            <span>Placeholder Structure Ready for Verified Reviews</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#0A0A0A] mb-6">
            WHAT OUR CLIENTS SAY.
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mb-10">
            Below is the structured testimonial archive for Novariyan. All entries are explicitly marked as placeholder slots until verified client quotes and video reels are added.
          </p>

          {/* Service Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#0A0A0A]/10"
            role="tablist"
            aria-label="Filter reviews by service"
          >
            {SERVICE_FILTERS.map((filter) => {
              const active = selectedService === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedService(filter)}
                  className={`px-4 py-2 rounded-full font-mono-tech text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#0A0A0A] text-[#F5F5F2]'
                      : 'bg-white text-neutral-600 border border-[#0A0A0A]/12 hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTestimonials.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </div>
  );
};
