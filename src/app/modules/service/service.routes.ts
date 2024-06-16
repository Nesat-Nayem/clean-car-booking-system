// routes/serviceRoutes.ts
import express from 'express';
import { createService, deleteWithId, getAllServices, getServiceWithId, updateWithId } from './service.controller';
import { adminMiddleware } from '../../middlewares/adminMiddleware';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();


router.post('/',  authMiddleware, adminMiddleware,  createService );

router.get('/:id', getServiceWithId);

router.get('/', getAllServices);

router.put('/:id', authMiddleware, adminMiddleware, updateWithId);

router.delete('/:id', authMiddleware, adminMiddleware, deleteWithId);

export const serviceRouter = router;
