export const CONSENT_VERSION = '2026-09-27';
export const CONSENT_STORAGE_KEY = 'novariyan-cookie-consent';
export const CONSENT_EVENT = 'novariyan:consent-updated';
export const OPEN_CONSENT_EVENT = 'novariyan:open-cookie-preferences';

export interface CookieConsentState {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  version: string;
  updatedAt: string;
}

export function readCookieConsent(): CookieConsentState | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;

    const value = JSON.parse(stored) as Partial<CookieConsentState>;
    if (value.version !== CONSENT_VERSION || typeof value.analytics !== 'boolean') {
      return null;
    }

    return {
      essential: true,
      analytics: value.analytics,
      marketing: value.marketing === true,
      version: CONSENT_VERSION,
      updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : '',
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(
  analytics: boolean,
  marketing: boolean,
): CookieConsentState {
  const consent: CookieConsentState = {
    essential: true,
    analytics,
    marketing,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    if (!analytics) {
      localStorage.removeItem('novariyan-analytics-visitor');
      sessionStorage.removeItem('novariyan-analytics-session');
    }
  } catch {
    // If browser storage is unavailable, analytics stays disabled on this visit.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}