import { z } from 'zod';

export const createEducationSchema = z.object({
  school: z.string().min(1, 'School is required.').trim(),
  degree: z.string().trim().optional(),
  field: z.string().trim().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  description: z.string().trim().optional(),
});

export const updateEducationSchema = createEducationSchema.partial();

export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
