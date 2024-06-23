import { z } from "zod";
export const serviceValidation = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    duration: z.number().positive(),
    isDeleted: z.boolean().optional(),
  });
  