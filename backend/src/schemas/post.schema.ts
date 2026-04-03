import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1, 'Content is required.').trim(),
  media: z.array(z.string().url()).optional(),
  visibility: z.enum(['public', 'connections', 'private']).default('public'),
});

export const updatePostSchema = z.object({
  content: z.string().min(1).trim().optional(),
  media: z.array(z.string().url()).optional(),
  visibility: z.enum(['public', 'connections', 'private']).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
