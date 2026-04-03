import { relations } from 'drizzle-orm';
import { pgTable, pgEnum, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from './user.schema';

export const notificationType = pgEnum('notification_type', [
  'connection_request',
  'connection_accepted',
  'post_reaction',
  'post_comment',
  'comment_reply',
  'mention',
  'profile_view',
]);

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  recipientId: uuid('recipient_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  senderId: uuid('sender_id').references(() => users.id, { onDelete: 'cascade' }),
  type: notificationType('type').notNull(),
  entityId: uuid('entity_id'), // postId, connectionRequestId, commentId, etc.
  message: text('message'),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  recipient: one(users, {
    fields: [notifications.recipientId],
    references: [users.id],
    relationName: 'recipient',
  }),
  sender: one(users, {
    fields: [notifications.senderId],
    references: [users.id],
    relationName: 'sender',
  }),
}));

// Types
export type Notification = InferSelectModel<typeof notifications>;
export type NewNotification = InferInsertModel<typeof notifications>;
