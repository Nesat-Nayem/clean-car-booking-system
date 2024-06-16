// middlewares/adminMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (
  req: Request & { user: { role: any } },
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. Admin only." });
  }
  next();
};
