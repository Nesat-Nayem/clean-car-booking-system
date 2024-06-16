// routes/serviceRoutes.ts
import express, { Request, Response } from 'express';
import { z } from 'zod';
import { Service } from './service.model';
import { createService, getAllServices, getServiceWithId, updateWithId } from './service.controller';

const router = express.Router();


router.post('/',  createService );

router.get('/:id', getServiceWithId);

router.get('/', getAllServices);

router.put('/:id' ,updateWithId);

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully',
      data: service,
    });
  } catch (error:any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export const serviceRouter = router;
