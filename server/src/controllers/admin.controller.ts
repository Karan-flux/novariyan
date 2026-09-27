import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import type { BookingStatus, LeadStatus } from '@prisma/client';

import { prisma } from '../lib/prisma.js';

const dateQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
}).strict();

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  search: z.string().trim().max(100).optional(),
  status: z.string().trim().max(30).optional(),
  isRead: z.enum(['true', 'false']).optional(),
  sort: z.enum(['createdAt', 'updatedAt', 'name', 'status']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
}).strict();

const leadStatusSchema = z.enum([
  'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'CONVERTED', 'LOST', 'ARCHIVED',
]);

const bookingStatusSchema = z.enum([
  'NEW', 'CONTACTED', 'QUALIFIED', 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'ARCHIVED',
]);

const leadUpdateSchema = z.object({
  status: leadStatusSchema.optional(),
  adminNotes: z.string().trim().max(5000).nullable().optional(),
  isRead: z.boolean().optional(),
}).strict().refine((value) => Object.keys(value).length > 0);

const bookingUpdateSchema = z.object({
  status: bookingStatusSchema.optional(),
  adminNotes: z.string().trim().max(5000).nullable().optional(),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  preferredTime: z.string().trim().min(1).max(100).optional(),
}).strict().refine((value) => Object.keys(value).length > 0);

function getDateRange(query: z.infer<typeof dateQuerySchema>) {
  const from = query.from ? new Date(query.from) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const to = query.to ? new Date(query.to) : new Date();

  if (from > to) {
    return null;
  }

  return { gte: from, lte: to };
}

function getPaginationQuery(req: Request, res: Response) {
  const parsed = listQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ success: false, message: 'Invalid list filters.' });
    return null;
  }

  const dateRange = parsed.data.from || parsed.data.to
    ? getDateRange({ from: parsed.data.from, to: parsed.data.to })
    : undefined;

  if (dateRange === null) {
    res.status(400).json({ success: false, message: 'Date range is invalid.' });
    return null;
  }

  return { ...parsed.data, dateRange };
}

async function writeAudit(
  transaction: Prisma.TransactionClient,
  adminUserId: string,
  action: string,
  entity: string,
  entityId: string,
  metadata?: Record<string, string>,
) {
  await transaction.auditLog.create({
    data: { adminUserId, action, entity, entityId, metadata },
  });
}

