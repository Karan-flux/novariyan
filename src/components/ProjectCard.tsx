import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { ProjectItem } from '../data/projects';
import { ResilientImage } from './ResilientImage';

interface ProjectCardProps {
project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
project,
}) => {
return (
<Link
to={`/work/${project.slug}`}
aria-label={`View ${project.title} concept case study`}
className="group block rounded-2xl overflow-hidden bg-[#0A0A0A] text-[#F5F5F2] border border-[#0A0A0A]/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F5F2]"
> <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#141414]">
<ResilientImage
src={project.heroImage}
alt={`${project.title} — Novariyan concept project in the ${project.industry} sector`}
fallbackLabel={project.title}
className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
containerClassName="w-full h-full"
/>

    {/* Measured contrast scrim */}
    <div
      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"
      aria-hidden="true"
    />

    {/* Editorial index number */}
    <div className="absolute top-5 left-6 z-10">
      <span className="font-mono-tech text-xs tracking-widest text-white/80">
        {project.number} · {project.year}
      </span>
    </div>
  </div>

  {/* Bottom project caption bar */}
  <div className="p-6 sm:p-7 bg-[#0A0A0A] flex items-center justify-between gap-4 border-t border-white/10">
    <div className="min-w-0">
      <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white truncate">
        {project.title}
      </h3>

      {/* Project metadata */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mt-1.5">
        <span>{project.industry}</span>

        <span aria-hidden="true">·</span>

        <span>
          {project.services.slice(0, 2).join(' / ')}
        </span>
      </div>
    </div>

    <span
      className="w-10 h-10 rounded-full bg-[#F5F5F2] text-[#0A0A0A] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <ArrowRight className="w-4 h-4" />
    </span>
  </div>
</Link>

);
};
