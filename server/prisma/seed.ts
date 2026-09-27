import 'dotenv/config';
import argon2 from 'argon2';
import { z } from 'zod';

import { prisma } from '../src/lib/prisma.js';

const bootstrapSchema = z.object({
  ADMIN_EMAIL: z.string().trim().email().max(255),
  ADMIN_PASSWORD: z.string().min(12).max(200),
  ADMIN_NAME: z.string().trim().min(2).max(100).default('NOVARIYAN Admin'),
});

async function bootstrapAdmin() {
  const parsed = bootstrapSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error('Set a valid ADMIN_EMAIL, ADMIN_NAME, and ADMIN_PASSWORD (at least 12 characters) before bootstrapping.');
  }

  const email = parsed.data.ADMIN_EMAIL.toLowerCase();
  const existing = await prisma.adminUser.findUnique({ where: { email } });

  if (existing) {
    throw new Error('An admin with this email already exists; bootstrap will not change existing credentials.');
  }

  await prisma.adminUser.create({
    data: {
      email,
      name: parsed.data.ADMIN_NAME,
      passwordHash: await argon2.hash(parsed.data.ADMIN_PASSWORD, {
        type: argon2.argon2id,
      }),
      role: 'SUPER_ADMIN',
    },
  });

  console.info('Initial administrator created.');
}

bootstrapAdmin()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : 'Admin bootstrap failed.');
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });