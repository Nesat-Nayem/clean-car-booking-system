import express from 'express';

import {  getAllSlots } from './slot.controller';

const router = express.Router();

router.get('/availability', getAllSlots);

export const slotRouter = router;
