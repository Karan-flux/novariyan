import { Router } from 'express';

import { createBooking } from '../controllers/booking.controller.js';
import { formSubmissionLimiter } from '../middleware/rate-limit.js';

const router = Router();

router.post('/', formSubmissionLimiter, createBooking);

export default router;