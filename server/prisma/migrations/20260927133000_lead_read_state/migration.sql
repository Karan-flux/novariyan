ALTER TABLE "Lead"
ADD COLUMN "isRead" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "Lead_isRead_idx" ON "Lead"("isRead");