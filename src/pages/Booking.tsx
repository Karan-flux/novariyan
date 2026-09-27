import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useSEO } from '../lib/seo';
import { BookingForm } from '../components/BookingForm';
import { WhatsAppCTA } from '../components/WhatsAppButton';
import { OrbitalSculpture3D } from '../components/3D/OrbitalSculpture3D';

export const Booking: React.FC = () => {
  useSEO({
    title: 'Book a Free Discovery Consultation | NOVARIYAN',
    description:
      'Request a 1-on-1 discovery consultation with Novariyan to discuss your custom web development, web design, e-commerce, or 3D website project.',
    path: '/book',
  });

  return (
    <div className="bg-[#F5F5F2] text-[#0A0A0A]">
      <section className="py-16 lg:py-24 bg-architectural-grid">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                  Discovery &amp; Strategy Call
                </p>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight text-[#0A0A0A] mb-5">
                  REQUEST A CONSULTATION.
                </h1>

                <p className="text-base text-neutral-700 leading-relaxed">
                  Tell us what you are building. During our 30-minute
                  discovery call, we will review your commercial goals,
                  technical architecture options, timeline, and investment
                  scope.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-white border border-[#0A0A0A]/10 space-y-4">
                <h2 className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500">
                  What We Cover on the Call
                </h2>

                <ul className="space-y-3 text-sm text-[#0A0A0A]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      Audit of your current digital presence &amp; conversion
                      bottlenecks
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      Recommended tech stack including React, E-Commerce,
                      3D WebGL, and CMS options
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      Clear project milestones, deliverables, and budget
                      alignment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-7 rounded-2xl bg-[#0A0A0A] text-[#F5F5F2]">
                <OrbitalSculpture3D
                  theme="dark"
                  variant="orbital"
                  className="w-full h-48 mb-4"
                />

                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  Prefer instant messaging? You can also initiate a
                  conversation directly on WhatsApp.
                </p>

                <WhatsAppCTA
                  variant="light"
                  size="sm"
                  label="CHAT ON WHATSAPP"
                />
              </div>
            </div>

            {/* Right Interactive Booking Form */}
            <div className="lg:col-span-7">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