export async function getDashboardOverview(req: Request, res: Response) {
  const parsed = dateQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Invalid date range.' });
  }

  const createdAt = getDateRange(parsed.data);

  if (!createdAt) {
    return res.status(400).json({ success: false, message: 'Date range is invalid.' });
  }

  const today = new Date().toISOString().slice(0, 10);

  try {
    const [totalLeads, newLeads, totalBookings, upcomingBookings, completedBookings,
      cancelledBookings, visitorCount, visitorStats, pageViewCount, convertingVisitorStats, topPages, recentActivity] = await Promise.all([
      prisma.lead.count({ where: { createdAt } }),
      prisma.lead.count({ where: { createdAt, status: 'NEW' } }),
      prisma.booking.count({ where: { createdAt } }),
      prisma.booking.count({ where: { preferredDate: { gte: today }, status: { notIn: ['CANCELLED', 'ARCHIVED'] } } }),
      prisma.booking.count({ where: { createdAt, status: 'COMPLETED' } }),
      prisma.booking.count({ where: { createdAt, status: 'CANCELLED' } }),
      prisma.visitorSession.count({ where: { startedAt: createdAt } }),
      prisma.$queryRaw<Array<{ uniqueCount: number; returningCount: number }>>(Prisma.sql`
        SELECT
          COUNT(DISTINCT "anonymousId")::int AS "uniqueCount",
          COUNT(DISTINCT CASE WHEN "sessionCount" > 1 THEN "anonymousId" END)::int AS "returningCount"
        FROM (
          SELECT "anonymousId", COUNT(*) AS "sessionCount"
          FROM "VisitorSession"
          WHERE "startedAt" >= ${createdAt.gte} AND "startedAt" <= ${createdAt.lte}
          GROUP BY "anonymousId"
        ) AS visitors
      `),
      prisma.analyticsEvent.count({ where: { createdAt, eventType: 'PAGE_VIEW' } }),
      prisma.$queryRaw<Array<{ convertingVisitors: number }>>(Prisma.sql`
        SELECT COUNT(DISTINCT sessions."anonymousId")::int AS "convertingVisitors"
        FROM "AnalyticsEvent" AS events
        INNER JOIN "VisitorSession" AS sessions ON sessions."id" = events."sessionId"
        WHERE events."createdAt" >= ${createdAt.gte}
          AND events."createdAt" <= ${createdAt.lte}
          AND events."eventType" IN ('BOOKING_COMPLETED', 'CONTACT_SUBMITTED')
          AND sessions."startedAt" >= ${createdAt.gte}
          AND sessions."startedAt" <= ${createdAt.lte}
      `),
      prisma.analyticsEvent.groupBy({
        by: ['path'],
        where: { createdAt, eventType: 'PAGE_VIEW' },
        _count: { path: true },
        orderBy: { _count: { path: 'desc' } },
        take: 8,
      }),
      prisma.auditLog.findMany({
        where: { createdAt },
        orderBy: { createdAt: 'desc' },
        take: 8,
        select: { id: true, action: true, entity: true, entityId: true, createdAt: true },
      }),
    ]);

    const uniqueVisitorCount = visitorStats[0]?.uniqueCount ?? 0;
    const returningVisitors = visitorStats[0]?.returningCount ?? 0;
    const convertingVisitors = convertingVisitorStats[0]?.convertingVisitors ?? 0;

    return res.status(200).json({
      success: true,
      range: { from: createdAt.gte.toISOString(), to: createdAt.lte.toISOString() },
      metrics: {
        totalLeads,
        newLeads,
        totalBookings,
        upcomingBookings,
        completedBookings,
        cancelledBookings,
        contactSubmissions: totalLeads,
        visitors: visitorCount,
        uniqueVisitors: uniqueVisitorCount,
        returningVisitors,
        pageViews: pageViewCount,
        conversionRate: uniqueVisitorCount > 0
          ? Number(((convertingVisitors / uniqueVisitorCount) * 100).toFixed(2))
          : null,
      },
      topPages: topPages.map((item) => ({ path: item.path, views: item._count.path })),
      recentActivity,
    });
  } catch (error) {
    console.error('Dashboard overview failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to load dashboard data.' });
  }
}

export async function listLeads(req: Request, res: Response) {
  const query = getPaginationQuery(req, res);
  if (!query) return;

  if (query.status && !leadStatusSchema.safeParse(query.status).success) {
    res.status(400).json({ success: false, message: 'Invalid lead status.' });
    return;
  }

  const where = {
    ...(query.status ? { status: query.status as LeadStatus } : {}),
    ...(query.isRead ? { isRead: query.isRead === 'true' } : {}),
    ...(query.dateRange ? { createdAt: query.dateRange } : {}),
    ...(query.search ? {
      OR: [
        { name: { contains: query.search, mode: 'insensitive' as const } },
        { email: { contains: query.search, mode: 'insensitive' as const } },
        { company: { contains: query.search, mode: 'insensitive' as const } },
        { service: { contains: query.search, mode: 'insensitive' as const } },
      ],
    } : {}),
  };

  try {
    const [items, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { [query.sort]: query.order },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
      prisma.lead.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      items,
      pagination: { page: query.page, pageSize: query.pageSize, total, pages: Math.ceil(total / query.pageSize) },
    });
  } catch (error) {
    console.error('Lead list failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to load leads.' });
  }
}

