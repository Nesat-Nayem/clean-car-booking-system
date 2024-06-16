// middlewares/adminMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { userInterface } from './userInterface';

export const adminMiddleware = (req: userInterface, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied. Admin only.' });
  }
  next();
};
