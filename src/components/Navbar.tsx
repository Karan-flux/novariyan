import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { SITE_CONFIG } from '../config/site';
import { SERVICES_DATA } from '../data/services';
import { createWhatsAppUrl } from '../lib/whatsapp';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const whatsappUrl = createWhatsAppUrl(undefined, location.pathname);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-[#F5F5F2]/95 backdrop-blur-md border-b border-[#0A0A0A]/10 py-3'
            : 'bg-[#F5F5F2] border-b border-[#0A0A0A]/8 py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Wordmark */}
          <Link
            to="/"
            aria-label={`${SITE_CONFIG.name} home`}
            className="font-display text-2xl sm:text-3xl tracking-tight text-[#0A0A0A] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]"
          >
            {SITE_CONFIG.name}
          </Link>

          {/* Primary navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-neutral-600"
          >
            {SITE_CONFIG.navLinks.map((item, idx) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `relative py-1 whitespace-nowrap transition-colors duration-150 ${
                    idx >= 5 ? 'hidden xl:inline-block' : ''
                  } ${
                    isActive
                      ? 'text-[#0A0A0A] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#0A0A0A]'
                      : 'hover:text-[#0A0A0A]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Primary actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/book"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] text-[#F5F5F2] px-4 sm:px-5 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-[#1F1F1F] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open full studio menu"
              aria-expanded={menuOpen}
              aria-controls="studio-navigation-drawer"
              className="w-10 h-10 rounded-full bg-[#0A0A0A] text-[#F5F5F2] flex items-center justify-center hover:bg-[#1F1F1F] transition-colors duration-200 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
            >
              <Menu className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen animated studio navigation drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="studio-navigation-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#0A0A0A] text-[#F5F5F2] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Studio navigation menu"
          >
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-5 min-h-screen flex flex-col justify-between">
              {/* Drawer top bar */}
              <div className="flex items-center justify-between pb-6 border-b border-white/12">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl sm:text-3xl tracking-tight text-[#F5F5F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {SITE_CONFIG.name}
                </Link>

                <div className="flex items-center gap-3">
                  <Link
                    to="/book"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#F5F5F2] text-[#0A0A0A] px-5 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                  >
                    <span>Book a Call</span>
                    <ArrowRight
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    />
                  </Link>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close studio menu"
                    className="w-10 h-10 rounded-full border border-white/20 text-[#F5F5F2] flex items-center justify-center hover:bg-white hover:text-[#0A0A0A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Drawer main grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 my-auto">
                {/* Primary pages */}
                <div className="lg:col-span-6">
                  <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                    Directory
                  </p>

                  <ul className="space-y-3">
                    {SITE_CONFIG.navLinks.map((item, index) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setMenuOpen(false)}
                          className="group inline-flex items-baseline gap-4 font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F2] hover:text-neutral-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <span className="font-mono-tech text-xs text-neutral-500">
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services + contact */}
                <div className="lg:col-span-6 flex flex-col justify-between gap-10">
                  <div>
                    <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                      Specialized Capabilities
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICES_DATA.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="group p-4 rounded-xl border border-white/10 hover:border-white/30 bg-white/[0.02] flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <div>
                            <span className="font-mono-tech text-[11px] text-neutral-500 block">
                              {service.number}
                            </span>

                            <span className="text-sm font-medium text-[#F5F5F2]">
                              {service.title}
                            </span>
                          </div>

                          <ArrowUpRight
                            className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors"
                            aria-hidden="true"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <p className="font-mono-tech text-xs uppercase tracking-wider text-neutral-400">
                        Direct Enquiries
                      </p>

                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-base font-medium text-white hover:underline mt-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-xs uppercase tracking-wider text-white hover:bg-white hover:text-[#0A0A0A] transition-colors whitespace-nowrap self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>Chat on WhatsApp</span>

                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="pt-6 border-t border-white/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
                <span>
                  © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                </span>

                <div className="flex items-center gap-6">
                  {SITE_CONFIG.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
