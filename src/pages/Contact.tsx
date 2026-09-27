import React, { useState } from 'react';
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';

import { SITE_CONFIG } from '../config/site';
import { useSEO } from '../lib/seo';
import { createContactWhatsAppUrl } from '../lib/whatsapp';
import { trackAnalyticsEvent } from '../lib/analytics';
import { API_BASE_URL } from '../config/api';
import { Button } from '../components/Button';
import { WhatsAppCTA } from '../components/WhatsAppButton';

const SERVICE_OPTIONS = [
  'Web Development',
  'Web Design',
  'E-Commerce',
  '3D & Interactive',
  'SEO Optimization',
  'Website Maintenance',
] as const;

const BUDGET_OPTIONS = [
  'Under ₹50,000',
  '₹50,000–₹1,00,000',
  '₹1,00,000–₹2,50,000',
  '₹2,50,000+',
] as const;

interface ContactApiResponse {
  success: boolean;
  message?: string;
  lead?: {
    id?: string;
    status?: string;
    createdAt?: string;
  };
}

export const Contact: React.FC = () => {
  useSEO({
    title: 'Contact Novariyan — Start Your Website Project',
    description:
      'Get in touch with Novariyan to discuss custom web development, web design, e-commerce, 3D interactive experiences, or technical SEO.',
    path: '/contact',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Web Development');
  const [budget, setBudget] = useState('₹1,00,000–₹2,50,000');
  const [message, setMessage] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const whatsappDispatchUrl = createContactWhatsAppUrl({
    name: name.trim() || 'Prospective Client',
    company: company.trim() || undefined,
    service,
    budget,
    message: message.trim() || undefined,
  });

  const emailDispatchUrl = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
    `Project Enquiry: ${service} (${name.trim() || 'Prospective Client'})`,
  )}&body=${encodeURIComponent(
    `Name: ${name.trim()}\nCompany: ${company.trim()}\nEmail: ${email.trim()}\nWhatsApp: ${whatsapp.trim()}\nService: ${service}\nBudget: ${budget}\n\nMessage:\n${message.trim()}`,
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedWhatsapp = whatsapp.trim();
    const trimmedCompany = company.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError(
        'Please enter your name, email address, and project message.',
      );
      return;
    }

    if (trimmedName.length < 2) {
      setError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (trimmedMessage.length < 10) {
      setError(
        'Please provide at least 10 characters describing your project.',
      );
      return;
    }

    if (trimmedWhatsapp && trimmedWhatsapp.length < 7) {
      setError('Please enter a valid WhatsApp number.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            whatsapp: trimmedWhatsapp,
            company: trimmedCompany,
            service,
            budget,
            message: trimmedMessage,
          }),
        },
      );

      let result: ContactApiResponse | null = null;

      try {
        result =
          (await response.json()) as ContactApiResponse;
      } catch {
        result = null;
      }

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            'We could not submit your enquiry. Please try again.',
        );
      }

      setSubmitted(true);
      trackAnalyticsEvent('CONTACT_SUBMITTED', '/contact');
    } catch (submissionError) {
      console.error(
        'Contact enquiry submission failed:',
        submissionError,
      );

      if (submissionError instanceof TypeError) {
        setError(
          'Unable to connect to the Novariyan enquiry server. Please make sure the API is running and try again.',
        );
      } else if (submissionError instanceof Error) {
        setError(submissionError.message);
      } else {
        setError(
          'Something went wrong while submitting your enquiry. Please try again.',
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F5F2] text-[#0A0A0A]">
      <section className="py-16 lg:py-24 bg-architectural-grid">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Editorial Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                  Direct Studio Contact
                </p>

                <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#0A0A0A] mb-5">
                  LET&apos;S TALK.
                </h1>

                <p className="text-base text-neutral-700 leading-relaxed">
                  Have a new website, redesign, e-commerce flagship,
                  or interactive 3D concept in mind? Send us an
                  enquiry or schedule a discovery call directly.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button to="/book" variant="primary" size="md">
                  Book a Call
                </Button>

                <WhatsAppCTA
                  variant="outline-dark"
                  size="md"
                />
              </div>

              {/* Agency Contact Details */}
              <div className="p-7 rounded-2xl bg-white border border-[#0A0A0A]/10 space-y-5">
                <div className="flex items-center justify-between border-b border-[#0A0A0A]/10 pb-3">
                  <span className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500">
                    Studio Coordinates
                  </span>

                  <span className="font-mono-tech text-[10px] uppercase text-neutral-400">
                    India · Working Globally
                  </span>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail
                    className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-1"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-mono-tech text-[11px] uppercase text-neutral-500">
                      Email
                    </p>

                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-sm font-medium text-[#0A0A0A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 rounded"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone
                    className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-1"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-mono-tech text-[11px] uppercase text-neutral-500">
                      WhatsApp / Phone
                    </p>

                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#0A0A0A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 rounded"
                    >
                      {SITE_CONFIG.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin
                    className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-1"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-mono-tech text-[11px] uppercase text-neutral-500">
                      Location
                    </p>

                    <p className="text-sm font-medium text-[#0A0A0A]">
                      {SITE_CONFIG.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Enquiry Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div
                  className="p-8 sm:p-12 rounded-2xl bg-[#0A0A0A] text-[#F5F5F2]"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <CheckCircle2
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                    Enquiry Received
                  </p>

                  <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
                    THANK YOU, {name.toUpperCase()}.
                  </h2>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8 max-w-2xl">
                    Your project enquiry has been securely
                    submitted to the Novariyan studio. We will
                    review your requirements and get back to you
                    as soon as possible.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={whatsappDispatchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#F5F5F2] text-[#0A0A0A] px-7 py-4 text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                    >
                      <MessageCircle
                        className="w-4 h-4"
                        aria-hidden="true"
                      />

                      <span>Continue on WhatsApp</span>
                    </a>

                    <a
                      href={emailDispatchUrl}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 text-xs font-mono-tech uppercase tracking-wider text-white hover:bg-white hover:text-[#0A0A0A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                    >
                      <Mail
                        className="w-4 h-4"
                        aria-hidden="true"
                      />

                      <span>Open Email Client</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-7 sm:p-10 rounded-2xl bg-white border border-[#0A0A0A]/12 space-y-6"
                >
                  {error && (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="p-4 rounded-xl bg-[#0A0A0A] text-[#F5F5F2] text-xs font-mono-tech"
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
                      >
                        Name *
                      </label>

                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        maxLength={100}
                        required
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                        placeholder="Your full name"
                        className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
                      >
                        Email *
                      </label>

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        maxLength={255}
                        required
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        placeholder="you@company.com"
                        className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-whatsapp"
                        className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
                      >
                        WhatsApp
                      </label>

                      <input
                        id="contact-whatsapp"
                        name="whatsapp"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={30}
                        value={whatsapp}
                        onChange={(e) =>
                          setWhatsapp(e.target.value)
                        }
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
                      >
                        Company
                      </label>

                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        maxLength={150}
                        value={company}
                        onChange={(e) =>
                          setCompany(e.target.value)
                        }
                        placeholder="Company or brand name"
                        className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
                      >
                        Service
                      </label>

                      <select
                        id="contact-service"
                        name="service"
                        value={service}
                        onChange={(e) =>
                          setService(e.target.value)
                        }
                        className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
                      >
                        {SERVICE_OPTIONS.map((option) => (
                          <option
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
                      >
                        Budget
                      </label>

                      <select
                        id="contact-budget"
                        name="budget"
                        value={budget}
                        onChange={(e) =>
                          setBudget(e.target.value)
                        }
                        className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
                      >
                        {BUDGET_OPTIONS.map((option) => (
                          <option
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
                    >
                      Message *
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      minLength={10}
                      maxLength={5000}
                      required
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      placeholder="Tell us about your project timeline, goals, and requirements..."
                      className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 p-4 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0A0A0A] text-[#F5F5F2] px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-[#1F1F1F] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2
                            className="w-4 h-4 animate-spin"
                            aria-hidden="true"
                          />

                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <span>Send Enquiry</span>
                      )}
                    </button>

                    <WhatsAppCTA
                      variant="outline-dark"
                      size="lg"
                    />

                    <Button
                      to="/book"
                      variant="outline-dark"
                      size="lg"
                    >
                      Book a Call
                    </Button>
                  </div>

                  <p className="font-mono-tech text-[10px] uppercase tracking-wider text-neutral-400">
                    Your enquiry is submitted securely to the
                    Novariyan studio.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
