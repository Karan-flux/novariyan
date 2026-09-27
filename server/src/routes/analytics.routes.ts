import { Router } from 'express';

import { ingestAnalyticsEvent } from '../controllers/analytics.controller.js';
import { analyticsIngestionLimiter } from '../middleware/rate-limit.js';

const router = Router();

router.post('/events', analyticsIngestionLimiter, ingestAnalyticsEvent);

export default router;