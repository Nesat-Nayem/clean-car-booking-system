// routes/slotRoutes.ts
import express from 'express';

import { createSlot, getAllSlots } from './slot.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { adminMiddleware } from '../../middlewares/adminMiddleware';

const router = express.Router();

// router.post('/',  authMiddleware, adminMiddleware, createSlot);

router.get('/availability', getAllSlots);

export const slotRouter = router;
