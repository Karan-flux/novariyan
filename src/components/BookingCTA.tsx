import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

import { Button } from './Button';
import { WhatsAppCTA } from './WhatsAppButton';
import { OrbitalSculpture3D } from './3D/OrbitalSculpture3D';
import { createContactWhatsAppUrl } from '../lib/whatsapp';

function isValidEmail(value: string): boolean {
return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(value);
}

function isValidWhatsAppNumber(value: string): boolean {
if (!value.trim()) {
return true;
}

const digits = value.replace(/\D/g, '');

return digits.length >= 7 && digits.length <= 15;
}

function isValidWebsiteUrl(value: string): boolean {
if (!value.trim()) {
return true;
}

try {
const url = new URL(value.trim());


return (
  url.protocol === 'http:' ||
  url.protocol === 'https:'
);


} catch {
return false;
}
}

export const BookingCTA: React.FC = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [whatsapp, setWhatsapp] = useState('');
const [service, setService] = useState('Web Development');
const [budget, setBudget] = useState('₹1,00,000–₹2,50,000');
const [website, setWebsite] = useState('');
const [errorMessage, setErrorMessage] = useState<string | null>(
null,
);

const handleQuickWhatsAppSubmit = (
e: React.FormEvent<HTMLFormElement>,
) => {
e.preventDefault();


setErrorMessage(null);

const trimmedName = name.trim();
const trimmedEmail = email.trim();
const trimmedWhatsapp = whatsapp.trim();
const trimmedWebsite = website.trim();

if (!trimmedName || !trimmedEmail) {
  setErrorMessage(
    'Please enter your name and email address.',
  );
  return;
}

if (trimmedName.length < 2) {
  setErrorMessage(
    'Please enter your full name.',
  );
  return;
}

if (trimmedName.length > 100) {
  setErrorMessage(
    'Please keep your name under 100 characters.',
  );
  return;
}

if (!isValidEmail(trimmedEmail)) {
  setErrorMessage(
    'Please enter a valid email address.',
  );
  return;
}

if (trimmedEmail.length > 255) {
  setErrorMessage(
    'Please keep your email address under 255 characters.',
  );
  return;
}

if (trimmedWhatsapp.length > 30) {
  setErrorMessage(
    'Please enter a WhatsApp number under 30 characters.',
  );
  return;
}

if (!isValidWhatsAppNumber(trimmedWhatsapp)) {
  setErrorMessage(
    'Please enter a valid WhatsApp number.',
  );
  return;
}

if (trimmedWebsite.length > 500) {
  setErrorMessage(
    'Please keep the website URL under 500 characters.',
  );
  return;
}

if (!isValidWebsiteUrl(trimmedWebsite)) {
  setErrorMessage(
    'Please enter a valid website URL using http:// or https://.',
  );
  return;
}

const url = createContactWhatsAppUrl({
  name: trimmedName,
  service,
  budget,
  message: [
    `Email: ${trimmedEmail}`,
    `WhatsApp: ${trimmedWhatsapp || 'Not provided'}`,
    trimmedWebsite
      ? `Website: ${trimmedWebsite}`
      : null,
  ]
    .filter((line): line is string => Boolean(line))
    .join(' | '),
});

window.open(
  url,
  '_blank',
  'noopener,noreferrer',
);


};

