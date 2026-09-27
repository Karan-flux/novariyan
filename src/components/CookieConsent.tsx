import React, { useEffect, useRef, useState } from 'react';

import {
  CONSENT_EVENT,
  OPEN_CONSENT_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from '../lib/cookie-consent';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const current = readCookieConsent();
    setVisible(!current);
    setAnalytics(current?.analytics ?? false);
    setMarketing(current?.marketing ?? false);

    const openPreferences = () => {
      const latest = readCookieConsent();
      setAnalytics(latest?.analytics ?? false);
      setMarketing(latest?.marketing ?? false);
      setCustomizing(true);
      setVisible(true);
    };

    const onConsentChange = () => setVisible(false);
    window.addEventListener(OPEN_CONSENT_EVENT, openPreferences);
    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, openPreferences);
      window.removeEventListener(CONSENT_EVENT, onConsentChange);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>('button, input');
    focusable?.[0]?.focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog?.addEventListener('keydown', trapFocus);
    return () => dialog?.removeEventListener('keydown', trapFocus);
  }, [visible, customizing]);

  if (!visible) return null;

  const save = (allowAnalytics: boolean, allowMarketing: boolean) => {
    saveCookieConsent(allowAnalytics, allowMarketing);
    setVisible(false);
  };

  return (
    <section
      ref={dialogRef}
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl border border-white/15 bg-[#0A0A0A] p-5 text-[#F5F5F2] shadow-2xl sm:inset-x-6 sm:bottom-6 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <p className="mb-2 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-white/50">
            Privacy preferences
          </p>
          <h2 id="cookie-consent-title" className="font-display text-2xl">
            Your choices matter.
          </h2>
          <p id="cookie-consent-description" className="mt-2 text-sm leading-6 text-white/70">
            Essential storage keeps the site secure and remembers your choices. Optional analytics helps us understand site visits. Marketing tracking is off unless you choose it.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={() => save(false, false)} className="min-h-10 border border-white/25 px-3 text-xs hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Reject optional
          </button>
          {!customizing && (
            <button type="button" onClick={() => setCustomizing(true)} className="min-h-10 border border-white/25 px-3 text-xs hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Customize
            </button>
          )}
          <button type="button" onClick={() => save(true, true)} className="min-h-10 bg-[#F5F5F2] px-3 text-xs font-semibold text-[#0A0A0A] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Accept all
          </button>
        </div>
      </div>

      {customizing && (
        <div className="mt-5 grid gap-3 border-t border-white/15 pt-4 sm:grid-cols-3">
          <div className="text-sm">
            <p className="font-medium">Essential</p>
            <p className="mt-1 text-xs leading-5 text-white/55">Always active for security and preferences.</p>
          </div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="mt-1 accent-white" />
            <span>Analytics <span className="block text-xs leading-5 text-white/55">Anonymous page and session counts.</span></span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} className="mt-1 accent-white" />
            <span>Marketing <span className="block text-xs leading-5 text-white/55">No marketing trackers are currently configured.</span></span>
          </label>
          <div className="sm:col-span-3 sm:flex sm:justify-end">
            <button type="button" onClick={() => save(analytics, marketing)} className="min-h-10 border border-white/40 px-4 text-xs font-semibold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Save preferences
            </button>
          </div>
        </div>
      )}
    </section>
  );
};