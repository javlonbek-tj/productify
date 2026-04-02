import { eq, and } from 'drizzle-orm';
import { db } from '../index';
import {
  postLikes,
  postDislikes,
  postViews,
  type NewPostLike,
  type NewPostDislike,
  type NewPostView,
} from '../schema';

export const postInteractionQueries = {
  addLike: async (data: NewPostLike) => {
    const [like] = await db.insert(postLikes).values(data).returning();
    return like;
  },

  removeLike: async (postId: string, userId: string) => {
    const [like] = await db
      .delete(postLikes)
      .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)))
      .returning();
    return like;
  },

  addDislike: async (data: NewPostDislike) => {
    const [dislike] = await db.insert(postDislikes).values(data).returning();
    return dislike;
  },

  removeDislike: async (postId: string, userId: string) => {
    const [dislike] = await db
      .delete(postDislikes)
      .where(and(eq(postDislikes.postId, postId), eq(postDislikes.userId, userId)))
      .returning();
    return dislike;
  },

  addView: async (data: NewPostView) => {
    const [view] = await db.insert(postViews).values(data).returning();
    return view;
  },
};
