import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
ArrowLeft,
ArrowRight,
Expand,
X,
} from 'lucide-react';

import {
getProjectBySlug,
PROJECTS_DATA,
} from '../data/projects';
import { useSEO } from '../lib/seo';
import { Button } from '../components/Button';
import { ResilientImage } from '../components/ResilientImage';
import { BookingCTA } from '../components/BookingCTA';

export const ProjectDetail: React.FC = () => {
const { project: projectSlug } = useParams<{
project: string;
}>();

const normalizedProjectSlug =
projectSlug?.trim() || '';

const project = normalizedProjectSlug
? getProjectBySlug(normalizedProjectSlug)
: undefined;

const [lightboxImage, setLightboxImage] =
useState<{
src: string;
caption: string;
} | null>(null);

useSEO({
title: project
? `${project.title} — ${project.industry} Case Study | NOVARIYAN`
: 'Case Study | NOVARIYAN',
description: project
? project.summary
: 'Novariyan web development case study.',
path: project
? `/work/${project.slug}`
: '/work',
});

useEffect(() => {
if (!lightboxImage) {
return;
}


const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    setLightboxImage(null);
  }
};

window.addEventListener('keydown', handleKeyDown);

return () => {
  window.removeEventListener(
    'keydown',
    handleKeyDown,
  );
};


}, [lightboxImage]);

if (!project) {
return <Navigate to="/work" replace />;
}

const currentIndex = PROJECTS_DATA.findIndex(
(item) => item.slug === project.slug,
);

const hasMultipleProjects =
PROJECTS_DATA.length > 1 &&
currentIndex >= 0;

const nextProject = hasMultipleProjects
? PROJECTS_DATA[
(currentIndex + 1) % PROJECTS_DATA.length
]
: undefined;

const totalProjects = PROJECTS_DATA.length;

