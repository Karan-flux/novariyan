import { Router } from 'express';

import {
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
} from '../controllers/admin-auth.controller.js';
import { requireAdmin, requireSameOrigin } from '../middleware/admin-auth.js';
import { adminLoginLimiter } from '../middleware/rate-limit.js';

const router = Router();

router.post('/login', requireSameOrigin, adminLoginLimiter, loginAdmin);
router.get('/me', requireAdmin, getCurrentAdmin);
router.post('/logout', requireAdmin, requireSameOrigin, logoutAdmin);

export default router;