import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const retentionDaysSchema = z.coerce.number().int().min(30).max(730).default(90);
const parsedDays = retentionDaysSchema.safeParse(process.env.ANALYTICS_RETENTION_DAYS ?? 90);

if (!parsedDays.success) {
  throw new Error('ANALYTICS_RETENTION_DAYS must be an integer between 30 and 730.');
}

const retentionDays = parsedDays.data ?? 90;

const prisma = new PrismaClient();

async function pruneAnalytics() {
  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
  const result = await prisma.visitorSession.deleteMany({
    where: { startedAt: { lt: cutoff } },
  });

  console.info(`Removed ${result.count} expired analytics sessions.`);
}

pruneAnalytics()
  .catch((error: unknown) => {
    console.error('Analytics retention job failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });