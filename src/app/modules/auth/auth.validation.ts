import { z } from "zod";
export const authValidation = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    role: z.enum(['admin', 'user']),
    address: z.string(),
  });
  export const loginValidation = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  