return ( <section className="relative bg-[#0A0A0A] text-[#F5F5F2] py-20 lg:py-28 border-t border-white/10 overflow-hidden"> <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12"> <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
{/* Left 3D Visual + Editorial Headline */} <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center"> <div className="sm:col-span-5 order-2 sm:order-1"> <OrbitalSculpture3D
             theme="dark"
             variant="orbital"
             className="w-full h-60 sm:h-72"
           /> </div>


        <div className="sm:col-span-7 order-1 sm:order-2">
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">
            Book a Free Consultation
          </p>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-5">
            LET&apos;S BUILD
            <br />
            SOMETHING
            <br />
            GREAT TOGETHER.
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-8 max-w-md">
            Have a project in mind? Tell us what you&apos;re
            building and let&apos;s discuss how we can turn it
            into a powerful digital experience.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              to="/book"
              variant="secondary"
              size="md"
            >
              Book a Call
            </Button>

            <WhatsAppCTA
              variant="outline-light"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Right Quick Consultation Dispatch Card */}
      <div className="lg:col-span-6">
        <form
          onSubmit={handleQuickWhatsAppSubmit}
          noValidate
          className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/12 space-y-4"
          aria-describedby={
            errorMessage
              ? 'booking-cta-error'
              : undefined
          }
        >
          {errorMessage && (
            <div
              id="booking-cta-error"
              role="alert"
              aria-live="assertive"
              className="p-4 rounded-xl bg-[#F5F5F2] text-[#0A0A0A] text-xs sm:text-sm font-mono-tech"
            >
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cta-name"
                className="sr-only"
              >
                Your Name
              </label>

              <input
                id="cta-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMessage) {
                    setErrorMessage(null);
                  }
                }}
                placeholder="Your Name *"
                aria-invalid={Boolean(errorMessage)}
                className="w-full rounded-xl bg-[#0A0A0A] border border-white/15 px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="cta-email"
                className="sr-only"
              >
                Email Address
              </label>

              <input
                id="cta-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) {
                    setErrorMessage(null);
                  }
                }}
                placeholder="Email Address *"
                className="w-full rounded-xl bg-[#0A0A0A] border border-white/15 px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cta-whatsapp"
                className="sr-only"
              >
                WhatsApp Number
              </label>

              <input
                id="cta-whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                maxLength={30}
                value={whatsapp}
                onChange={(e) => {
                  setWhatsapp(e.target.value);
                  if (errorMessage) {
                    setErrorMessage(null);
                  }
                }}
                placeholder="WhatsApp Number"
                className="w-full rounded-xl bg-[#0A0A0A] border border-white/15 px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="cta-service"
                className="sr-only"
              >
                What do you need?
              </label>

              <select
                id="cta-service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-xl bg-[#0A0A0A] border border-white/15 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition-colors"
              >
                <option value="Web Development">
                  Web Development
                </option>
                <option value="Web Design">
                  Web Design
                </option>
                <option value="E-Commerce">
                  E-Commerce
                </option>
                <option value="3D & Interactive">
                  3D &amp; Interactive
                </option>
                <option value="SEO Optimization">
                  SEO Optimization
                </option>
                <option value="Website Maintenance">
                  Website Maintenance
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cta-website"
                className="sr-only"
              >
                Website if any
              </label>

              <input
                id="cta-website"
                name="website"
                type="url"
                inputMode="url"
                autoComplete="url"
                maxLength={500}
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                  if (errorMessage) {
                    setErrorMessage(null);
                  }
                }}
                placeholder="Website URL (if any)"
                className="w-full rounded-xl bg-[#0A0A0A] border border-white/15 px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="cta-budget"
                className="sr-only"
              >
                Estimated Budget
              </label>

              <select
                id="cta-budget"
                name="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl bg-[#0A0A0A] border border-white/15 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition-colors"
              >
                <option value="Under ₹50,000">
                  Under ₹50,000
                </option>

                <option value="₹50,000–₹1,00,000">
                  ₹50,000–₹1,00,000
                </option>

                <option value="₹1,00,000–₹2,50,000">
                  ₹1,00,000–₹2,50,000
                </option>

                <option value="₹2,50,000+">
                  ₹2,50,000+
                </option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#F5F5F2] text-[#0A0A0A] py-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
          >
            <span>Book a Call on WhatsApp</span>

            <MessageCircle
              className="w-4 h-4"
              aria-hidden="true"
            />
          </button>

          <p className="text-center font-mono-tech text-[11px] text-neutral-400 pt-1">
            Opens WhatsApp with your structured project brief
            · Typical response within 4 business hours.
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
);
};
