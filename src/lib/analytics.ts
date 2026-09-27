import { CONSENT_VERSION, readCookieConsent } from './cookie-consent';
import { API_BASE_URL } from '../config/api';

const VISITOR_KEY = 'novariyan-analytics-visitor';
const SESSION_KEY = 'novariyan-analytics-session';
const IDENTIFIER_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const SESSION_TTL_MS = 30 * 60 * 1000;

export type AnalyticsEventType =
  | 'PAGE_VIEW'
  | 'SESSION_START'
  | 'BOOKING_STARTED'
  | 'BOOKING_COMPLETED'
  | 'CONTACT_SUBMITTED'
  | 'SERVICE_VIEW'
  | 'WORK_VIEW';

interface StoredIdentifier {
  id: string;
  expiresAt: number;
}

function getIdentifier(storage: Storage, key: string, ttlMs: number): { id: string; created: boolean } {
  const stored = storage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Partial<StoredIdentifier>;
      if (typeof parsed.id === 'string' && (parsed.expiresAt ?? 0) > Date.now()) {
        return { id: parsed.id, created: false };
      }
    } catch {
      storage.removeItem(key);
    }
  }

  const id = crypto.randomUUID();
  storage.setItem(key, JSON.stringify({
    id,
    expiresAt: Date.now() + ttlMs,
  }));
  return { id, created: true };
}

export function trackAnalyticsEvent(eventType: AnalyticsEventType, path: string): void {
  if (!readCookieConsent()?.analytics || !path.startsWith('/') || path.startsWith('//')) {
    return;
  }

  try {
    const { id: anonymousId } = getIdentifier(localStorage, VISITOR_KEY, IDENTIFIER_TTL_MS);
    const { id: sessionKey, created: newSession } = getIdentifier(sessionStorage, SESSION_KEY, SESSION_TTL_MS);
    const referrer = document.referrer
      ? new URL(document.referrer).origin
      : undefined;

    const send = async (type: AnalyticsEventType) => {
      await fetch(`${API_BASE_URL}/api/analytics/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anonymousId,
          sessionKey,
          eventType: type,
          path: path.slice(0, 300),
          referrer,
          consentVersion: CONSENT_VERSION,
        }),
        keepalive: true,
      }).catch(() => undefined);
    };

    if (newSession) void send('SESSION_START').then(() => send(eventType));
    else void send(eventType);
  } catch {
    // Analytics is optional and must not interfere with the site experience.
  }
}