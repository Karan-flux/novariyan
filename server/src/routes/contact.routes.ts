import { Router } from 'express';

import { createContact } from '../controllers/contact.controller.js';
import { formSubmissionLimiter } from '../middleware/rate-limit.js';

const router = Router();

router.post('/', formSubmissionLimiter, createContact);

export default router;