// routes/serviceRoutes.ts
import express from 'express';
import { createService, deleteWithId, getAllServices, getServiceWithId, updateWithId } from './service.controller';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { createSlot } from '../slot/slot.controller';

const router = express.Router();


router.post('/',  authMiddleware, adminMiddleware,  createService );

router.get('/:id', getServiceWithId);

router.get('/', getAllServices);

router.put('/:id', authMiddleware, adminMiddleware, updateWithId);

router.delete('/:id', authMiddleware, adminMiddleware, deleteWithId);

router.post('/slots',  authMiddleware, adminMiddleware, createSlot);

export const serviceRouter = router;
