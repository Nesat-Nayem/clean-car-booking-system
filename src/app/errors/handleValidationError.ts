// handleValidationError.ts
// import { AppError } from './appError';

import { AppError } from "./AppError";

const handleValidationError = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

export default handleValidationError;
