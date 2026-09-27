import { Router } from 'express';

import {
  getDashboardOverview,
  listBookings,
  listLeads,
  updateBooking,
  updateLead,
} from '../controllers/admin.controller.js';
import { requireAdmin, requireAdminRole, requireSameOrigin } from '../middleware/admin-auth.js';

const router = Router();

router.use(requireAdmin);
router.get('/overview', getDashboardOverview);
router.get('/leads', listLeads);
router.patch('/leads/:id', requireSameOrigin, requireAdminRole('SUPER_ADMIN', 'ADMIN'), updateLead);
router.get('/bookings', listBookings);
router.patch('/bookings/:id', requireSameOrigin, requireAdminRole('SUPER_ADMIN', 'ADMIN'), updateBooking);

export default router;