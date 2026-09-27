import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';

import { createBookingWhatsAppUrl } from '../lib/whatsapp';
import { trackAnalyticsEvent } from '../lib/analytics';
import { API_BASE_URL } from '../config/api';

const PROJECT_TYPES = [
  'New Website',
  'Website Redesign',
  'E-Commerce',
  '3D / Interactive Website',
  'SEO',
  'Maintenance',
  'Other',
] as const;

const BUDGET_OPTIONS = [
  'Under ₹50,000',
  '₹50,000–₹1,00,000',
  '₹1,00,000–₹2,50,000',
  '₹2,50,000+',
] as const;

const TIME_SLOTS = [
  '10:00 AM IST',
  '11:30 AM IST',
  '02:00 PM IST',
  '04:00 PM IST',
  '06:00 PM IST',
  '08:00 PM IST',
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];
type BudgetOption = (typeof BUDGET_OPTIONS)[number];
type TimeSlot = (typeof TIME_SLOTS)[number];

interface UpcomingBusinessDay {
  iso: string;
  label: string;
  dayName: string;
}

interface BookingApiResponse {
  success: boolean;
  message?: string;
  booking?: {
    id?: string;
    status?: string;
    createdAt?: string;
  };
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getUpcomingBusinessDays(
  count = 6,
): UpcomingBusinessDay[] {
  const days: UpcomingBusinessDay[] = [];
  const cursor = new Date();

  cursor.setHours(12, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < count) {
    const dayOfWeek = cursor.getDay();

    // Sunday is excluded. Monday–Saturday remain available.
    if (dayOfWeek !== 0) {
      const iso = formatLocalDate(cursor);

      const dayName = cursor.toLocaleDateString(
        'en-US',
        {
          weekday: 'short',
        },
      );

      const label = cursor.toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
        },
      );

      days.push({
        iso,
        label,
        dayName,
      });
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function getTomorrowIsoDate(): string {
  const tomorrow = new Date();

  tomorrow.setHours(12, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return formatLocalDate(tomorrow);
}

function isValidIsoDate(
  dateString: string,
): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString
    .split('-')
    .map(Number);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return false;
  }

  const date = new Date(
    year,
    month - 1,
    day,
  );

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function isSunday(dateString: string): boolean {
  if (!isValidIsoDate(dateString)) {
    return false;
  }

  const [year, month, day] = dateString
    .split('-')
    .map(Number);

  const date = new Date(
    year,
    month - 1,
    day,
  );

  return date.getDay() === 0;
}

function isValidWebsiteUrl(value: string): boolean {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);

    return (
      (url.protocol === 'http:' ||
        url.protocol === 'https:') &&
      Boolean(url.hostname)
    );
  } catch {
    return false;
  }
}

