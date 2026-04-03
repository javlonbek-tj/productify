import { z } from 'zod';

export const createExperienceSchema = z.object({
  title: z.string().min(1, 'Title is required.').trim(),
  company: z.string().min(1, 'Company is required.').trim(),
  location: z.string().trim().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  description: z.string().trim().optional(),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
