ALTER TYPE "LeadStatus" ADD VALUE 'PROPOSAL';
ALTER TYPE "LeadStatus" ADD VALUE 'WON';

CREATE TYPE "AnalyticsEventType" AS ENUM (
  'PAGE_VIEW',
  'SESSION_START',
  'BOOKING_STARTED',
  'BOOKING_COMPLETED',
  'CONTACT_SUBMITTED',
  'SERVICE_VIEW',
  'WORK_VIEW'
);

CREATE TABLE "VisitorSession" (
  "id" TEXT NOT NULL,
  "anonymousId" TEXT NOT NULL,
  "sessionKey" TEXT NOT NULL,
  "landingPage" TEXT NOT NULL,
  "referrer" TEXT,
  "consentVersion" TEXT NOT NULL,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "VisitorSession_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AnalyticsEvent" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "eventType" "AnalyticsEventType" NOT NULL,
  "path" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "VisitorSession_sessionKey_key" ON "VisitorSession"("sessionKey");
CREATE INDEX "VisitorSession_anonymousId_startedAt_idx" ON "VisitorSession"("anonymousId", "startedAt");
CREATE INDEX "VisitorSession_startedAt_idx" ON "VisitorSession"("startedAt");
CREATE INDEX "AnalyticsEvent_eventType_createdAt_idx" ON "AnalyticsEvent"("eventType", "createdAt");
CREATE INDEX "AnalyticsEvent_sessionId_createdAt_idx" ON "AnalyticsEvent"("sessionId", "createdAt");

ALTER TABLE "AnalyticsEvent"
ADD CONSTRAINT "AnalyticsEvent_sessionId_fkey"
FOREIGN KEY ("sessionId") REFERENCES "VisitorSession"("id")
ON DELETE CASCADE ON UPDATE CASCADE;