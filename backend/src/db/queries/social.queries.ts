import { eq, and } from 'drizzle-orm';
import { db } from '../index';
import {
  userFollows,
  userBlocks,
  userViews,
  type NewUserFollow,
  type NewUserBlock,
  type NewUserView,
} from '../schema';

export const socialQueries = {
  follow: async (data: NewUserFollow) => {
    const [follow] = await db.insert(userFollows).values(data).returning();
    return follow;
  },

  unfollow: async (followerId: string, followingId: string) => {
    const [follow] = await db
      .delete(userFollows)
      .where(and(eq(userFollows.followerId, followerId), eq(userFollows.followingId, followingId)))
      .returning();
    return follow;
  },

  isFollowing: async (followerId: string, followingId: string) => {
    const result = await db
      .select()
      .from(userFollows)
      .where(and(eq(userFollows.followerId, followerId), eq(userFollows.followingId, followingId)));
    return result.length > 0;
  },

  block: async (data: NewUserBlock) => {
    const [block] = await db.insert(userBlocks).values(data).returning();
    return block;
  },

  unblock: async (blockerId: string, blockedId: string) => {
    const [block] = await db
      .delete(userBlocks)
      .where(and(eq(userBlocks.blockerId, blockerId), eq(userBlocks.blockedId, blockedId)))
      .returning();
    return block;
  },

  isBlocked: async (blockerId: string, blockedId: string) => {
    const result = await db
      .select()
      .from(userBlocks)
      .where(and(eq(userBlocks.blockerId, blockerId), eq(userBlocks.blockedId, blockedId)));
    return result.length > 0;
  },

  addProfileView: async (data: NewUserView) => {
    const [view] = await db.insert(userViews).values(data).returning();
    return view;
  },
};
