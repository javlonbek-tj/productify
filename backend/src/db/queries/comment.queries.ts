import { eq } from 'drizzle-orm';
import { db } from '../index';
import { comments, type NewComment, type UpdateComment } from '../schema';

export const commentQueries = {
  findById: async (id: string) => {
    const [comment] = await db.select().from(comments).where(eq(comments.id, id));
    return comment;
  },

  findByPost: (postId: string) =>
    db.select().from(comments).where(eq(comments.postId, postId)),

  findByUser: (userId: string) =>
    db.select().from(comments).where(eq(comments.userId, userId)),

  create: async (data: NewComment) => {
    const [comment] = await db.insert(comments).values(data).returning();
    return comment;
  },

  update: async (id: string, data: UpdateComment) => {
    const [comment] = await db.update(comments).set(data).where(eq(comments.id, id)).returning();
    return comment;
  },

  delete: async (id: string) => {
    const [comment] = await db.delete(comments).where(eq(comments.id, id)).returning();
    return comment;
  },
};
