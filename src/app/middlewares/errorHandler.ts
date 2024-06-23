// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      path: issue.path[0],
      message: issue.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errorMessages: errors,
      stack: err.stack,
    });
  }

  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
