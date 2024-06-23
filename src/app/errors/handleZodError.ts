// handleZodError.ts
import { ZodError } from "zod";
import { AppError } from "./AppError";

const handleZodError = (err: ZodError) => {
  const errors = err.errors.map(e => ({ path: e.path.join('. '), message: e.message }));
  const message = 'Invalid input data. ';
  return new AppError(message + JSON.stringify(errors), 400);
};

export default handleZodError;
