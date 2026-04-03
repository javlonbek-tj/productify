import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from './user.schema';

export const experiences = pgTable('experiences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'), // null = current position
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

export const experiencesRelations = relations(experiences, ({ one }) => ({
  user: one(users, { fields: [experiences.userId], references: [users.id] }),
}));

// Types
export type Experience = InferSelectModel<typeof experiences>;
export type NewExperience = InferInsertModel<typeof experiences>;
export type UpdateExperience = Partial<Omit<NewExperience, 'id' | 'createdAt'>>;
