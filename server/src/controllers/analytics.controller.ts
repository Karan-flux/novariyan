import type { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../lib/prisma.js';

const analyticsEventSchema = z.object({
  anonymousId: z.string().uuid(),
  sessionKey: z.string().uuid(),
  eventType: z.enum([
    'PAGE_VIEW',
    'SESSION_START',
    'BOOKING_STARTED',
    'BOOKING_COMPLETED',
    'CONTACT_SUBMITTED',
    'SERVICE_VIEW',
    'WORK_VIEW',
  ]),
  path: z.string().regex(/^\/(?!\/)/).max(300),
  referrer: z.string().url().max(500).optional(),
  consentVersion: z.literal('2026-09-27'),
}).strict();

class AnalyticsIdentityMismatchError extends Error {}

export async function ingestAnalyticsEvent(req: Request, res: Response) {
  const parsed = analyticsEventSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Invalid analytics event.' });
  }

  const { anonymousId, sessionKey, eventType, path, referrer, consentVersion } = parsed.data;
  if (path === '/admin' || path.startsWith('/admin/')) {
    return res.status(400).json({ success: false, message: 'Invalid analytics event.' });
  }
  const safeReferrer = referrer ? new URL(referrer).origin : null;

  try {
    await prisma.$transaction(async (transaction) => {
      const session = await transaction.visitorSession.upsert({
        where: { sessionKey },
        create: {
          anonymousId,
          sessionKey,
          landingPage: path,
          referrer: safeReferrer,
          consentVersion,
        },
        update: { lastSeenAt: new Date() },
      });

      if (session.anonymousId !== anonymousId) {
        throw new AnalyticsIdentityMismatchError();
      }

      await transaction.analyticsEvent.create({
        data: {
          sessionId: session.id,
          eventType,
          path,
        },
      });
    });

    return res.status(202).json({ success: true });
  } catch (error) {
    if (error instanceof AnalyticsIdentityMismatchError) {
      return res.status(400).json({ success: false, message: 'Invalid analytics event.' });
    }

    console.error('Analytics ingestion failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to record analytics event.' });
  }
}