export async function updateLead(req: Request, res: Response) {
  const parsed = leadUpdateSchema.safeParse(req.body);
  if (!parsed.success || !req.admin) {
    return res.status(400).json({ success: false, message: 'Invalid lead update.' });
  }

  try {
    const existing = await prisma.lead.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ success: false, message: 'Lead not found.' });

    const lead = await prisma.$transaction(async (transaction) => {
      const updatedLead = await transaction.lead.update({ where: { id: existing.id }, data: parsed.data });
      await writeAudit(transaction, req.admin!.id, 'LEAD_UPDATED', 'Lead', updatedLead.id, {
        ...(parsed.data.status ? { status: parsed.data.status } : {}),
        ...(parsed.data.adminNotes !== undefined ? { notesUpdated: 'true' } : {}),
        ...(parsed.data.isRead !== undefined ? { readState: String(parsed.data.isRead) } : {}),
      });
      return updatedLead;
    });

    return res.status(200).json({ success: true, lead });
  } catch (error) {
    console.error('Lead update failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to update lead.' });
  }
}

export async function listBookings(req: Request, res: Response) {
  const query = getPaginationQuery(req, res);
  if (!query) return;

  if (query.status && !bookingStatusSchema.safeParse(query.status).success) {
    res.status(400).json({ success: false, message: 'Invalid booking status.' });
    return;
  }

  const where = {
    ...(query.status ? { status: query.status as BookingStatus } : {}),
    ...(query.dateRange ? { createdAt: query.dateRange } : {}),
    ...(query.search ? {
      OR: [
        { name: { contains: query.search, mode: 'insensitive' as const } },
        { email: { contains: query.search, mode: 'insensitive' as const } },
        { company: { contains: query.search, mode: 'insensitive' as const } },
        { projectType: { contains: query.search, mode: 'insensitive' as const } },
      ],
    } : {}),
  };

  try {
    const [items, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { [query.sort]: query.order },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
      prisma.booking.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      items,
      pagination: { page: query.page, pageSize: query.pageSize, total, pages: Math.ceil(total / query.pageSize) },
    });
  } catch (error) {
    console.error('Booking list failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to load bookings.' });
  }
}

const bookingTransitions: Record<string, string[]> = {
  NEW: ['CONTACTED', 'QUALIFIED', 'SCHEDULED', 'CANCELLED', 'ARCHIVED'],
  CONTACTED: ['QUALIFIED', 'SCHEDULED', 'CANCELLED', 'ARCHIVED'],
  QUALIFIED: ['SCHEDULED', 'CANCELLED', 'ARCHIVED'],
  SCHEDULED: ['COMPLETED', 'CANCELLED', 'ARCHIVED'],
  COMPLETED: [],
  CANCELLED: ['SCHEDULED', 'ARCHIVED'],
  ARCHIVED: [],
};

export async function updateBooking(req: Request, res: Response) {
  const parsed = bookingUpdateSchema.safeParse(req.body);
  if (!parsed.success || !req.admin) {
    return res.status(400).json({ success: false, message: 'Invalid booking update.' });
  }

  try {
    const existing = await prisma.booking.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ success: false, message: 'Booking not found.' });

    if (parsed.data.status && parsed.data.status !== existing.status &&
      !bookingTransitions[existing.status].includes(parsed.data.status)) {
      return res.status(409).json({ success: false, message: 'This booking status transition is not allowed.' });
    }

    if (parsed.data.preferredDate) {
      const [year, month, day] = parsed.data.preferredDate.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      const today = new Date();
      const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
      if (date.toISOString().slice(0, 10) !== parsed.data.preferredDate || date.getUTCDay() === 0 || date.getTime() < todayUtc) {
        return res.status(400).json({ success: false, message: 'Choose a valid non-Sunday booking date.' });
      }
    }

    const booking = await prisma.$transaction(async (transaction) => {
      const updatedBooking = await transaction.booking.update({ where: { id: existing.id }, data: parsed.data });
      await writeAudit(transaction, req.admin!.id, 'BOOKING_UPDATED', 'Booking', updatedBooking.id, {
        ...(parsed.data.status ? { status: parsed.data.status } : {}),
        ...(parsed.data.adminNotes !== undefined ? { notesUpdated: 'true' } : {}),
        ...(parsed.data.preferredDate ? { rescheduled: 'true' } : {}),
      });
      return updatedBooking;
    });

    return res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error('Booking update failed:', error);
    return res.status(500).json({ success: false, message: 'Unable to update booking.' });
  }
}