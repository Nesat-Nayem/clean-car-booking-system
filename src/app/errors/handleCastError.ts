

import { AppError } from "./AppError";

const handleCastError = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

export default handleCastError;
