import { relations } from 'drizzle-orm';
import { pgTable, pgEnum, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from './user.schema';
import { comments } from './comment.schema';
import { postReactions, postViews } from './post-interaction.schema';

export const postVisibility = pgEnum('post_visibility', ['public', 'connections', 'private']);

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  media: text('media').array().default([]),
  visibility: postVisibility('visibility').default('public').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
  comments: many(comments),
  reactions: many(postReactions),
  views: many(postViews),
}));

// Types
export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;
export type UpdatePost = Partial<Omit<NewPost, 'id' | 'createdAt'>>;
