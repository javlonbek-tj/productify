import { relations } from 'drizzle-orm';
import { pgTable, pgEnum, uuid, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from './user.schema';
import { posts } from './post.schema';

export const reactionType = pgEnum('reaction_type', [
  'like',
  'celebrate',
  'support',
  'love',
  'insightful',
  'curious',
]);

export const postReactions = pgTable('post_reactions', {
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: reactionType('type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const postViews = pgTable('post_views', {
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const postReactionsRelations = relations(postReactions, ({ one }) => ({
  post: one(posts, { fields: [postReactions.postId], references: [posts.id] }),
  user: one(users, { fields: [postReactions.userId], references: [users.id] }),
}));

export const postViewsRelations = relations(postViews, ({ one }) => ({
  post: one(posts, { fields: [postViews.postId], references: [posts.id] }),
  user: one(users, { fields: [postViews.userId], references: [users.id] }),
}));

// Types
export type PostReaction = InferSelectModel<typeof postReactions>;
export type PostView = InferSelectModel<typeof postViews>;
export type NewPostReaction = InferInsertModel<typeof postReactions>;
export type NewPostView = InferInsertModel<typeof postViews>;
