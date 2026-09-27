import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, X } from 'lucide-react';

import { SITE_CONFIG } from '../config/site';
import { SERVICES_DATA } from '../data/services';
import { createWhatsAppUrl } from '../lib/whatsapp';
import { OPEN_CONSENT_EVENT } from '../lib/cookie-consent';

type LegalModal = 'privacy' | 'terms' | null;

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<LegalModal>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!legalModal) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLegalModal(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [legalModal]);

  return (
    <footer className="bg-[#0A0A0A] text-[#F5F5F2] border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              to="/"
              aria-label={`${SITE_CONFIG.name} home`}
              className="inline-block font-display text-3xl sm:text-4xl tracking-tight text-[#F5F5F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {SITE_CONFIG.name}
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {SITE_CONFIG.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${SITE_CONFIG.name} on ${social.label}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono-tech uppercase tracking-wider text-neutral-300 hover:text-white border border-white/15 rounded-full px-3.5 py-1.5 hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight
                    className="w-3 h-3"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-5">
              Navigation
            </h3>

            <ul className="space-y-3 text-sm text-neutral-300">
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-5">
              Services
            </h3>

            <ul className="space-y-3 text-sm text-neutral-300">
              {SERVICES_DATA.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  About Studio
                </Link>
              </li>

              <li>
                <Link
                  to="/work"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Case Studies
                </Link>
              </li>

              <li>
                <Link
                  to="/reviews"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Client Reviews
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Insights &amp; Articles
                </Link>
              </li>

              <li>
                <Link
                  to="/book"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Book a Consultation
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
                  className="text-left hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-5">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>

              <li>
                <a
                  href={createWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  WhatsApp Concierge
                </a>
              </li>

              <li className="text-neutral-400 text-xs leading-relaxed pt-1">
                {SITE_CONFIG.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Privacy Policy
            </button>

            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Terms &amp; Conditions
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 font-mono-tech uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Back to Top</span>
              <ArrowUp
                className="w-3.5 h-3.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setLegalModal(null);
            }
          }}
        >
          <div className="bg-[#121212] border border-white/15 rounded-2xl max-w-xl w-full p-6 sm:p-8 text-[#F5F5F2]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h4
                id="legal-modal-title"
                className="font-display text-2xl tracking-wide"
              >
                {legalModal === 'privacy'
                  ? 'PRIVACY POLICY'
                  : 'TERMS & CONDITIONS'}
              </h4>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="Close legal notice"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#0A0A0A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Novariyan respects your privacy. Information submitted
                    through our consultation booking and contact forms is used
                    to evaluate, manage, and respond to your enquiry.
                  </p>

                  <p>
                    Information may include your name, company, email address,
                    WhatsApp number, website URL, project requirements,
                    preferred consultation time, budget range, and other
                    information you voluntarily provide.
                  </p>

                  <p>
                    We do not sell or rent submitted contact information.
                    Further details about data retention, third-party services,
                    security, and your rights will be provided in the final
                    published privacy policy before commercial deployment.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Services provided by Novariyan are governed by the
                    individual proposal, scope of work, and
                    applicable agreement accepted by the client.
                  </p>

                  <p>
                    Project timelines, deliverables, revisions, ownership,
                    intellectual property, and ongoing support terms
                    may vary by project.
                  </p>

                  <p>
                    The final studio terms and conditions should be reviewed
                    and published before commercial deployment.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="rounded-full bg-[#F5F5F2] text-[#0A0A0A] px-5 py-2 text-xs font-medium uppercase tracking-wider hover:bg-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
