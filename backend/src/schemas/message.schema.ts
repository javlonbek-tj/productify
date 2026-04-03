import { z } from 'zod';

export const startConversationSchema = z.object({
  userId: z.string().uuid('Invalid user ID.'),
});

export const sendMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty.').trim(),
});

export type StartConversationInput = z.infer<typeof startConversationSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
