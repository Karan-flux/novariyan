import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './lib/prisma.js';

const server = app.listen(env.PORT, () => {
  console.log('');
  console.log('====================================');
  console.log(' NOVARIYAN API');
  console.log('====================================');
  console.log(` Environment: ${env.NODE_ENV}`);
  console.log(` Port:        ${env.PORT}`);
  console.log(` Health:      http://localhost:${env.PORT}/api/health`);
  console.log('====================================');
  console.log('');
});

const cleanupExpiredSessions = async () => {
  try {
    await prisma.adminSession.deleteMany({ where: { expiresAt: { lte: new Date() } } });
  } catch (error) {
    console.error('Expired admin-session cleanup failed:', error instanceof Error ? error.message : 'Unknown error');
  }
};

void cleanupExpiredSessions();
const sessionCleanupTimer = setInterval(() => void cleanupExpiredSessions(), 60 * 60 * 1000);
sessionCleanupTimer.unref();

let shuttingDown = false;
const shutdown = async (signal: string) => {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\n${signal} received. Shutting down...`);
  clearInterval(sessionCleanupTimer);

  server.close(async () => {
    try {
      await prisma.$disconnect();
    } catch (error) {
      console.error('Prisma disconnect failed:', error instanceof Error ? error.message : 'Unknown error');
      process.exitCode = 1;
    }

    console.log('Server closed.');
  });
};

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});