// routes/slotRoutes.ts
import express from 'express';

import { createSlot, getAllSlots } from './slot.controller';

const router = express.Router();

router.post('/', createSlot);

router.get('/availability', getAllSlots);

export const slotRouter = router;
