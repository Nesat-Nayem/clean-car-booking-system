import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError('Not Found', 404);
  next(err);
};

export default notFound;
