import { z } from 'zod';

export const reactSchema = z.object({
  type: z.enum(['like', 'celebrate', 'support', 'love', 'insightful', 'curious']),
});

export type ReactInput = z.infer<typeof reactSchema>;