function isValidEmail(value: string): boolean {
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

function isValidWhatsAppNumber(
  value: string,
): boolean {
  const digits = value.replace(/\D/g, '');

  return (
    digits.length >= 7 &&
    digits.length <= 15
  );
}

function isAllowedValue<T extends string>(
  value: string,
  options: readonly T[],
): value is T {
  return options.includes(value as T);
}

function getApiErrorMessage(
  result: BookingApiResponse | null,
  status: number,
): string {
  if (result?.message?.trim()) {
    return result.message.trim();
  }

  if (status === 400) {
    return 'Some booking details are invalid. Please review the form and try again.';
  }

  if (status === 429) {
    return 'Too many requests. Please wait a few minutes before trying again.';
  }

  if (status >= 500) {
    return 'The booking service is temporarily unavailable. Please try again shortly.';
  }

  return 'We could not submit your consultation request. Please try again.';
}

export const BookingForm: React.FC = () => {
  const [todayKey, setTodayKey] = useState(() =>
    formatLocalDate(new Date()),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      const nextTodayKey = formatLocalDate(
        new Date(),
      );

      setTodayKey((current) =>
        current === nextTodayKey
          ? current
          : nextTodayKey,
      );
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const upcomingDays = useMemo(
    () => getUpcomingBusinessDays(6),
    [todayKey],
  );

  const minimumDate = useMemo(
    () => getTomorrowIsoDate(),
    [todayKey],
  );

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const [projectType, setProjectType] =
    useState<ProjectType>(
      PROJECT_TYPES[0],
    );

  const [budget, setBudget] =
    useState<BudgetOption>(
      BUDGET_OPTIONS[2],
    );

  const [preferredDate, setPreferredDate] =
    useState<string>(
      upcomingDays[0]?.iso || '',
    );

  const [preferredTime, setPreferredTime] =
    useState<TimeSlot>(
      TIME_SLOTS[1],
    );

  const [description, setDescription] =
    useState('');

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const successHeadingRef =
    useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) {
      successHeadingRef.current?.focus();
    }
  }, [submitted]);

  const whatsappConfirmUrl =
    createBookingWhatsAppUrl({
      name: name.trim(),
      company:
        company.trim() || undefined,
      projectType,
      budget,
      preferredDate,
      preferredTime,
      description:
        description.trim() || undefined,
    });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedWhatsapp =
      whatsapp.trim();
    const trimmedCompany =
      company.trim();
    const trimmedWebsiteUrl =
      websiteUrl.trim();
    const trimmedDescription =
      description.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedWhatsapp ||
      !preferredDate ||
      !preferredTime
    ) {
      setErrorMessage(
        'Please complete all required fields: Name, Email, WhatsApp, Date, and Time.',
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

    if (trimmedWhatsapp.length > 30) {
      setErrorMessage(
        'Please enter a WhatsApp number under 30 characters.',
      );
      return;
    }

    if (
      !isValidWhatsAppNumber(
        trimmedWhatsapp,
      )
    ) {
      setErrorMessage(
        'Please enter a valid WhatsApp number.',
      );
      return;
    }

    if (trimmedCompany.length > 150) {
      setErrorMessage(
        'Please keep the company name under 150 characters.',
      );
      return;
    }

    if (trimmedWebsiteUrl.length > 500) {
      setErrorMessage(
        'Please keep the website URL under 500 characters.',
      );
      return;
    }

    if (
      !isValidWebsiteUrl(
        trimmedWebsiteUrl,
      )
    ) {
      setErrorMessage(
        'Please enter a valid website URL using http:// or https://.',
      );
      return;
    }

    if (
      !isAllowedValue(
        projectType,
        PROJECT_TYPES,
      )
    ) {
      setErrorMessage(
        'Please select a valid project type.',
      );
      return;
    }

    if (
      !isAllowedValue(
        budget,
        BUDGET_OPTIONS,
      )
    ) {
      setErrorMessage(
        'Please select a valid budget range.',
      );
      return;
    }

    if (
      !isAllowedValue(
        preferredTime,
        TIME_SLOTS,
      )
    ) {
      setErrorMessage(
        'Please select a valid consultation time.',
      );
      return;
    }

    if (
      trimmedDescription.length > 5000
    ) {
      setErrorMessage(
        'Please keep the project description under 5,000 characters.',
      );
      return;
    }

    if (!isValidIsoDate(preferredDate)) {
      setErrorMessage(
        'Please select a valid consultation date.',
      );
      return;
    }

    if (preferredDate < minimumDate) {
      setErrorMessage(
        'Please select a consultation date from tomorrow onward.',
      );
      return;
    }

    if (isSunday(preferredDate)) {
      setErrorMessage(
        'Sunday consultations are not available. Please select another date.',
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: trimmedName,
            company: trimmedCompany,
            email: trimmedEmail,
            whatsapp:
              trimmedWhatsapp,
            websiteUrl:
              trimmedWebsiteUrl,
            projectType,
            budget,
            preferredDate,
            preferredTime,
            description:
              trimmedDescription,
          }),
        },
      );

      let result:
        | BookingApiResponse
        | null = null;

      const contentType =
        response.headers.get(
          'content-type',
        ) || '';

      if (
        contentType
          .toLowerCase()
          .includes('application/json')
      ) {
        try {
          result =
            (await response.json()) as BookingApiResponse;
        } catch {
          result = null;
        }
      } else {
        try {
          await response.text();
        } catch {
          // Ignore unreadable non-JSON response bodies.
        }
      }

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          getApiErrorMessage(
            result,
            response.status,
          ),
        );
      }

      setSubmitted(true);
      trackAnalyticsEvent('BOOKING_COMPLETED', '/book');
    } catch (error) {
      console.error(
        'Booking submission failed:',
        error,
      );

      if (
        error instanceof TypeError
      ) {
        setErrorMessage(
          'Unable to connect to the Novariyan booking server. Please check your connection and try again.',
        );
      } else if (
        error instanceof Error
      ) {
        setErrorMessage(
          error.message ||
            'Something went wrong while submitting your request. Please try again.',
        );
      } else {
        setErrorMessage(
          'Something went wrong while submitting your request. Please try again.',
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setErrorMessage(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div
        className="p-8 sm:p-12 rounded-2xl bg-[#0A0A0A] text-[#F5F5F2] border border-[#0A0A0A]"
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6">
          <CheckCircle2
            className="w-6 h-6 text-white"
            aria-hidden="true"
          />
        </div>

        <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
          Request Received
        </p>

        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="font-display text-4xl sm:text-5xl text-white mb-4 focus:outline-none"
        >
          CONSULTATION REQUEST RECEIVED.
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mb-8">
          Your project details have been
          securely submitted to the
          Novariyan studio. We will review
          your request and get back to you
          regarding your preferred
          consultation slot.
        </p>

        <div className="p-6 rounded-xl bg-[#141414] border border-white/12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8">
          <div>
            <span className="font-mono-tech text-[11px] uppercase text-neutral-400 block mb-1">
              Client
            </span>

            <span className="font-medium text-white">
              {name}
              {company
                ? ` (${company})`
                : ''}
            </span>
          </div>

          <div>
            <span className="font-mono-tech text-[11px] uppercase text-neutral-400 block mb-1">
              Project Type &amp; Budget
            </span>

            <span className="font-medium text-white">
              {projectType} · {budget}
            </span>
          </div>

          <div>
            <span className="font-mono-tech text-[11px] uppercase text-neutral-400 block mb-1">
              Preferred Date
            </span>

            <span className="font-mono-tech text-white">
              {preferredDate}
            </span>
          </div>

          <div>
            <span className="font-mono-tech text-[11px] uppercase text-neutral-400 block mb-1">
              Preferred Time
            </span>

            <span className="font-mono-tech text-white">
              {preferredTime}
            </span>
          </div>

          {description && (
            <div className="sm:col-span-2 pt-3 border-t border-white/10">
              <span className="font-mono-tech text-[11px] uppercase text-neutral-400 block mb-1">
                Project Brief
              </span>

              <p className="text-neutral-300 text-xs sm:text-sm">
                {description}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={whatsappConfirmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F5F5F2] text-[#0A0A0A] px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            <MessageCircle
              className="w-4 h-4"
              aria-hidden="true"
            />

            <span>
              Continue on WhatsApp
            </span>
          </a>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 text-xs font-mono-tech uppercase tracking-wider text-neutral-300 hover:text-white hover:border-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            <RotateCcw
              className="w-3.5 h-3.5"
              aria-hidden="true"
            />

            <span>Edit Details</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting}
      className="p-7 sm:p-10 rounded-2xl bg-white border border-[#0A0A0A]/12 space-y-8"
    >
      {errorMessage && (
        <div
          id="booking-form-error"
          role="alert"
          aria-live="assertive"
          className="p-4 rounded-xl bg-[#0A0A0A] text-[#F5F5F2] text-xs sm:text-sm font-mono-tech"
        >
          {errorMessage}
        </div>
      )}

      {/* Step 1: Contact Details */}
      <div>
        <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-5">
          01 · Your Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="booking-name"
              className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
            >
              Full Name *
            </label>

            <input
              id="booking-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              aria-describedby={
                errorMessage
                  ? 'booking-form-error'
                  : undefined
              }
              placeholder="e.g. Aarav Mehta"
              className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
            />
          </div>

          <div>
            <label
              htmlFor="booking-company"
              className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
            >
              Company / Brand
            </label>

            <input
              id="booking-company"
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={150}
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              placeholder="e.g. Aurelia Developments"
              className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
            />
          </div>

          <div>
            <label
              htmlFor="booking-email"
              className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
            >
              Email Address *
            </label>

            <input
              id="booking-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              aria-describedby={
                errorMessage
                  ? 'booking-form-error'
                  : undefined
              }
              placeholder="you@company.com"
              className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
            />
          </div>

          <div>
            <label
              htmlFor="booking-whatsapp"
              className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
            >
              WhatsApp Number *
            </label>

            <input
              id="booking-whatsapp"
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              maxLength={30}
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(e.target.value)
              }
              aria-describedby={
                errorMessage
                  ? 'booking-form-error'
                  : undefined
              }
              placeholder="+91 98765 43210"
              className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="booking-website"
              className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
            >
              Current Website URL
              (Optional)
            </label>

            <input
              id="booking-website"
              name="websiteUrl"
              type="url"
              inputMode="url"
              autoComplete="url"
              maxLength={500}
              value={websiteUrl}
              onChange={(e) =>
                setWebsiteUrl(e.target.value)
              }
              aria-describedby={
                errorMessage
                  ? 'booking-form-error'
                  : undefined
              }
              placeholder="https://yourcompany.com"
              className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 px-4 py-3.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Project Type & Budget */}
      <div className="pt-6 border-t border-[#0A0A0A]/10">
        <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-5">
          02 · Scope &amp; Investment
        </h3>

        <div className="mb-6">
          <span className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-3">
            Project Type *
          </span>

          <div
            role="group"
            aria-label="Project type"
            className="flex flex-wrap gap-2"
          >
            {PROJECT_TYPES.map(
              (type) => {
                const active =
                  projectType === type;

                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setProjectType(type)
                    }
                    className={`px-4 py-2.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
                      active
                        ? 'bg-[#0A0A0A] text-[#F5F5F2]'
                        : 'bg-[#F5F5F2] text-[#0A0A0A] border border-[#0A0A0A]/15 hover:border-[#0A0A0A]'
                    }`}
                  >
                    {type}
                  </button>
                );
              },
            )}
          </div>
        </div>

        <div>
          <span className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-3">
            Estimated Budget *
          </span>

          <div
            role="group"
            aria-label="Estimated budget"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5"
          >
            {BUDGET_OPTIONS.map(
              (option) => {
                const active =
                  budget === option;

                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setBudget(option)
                    }
                    className={`px-4 py-3 rounded-xl font-mono-tech text-xs text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
                      active
                        ? 'bg-[#0A0A0A] text-[#F5F5F2]'
                        : 'bg-[#F5F5F2] text-[#0A0A0A] border border-[#0A0A0A]/15 hover:border-[#0A0A0A]'
                    }`}
                  >
                    {option}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>

      {/* Step 3: Date & Time Selection */}
      <div className="pt-6 border-t border-[#0A0A0A]/10">
        <h3 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-5">
          03 · Preferred Consultation
          Date &amp; Time
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-3">
              <Calendar
                className="w-3.5 h-3.5"
                aria-hidden="true"
              />

              <span>
                Select Preferred Date *
              </span>
            </span>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {upcomingDays.map(
                (day) => {
                  const active =
                    preferredDate ===
                    day.iso;

                  return (
                    <button
                      key={day.iso}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        setPreferredDate(
                          day.iso,
                        )
                      }
                      className={`p-3 rounded-xl border text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
                        active
                          ? 'bg-[#0A0A0A] text-[#F5F5F2] border-[#0A0A0A]'
                          : 'bg-[#F5F5F2] text-[#0A0A0A] border-[#0A0A0A]/15 hover:border-[#0A0A0A]'
                      }`}
                    >
                      <span className="block font-mono-tech text-[10px] uppercase opacity-70">
                        {day.dayName}
                      </span>

                      <span className="block font-semibold text-xs mt-1">
                        {day.label}
                      </span>
                    </button>
                  );
                },
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="booking-custom-date"
                className="font-mono-tech text-[11px] text-neutral-500"
              >
                Or pick custom date:
              </label>

              <input
                id="booking-custom-date"
                name="preferredDate"
                type="date"
                min={minimumDate}
                value={preferredDate}
                onChange={(e) =>
                  setPreferredDate(
                    e.target.value,
                  )
                }
                aria-describedby={
                  errorMessage
                    ? 'booking-form-error'
                    : undefined
                }
                className="rounded-lg bg-[#F5F5F2] border border-[#0A0A0A]/15 px-3 py-1.5 text-xs font-mono-tech text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-3">
              <Clock
                className="w-3.5 h-3.5"
                aria-hidden="true"
              />

              <span>
                Preferred Time Slot *
              </span>
            </span>

            <div
              role="group"
              aria-label="Preferred consultation time"
              className="grid grid-cols-2 gap-2"
            >
              {TIME_SLOTS.map(
                (slot) => {
                  const active =
                    preferredTime ===
                    slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        setPreferredTime(
                          slot,
                        )
                      }
                      className={`py-3 px-3 rounded-xl font-mono-tech text-xs border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
                        active
                          ? 'bg-[#0A0A0A] text-[#F5F5F2] border-[#0A0A0A]'
                          : 'bg-[#F5F5F2] text-[#0A0A0A] border-[#0A0A0A]/15 hover:border-[#0A0A0A]'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Project Description */}
      <div className="pt-6 border-t border-[#0A0A0A]/10">
        <label
          htmlFor="booking-description"
          className="block text-xs font-medium uppercase tracking-wider text-[#0A0A0A] mb-2"
        >
          04 · Project Description &amp;
          Goals
        </label>

        <textarea
          id="booking-description"
          name="description"
          rows={4}
          maxLength={5000}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value,
            )
          }
          aria-describedby={
            errorMessage
              ? 'booking-form-error'
              : undefined
          }
          placeholder="Tell us about your business, what you want to build or improve, and your target launch window..."
          className="w-full rounded-xl bg-[#F5F5F2] border border-[#0A0A0A]/15 p-4 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

              <span>
                Submitting Request...
              </span>
            </>
          ) : (
            <span>
              Submit Consultation Request
            </span>
          )}
        </button>

        <span className="font-mono-tech text-[11px] text-neutral-500">
          30-Minute Discovery Call · No
          Obligation
        </span>
      </div>
    </form>
  );
};
