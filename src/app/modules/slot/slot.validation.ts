import { z } from "zod";

export const slotValidation = z.object({
    service: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  });