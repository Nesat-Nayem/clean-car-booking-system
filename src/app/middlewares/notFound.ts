import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
// not found handle
const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found'
  });
};

export default notFound;