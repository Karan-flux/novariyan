import React from 'react';
import { Star, Video } from 'lucide-react';
import { TestimonialItem } from '../data/testimonials';

interface TestimonialCardProps {
testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
testimonial,
}) => {
const rating = Math.min(
5,
  Math.max(0, Math.round(testimonial.rating ?? 0)),
);

const isPlaceholder = testimonial.isPlaceholder === true;

return ( <article className="flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white border border-[#0A0A0A]/10"> <div> <div className="flex items-center justify-between gap-4 mb-6">
<div
className="flex items-center gap-1"
aria-label={`${rating} out of 5 stars`}
role="img"
>
{Array.from({ length: 5 }).map((_, idx) => {
const filled = idx < rating;


          return (
            <Star
              key={idx}
              className={`w-4 h-4 ${
                filled
                  ? 'fill-[#0A0A0A] text-[#0A0A0A]'
                  : 'text-[#0A0A0A]/20'
              }`}
              aria-hidden="true"
            />
          );
        })}
      </div>

      {isPlaceholder && (
        <span className="font-mono-tech text-[11px] uppercase tracking-wider text-neutral-500">
          Placeholder Review Slot
        </span>
      )}
    </div>

    <blockquote className="text-base sm:text-lg leading-relaxed text-[#0A0A0A] mb-8">
      “{testimonial.quote}”
    </blockquote>
  </div>

  <div>
    {testimonial.hasVideoPlaceholder && (
      <div
        className="mb-6 p-4 rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/10 flex items-center justify-between"
        aria-label="Video testimonial placeholder"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full bg-[#0A0A0A] text-[#F5F5F2] flex items-center justify-center"
            aria-hidden="true"
          >
            <Video className="w-3.5 h-3.5" />
          </div>

          <span className="text-xs font-medium text-[#0A0A0A]">
            Video Testimonial Slot (Replace with Client Reel)
          </span>
        </div>

        <span className="font-mono-tech text-[11px] text-neutral-500">
          01:15
        </span>
      </div>
    )}

    <div className="pt-5 border-t border-[#0A0A0A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div>
        <div className="font-semibold text-sm text-[#0A0A0A]">
          {testimonial.clientName}
        </div>

        <div className="text-xs text-neutral-500 mt-0.5">
          {testimonial.role} · {testimonial.company}
        </div>
      </div>

      <div className="text-xs font-mono-tech text-neutral-500">
        {testimonial.projectType}
      </div>
    </div>
  </div>
</article>


);
};
