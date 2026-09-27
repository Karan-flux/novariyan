import { randomBytes } from 'node:crypto';
import argon2 from 'argon2';
import type { Request, Response } from 'express';
import { z } from 'zod';

import { ADMIN_SESSION_COOKIE, hashSessionToken } from '../middleware/admin-auth.js';
import { env } from '../config/env.js';
import { prisma } from '../lib/prisma.js';

const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(200),
}).strict();

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: env.ADMIN_COOKIE_SAME_SITE,
    path: '/api/admin',
    maxAge: SESSION_DURATION_MS,
  };
}

export async function loginAdmin(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
    });

    const passwordHash = user?.passwordHash ?? await argon2.hash(parsed.data.password, { type: argon2.argon2id });
    const passwordMatches = await argon2.verify(passwordHash, parsed.data.password);

    if (!user || !user.isActive || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    const session = await prisma.$transaction(async (transaction) => {
      const createdSession = await transaction.adminSession.create({
        data: {
          tokenHash: hashSessionToken(token),
          userId: user.id,
          expiresAt,
        },
      });

      await transaction.auditLog.create({
        data: {
          adminUserId: user.id,
          action: 'ADMIN_LOGIN',
          entity: 'AdminSession',
          entityId: createdSession.id,
        },
      });

      return createdSession;
    });

    res.cookie(ADMIN_SESSION_COOKIE, token, cookieOptions());

    return res.status(200).json({
      success: true,
      admin: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Admin login failed:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to sign in right now.',
    });
  }
}

export async function logoutAdmin(req: Request, res: Response) {
  try {
    if (req.admin) {
      await prisma.$transaction([
        prisma.adminSession.deleteMany({ where: { id: req.admin.sessionId } }),
        prisma.auditLog.create({
          data: {
            adminUserId: req.admin.id,
            action: 'ADMIN_LOGOUT',
            entity: 'AdminSession',
            entityId: req.admin.sessionId,
          },
        }),
      ]);
    }
  } catch (error) {
    console.error('Admin logout failed:', error instanceof Error ? error.message : 'Unknown error');
      res.clearCookie(ADMIN_SESSION_COOKIE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: env.ADMIN_COOKIE_SAME_SITE,
        path: '/api/admin',
      });
    return res.status(500).json({ success: false, message: 'Unable to sign out right now.' });
  }

  res.clearCookie(ADMIN_SESSION_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: env.ADMIN_COOKIE_SAME_SITE,
    path: '/api/admin',
  });

  return res.status(200).json({ success: true });
}

export function getCurrentAdmin(req: Request, res: Response) {
  if (!req.admin) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  const { id, email, name, role } = req.admin;
  return res.status(200).json({ success: true, admin: { id, email, name, role } });
}