import { createHash } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

import { prisma } from '../lib/prisma.js';
import { env } from '../config/env.js';

export const ADMIN_SESSION_COOKIE = 'novariyan_admin_session';

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        email: string;
        name: string;
        role: string;
        sessionId: string;
      };
    }
  }
}

export function hashSessionToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.[ADMIN_SESSION_COOKIE];

  if (typeof token !== 'string' || token.length < 32) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  try {
    const session = await prisma.adminSession.findUnique({
      where: { tokenHash: hashSessionToken(token) },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
          },
        },
      },
    });

    if (!session || session.expiresAt <= new Date() || !session.user.isActive) {
      if (session) {
        await prisma.adminSession.deleteMany({ where: { id: session.id } });
      }

      res.clearCookie(ADMIN_SESSION_COOKIE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: env.ADMIN_COOKIE_SAME_SITE,
        path: '/api/admin',
      });

      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    req.admin = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
      sessionId: session.id,
    };

    return next();
  } catch (error) {
    return next(error);
  }
}

export function requireAdminRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to perform this action.',
      });
    }

    return next();
  };
}

export function requireSameOrigin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const origin = req.get('origin');

  if (origin !== env.CORS_ORIGIN) {
    return res.status(403).json({
      success: false,
      message: 'Request origin is not allowed.',
    });
  }

  return next();
}