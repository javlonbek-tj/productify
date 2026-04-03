import { eq, and, inArray } from 'drizzle-orm';
import { db } from '../db/db';
import { conversations, conversationParticipants, messages } from '../db/schema';
import { AppError } from '../utils/appError';

export async function getConversations(userId: string) {
  const participations = await db
    .select({ conversationId: conversationParticipants.conversationId })
    .from(conversationParticipants)
    .where(eq(conversationParticipants.userId, userId));

  if (participations.length === 0) return [];

  const ids = participations.map((p) => p.conversationId);
  return db
    .select()
    .from(conversations)
    .where(inArray(conversations.id, ids));
}

export async function getOrCreateConversation(
  userId: string,
  otherUserId: string,
) {
  // Find existing DM between the two users
  const myConversations = await db
    .select({ conversationId: conversationParticipants.conversationId })
    .from(conversationParticipants)
    .where(eq(conversationParticipants.userId, userId));

  const myIds = myConversations.map((p) => p.conversationId);

  if (myIds.length > 0) {
    const shared = await db
      .select({ conversationId: conversationParticipants.conversationId })
      .from(conversationParticipants)
      .where(
        and(
          eq(conversationParticipants.userId, otherUserId),
          inArray(conversationParticipants.conversationId, myIds),
        ),
      );

    if (shared.length > 0) {
      const [existing] = await db
        .select()
        .from(conversations)
        .where(eq(conversations.id, shared[0].conversationId));
      return existing;
    }
  }

  // Create new conversation
  const [conversation] = await db.insert(conversations).values({}).returning();
  await db.insert(conversationParticipants).values([
    { conversationId: conversation.id, userId },
    { conversationId: conversation.id, userId: otherUserId },
  ]);
  return conversation;
}

export async function getMessages(conversationId: string, userId: string) {
  const [participant] = await db
    .select()
    .from(conversationParticipants)
    .where(
      and(
        eq(conversationParticipants.conversationId, conversationId),
        eq(conversationParticipants.userId, userId),
      ),
    );
  if (!participant)
    throw new AppError('You are not a participant in this conversation.', 403);

  return db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId));
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string,
) {
  const [participant] = await db
    .select()
    .from(conversationParticipants)
    .where(
      and(
        eq(conversationParticipants.conversationId, conversationId),
        eq(conversationParticipants.userId, senderId),
      ),
    );
  if (!participant)
    throw new AppError('You are not a participant in this conversation.', 403);

  const [message] = await db
    .insert(messages)
    .values({ conversationId, senderId, content })
    .returning();
  return message;
}