return ( <div className="bg-[#F5F5F2] text-[#0A0A0A]">
{/* ==================================================
TOP BREADCRUMB BAR
================================================== */} <div className="border-b border-[#0A0A0A]/10 bg-white"> <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between gap-4"> <Link
         to="/work"
         className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-neutral-600 hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 rounded-sm"
       > <ArrowLeft
           className="w-3.5 h-3.5"
           aria-hidden="true"
         />

        <span>Back to Selected Work</span>
      </Link>

      <span className="font-mono-tech text-xs text-neutral-500">
        CASE STUDY {project.number} /{' '}
        {String(totalProjects).padStart(2, '0')}
      </span>
    </div>
  </div>

  {/* ==================================================
      CASE STUDY HEADER
  ================================================== */}
  <section className="py-14 lg:py-20 border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.18em] text-neutral-500 mb-4">
        <span>{project.industry}</span>

        <span aria-hidden="true">·</span>

        <span>{project.year}</span>

        <span aria-hidden="true">·</span>

        <span>{project.clientPlaceholderNote}</span>
      </div>

      <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#0A0A0A] mb-8">
        {project.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#0A0A0A]/12">
        <div className="lg:col-span-6">
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Industry
            </p>

            <p className="text-sm font-medium text-[#0A0A0A]">
              {project.industry}
            </p>
          </div>

          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Services
            </p>

            <p className="text-sm font-medium text-[#0A0A0A]">
              {project.services.length > 0
                ? project.services.join(' · ')
                : 'Defined during project scoping'}
            </p>
          </div>

          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5">
              Year
            </p>

            <p className="text-sm font-mono-tech text-[#0A0A0A]">
              {project.year}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ==================================================
      HERO VISUAL
  ================================================== */}
  <section className="py-10 lg:py-14 bg-[#0A0A0A]">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/15 bg-[#141414]">
        <ResilientImage
          src={project.heroImage}
          alt={`${project.title} project visual`}
          fallbackLabel={project.title}
          className="w-full h-full object-cover object-center"
          containerClassName="w-full h-full"
        />
      </div>
    </div>
  </section>

  {/* ==================================================
      OVERVIEW, CHALLENGE & APPROACH
  ================================================== */}
  <section className="py-20 lg:py-28 border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500">
            01 · Project Overview
          </p>
        </div>

        <div className="lg:col-span-8">
          <p className="text-lg sm:text-xl text-[#0A0A0A] leading-relaxed">
            {project.overview}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-[#0A0A0A]/12">
        <div className="p-8 rounded-2xl bg-white border border-[#0A0A0A]/10">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
            02 · The Challenge
          </p>

          <h2 className="font-display text-3xl text-[#0A0A0A] mb-4">
            WHAT NEEDED TO CHANGE
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0A0A0A] text-[#F5F5F2]">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">
            03 · Strategic Approach
          </p>

          <h2 className="font-display text-3xl text-white mb-4">
            ARCHITECTURAL DIRECTION
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            {project.approach}
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* ==================================================
      DESIGN, DEVELOPMENT & TECHNOLOGY
  ================================================== */}
  <section className="py-20 lg:py-28 bg-white border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 p-7 rounded-2xl bg-[#F5F5F2] border border-[#0A0A0A]/10">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
            04 · Visual System
          </p>

          <h3 className="font-display text-3xl text-[#0A0A0A] mb-3">
            DESIGN EXECUTION
          </h3>

          <p className="text-sm text-neutral-600 leading-relaxed">
            {project.designDetails}
          </p>
        </div>

        <div className="lg:col-span-4 p-7 rounded-2xl bg-[#F5F5F2] border border-[#0A0A0A]/10">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
            05 · Engineering
          </p>

          <h3 className="font-display text-3xl text-[#0A0A0A] mb-3">
            DEVELOPMENT
          </h3>

          <p className="text-sm text-neutral-600 leading-relaxed">
            {project.developmentDetails}
          </p>
        </div>

        <div className="lg:col-span-4 p-7 rounded-2xl bg-[#F5F5F2] border border-[#0A0A0A]/10 flex flex-col justify-between">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
              06 · Technical Stack
            </p>

            <h3 className="font-display text-3xl text-[#0A0A0A] mb-4">
              TECHNOLOGY
            </h3>

            <p className="font-mono-tech text-xs text-neutral-700 leading-relaxed">
              {project.technologies.length > 0
                ? project.technologies.join(' · ')
                : 'Technology selection is based on project requirements.'}
            </p>
          </div>

          <div className="pt-6 border-t border-[#0A0A0A]/10 mt-6">
            <Button
              to="/book"
              variant="primary"
              size="sm"
            >
              Request Similar Architecture
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ==================================================
      RESULTS / CAPABILITIES
  ================================================== */}
  <section className="py-20 lg:py-24 border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
            07 · Deliverables &amp; Outcomes
          </p>

          <h2 className="font-display text-4xl sm:text-5xl text-[#0A0A0A]">
            PROJECT SPECIFICATIONS
          </h2>
        </div>

        <span className="font-mono-tech text-xs text-neutral-500">
          {project.resultsPlaceholder.notice}
        </span>
      </div>

      {project.resultsPlaceholder.metrics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.resultsPlaceholder.metrics.map(
            (metric) => (
              <div
                key={metric.label}
                className="p-7 rounded-2xl bg-white border border-[#0A0A0A]/10"
              >
                <p className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500 mb-2">
                  {metric.label}
                </p>

                <p className="font-display text-3xl sm:text-4xl text-[#0A0A0A] mb-2">
                  {metric.value}
                </p>

                <p className="text-xs sm:text-sm text-neutral-600">
                  {metric.context}
                </p>
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#0A0A0A]/10 bg-white p-8 text-sm text-neutral-600">
          Project outcomes will be added when verified
          production metrics are available.
        </div>
      )}
    </div>
  </section>

  {/* ==================================================
      GALLERY
  ================================================== */}
  <section className="py-20 lg:py-28 bg-white border-b border-[#0A0A0A]/12">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
        08 · Visual Archive
      </p>

      <h2 className="font-display text-4xl sm:text-5xl text-[#0A0A0A] mb-10">
        INTERFACE &amp; ART DIRECTION GALLERY
      </h2>

      {project.galleryImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.galleryImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="group rounded-2xl overflow-hidden border border-[#0A0A0A]/12 bg-[#0A0A0A]"
            >
              <button
                type="button"
                onClick={() =>
                  setLightboxImage(image)
                }
                aria-label={`Expand ${image.caption}`}
                className="relative block w-full aspect-[16/10] overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
              >
                <ResilientImage
                  src={image.src}
                  alt={image.caption}
                  fallbackLabel={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />

                <div
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  <Expand className="w-4 h-4" />
                </div>
              </button>

              <div className="p-4 bg-[#0A0A0A] text-xs font-mono-tech text-neutral-300 flex items-center justify-between gap-4">
                <span>{image.caption}</span>

                <span className="text-neutral-500 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#0A0A0A]/10 bg-[#F5F5F2] p-8 text-sm text-neutral-600">
          Project imagery is currently being prepared.
        </div>
      )}
    </div>
  </section>

  {/* ==================================================
      NEXT PROJECT NAVIGATION
  ================================================== */}
  {nextProject && (
    <section className="py-16 bg-[#F5F5F2]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-mono-tech text-xs uppercase tracking-widest text-neutral-500 mb-1">
            Next Case Study
          </p>

          <h3 className="font-display text-3xl sm:text-4xl text-[#0A0A0A]">
            {nextProject.title}
          </h3>
        </div>

        <Link
          to={`/work/${nextProject.slug}`}
          className="inline-flex items-center gap-3 rounded-full bg-[#0A0A0A] text-[#F5F5F2] px-6 py-3.5 text-xs font-mono-tech uppercase tracking-wider hover:bg-[#1F1F1F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
        >
          <span>Explore Next Project</span>

          <ArrowRight
            className="w-4 h-4"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  )}

  {/* ==================================================
      LIGHTBOX MODAL
  ================================================== */}
  {lightboxImage && (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${lightboxImage.caption} enlarged view`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setLightboxImage(null);
        }
      }}
    >
      <div className="max-w-5xl w-full">
        <div className="flex items-center justify-between gap-4 text-white mb-4">
          <span className="font-mono-tech text-xs">
            {lightboxImage.caption}
          </span>

          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <X
              className="w-4 h-4"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/15 bg-[#141414]">
          <ResilientImage
            src={lightboxImage.src}
            alt={lightboxImage.caption}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
        </div>
      </div>
    </div>
  )}

  <BookingCTA />
</div>


);
};
