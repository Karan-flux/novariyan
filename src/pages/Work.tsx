import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
PROJECT_FILTERS,
ProjectCategory,
PROJECTS_DATA,
} from '../data/projects';
import { useSEO } from '../lib/seo';
import { ProjectCard } from '../components/ProjectCard';
import { BookingCTA } from '../components/BookingCTA';

export const Work: React.FC = () => {
useSEO({
title: 'Selected Work & Web Development Case Studies | NOVARIYAN',
description:
'Explore Novariyan’s selected web development, luxury e-commerce, real estate, hospitality, and 3D WebGL digital case studies.',
path: '/work',
});

const [selectedFilter, setSelectedFilter] =
useState<ProjectCategory>('ALL');

const filteredProjects =
selectedFilter === 'ALL'
? PROJECTS_DATA
: PROJECTS_DATA.filter((project) =>
project.categories.includes(selectedFilter),
);

return ( <div className="bg-[#F5F5F2] text-[#0A0A0A]">
{/* ==================================================
HERO
================================================== */} <section className="py-16 lg:py-24 bg-architectural-grid border-b border-[#0A0A0A]/12"> <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12"> <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
Selected Works & Case Studies </p>

      <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#0A0A0A] mb-6">
        ENGINEERED DIGITAL FLAGSHIPS.
      </h1>

      <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mb-10">
        A curated archive of concept case studies across real estate,
        luxury commerce, hospitality, and digital technology. Project
        details and measurable outcomes can be updated as verified
        production work is added.
      </p>

      {/* ==================================================
          PROJECT FILTERS
      ================================================== */}
      {PROJECT_FILTERS.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#0A0A0A]/10"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {PROJECT_FILTERS.map((category) => {
            const isActive = selectedFilter === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="project-results"
                onClick={() =>
                  setSelectedFilter(category)
                }
                className={`px-4 py-2 rounded-full font-mono-tech text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-[#0A0A0A] text-[#F5F5F2]'
                    : 'bg-white text-neutral-600 border border-[#0A0A0A]/12 hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}
    </div>
  </section>

  {/* ==================================================
      PORTFOLIO GRID
  ================================================== */}
  <section
    id="project-results"
    role="tabpanel"
    aria-label={`${selectedFilter} projects`}
    className="py-16 lg:py-24"
  >
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-neutral-500">
        <span aria-live="polite">
          SHOWING {filteredProjects.length} OF{' '}
          {PROJECTS_DATA.length} PROJECTS
        </span>

        <span>
          FILTER: {selectedFilter}
        </span>
      </div>

      {filteredProjects.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-[#0A0A0A]/10 bg-white p-10 text-center">
          <p className="font-display text-2xl text-[#0A0A0A] mb-2">
            NO PROJECTS IN THIS FILTER.
          </p>

          <p className="text-sm text-neutral-600">
            Try another category to explore the current portfolio.
          </p>
        </div>
      )}
    </div>
  </section>

  <BookingCTA />
</div>

);
};
