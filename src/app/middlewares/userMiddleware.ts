import { Request, Response, NextFunction } from 'express';
import { userInterface } from './userInterface';
export const userMiddleware = (req: userInterface, res: Response, next: NextFunction) => {
  if (req.user.role !== 'user') {
    return res.status(401).json({ success: false,  "statusCode": 401, message: 'You have no access to this route.' });
  }
  next();
};
