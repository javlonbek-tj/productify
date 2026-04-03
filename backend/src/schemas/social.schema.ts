import { z } from 'zod';

export const sendConnectionRequestSchema = z.object({
  message: z.string().max(300).trim().optional(),
});

export type SendConnectionRequestInput = z.infer<typeof sendConnectionRequestSchema>;
