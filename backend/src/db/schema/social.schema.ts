import { relations } from 'drizzle-orm';
import { pgTable, pgEnum, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from './user.schema';

export const connectionStatus = pgEnum('connection_status', [
  'pending',
  'accepted',
  'rejected',
  'withdrawn',
]);

export const connectionRequests = pgTable('connection_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  senderId: uuid('sender_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  receiverId: uuid('receiver_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: connectionStatus('status').default('pending').notNull(),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

// Follow without connecting (e.g. following a thought leader)
export const userFollows = pgTable('user_follows', {
  followerId: uuid('follower_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  followingId: uuid('following_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userBlocks = pgTable('user_blocks', {
  blockerId: uuid('blocker_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  blockedId: uuid('blocked_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userViews = pgTable('user_views', {
  profileOwnerId: uuid('profile_owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  viewerId: uuid('viewer_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const connectionRequestsRelations = relations(connectionRequests, ({ one }) => ({
  sender: one(users, {
    fields: [connectionRequests.senderId],
    references: [users.id],
    relationName: 'sender',
  }),
  receiver: one(users, {
    fields: [connectionRequests.receiverId],
    references: [users.id],
    relationName: 'receiver',
  }),
}));

export const userFollowsRelations = relations(userFollows, ({ one }) => ({
  follower: one(users, {
    fields: [userFollows.followerId],
    references: [users.id],
    relationName: 'follower',
  }),
  following: one(users, {
    fields: [userFollows.followingId],
    references: [users.id],
    relationName: 'following',
  }),
}));

export const userBlocksRelations = relations(userBlocks, ({ one }) => ({
  blocker: one(users, {
    fields: [userBlocks.blockerId],
    references: [users.id],
    relationName: 'blocker',
  }),
  blocked: one(users, {
    fields: [userBlocks.blockedId],
    references: [users.id],
    relationName: 'blocked',
  }),
}));

export const userViewsRelations = relations(userViews, ({ one }) => ({
  profileOwner: one(users, {
    fields: [userViews.profileOwnerId],
    references: [users.id],
    relationName: 'profileOwner',
  }),
  viewer: one(users, {
    fields: [userViews.viewerId],
    references: [users.id],
    relationName: 'viewer',
  }),
}));

// Types
export type ConnectionRequest = InferSelectModel<typeof connectionRequests>;
export type NewConnectionRequest = InferInsertModel<typeof connectionRequests>;
export type UpdateConnectionRequest = Partial<Omit<NewConnectionRequest, 'id' | 'createdAt'>>;
export type UserFollow = InferSelectModel<typeof userFollows>;
export type UserBlock = InferSelectModel<typeof userBlocks>;
export type UserView = InferSelectModel<typeof userViews>;
export type NewUserFollow = InferInsertModel<typeof userFollows>;
export type NewUserBlock = InferInsertModel<typeof userBlocks>;
export type NewUserView = InferInsertModel<typeof userViews>;
