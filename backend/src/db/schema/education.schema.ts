import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from './user.schema';

export const educations = pgTable('educations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  school: text('school').notNull(),
  degree: text('degree'),
  field: text('field'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

export const educationsRelations = relations(educations, ({ one }) => ({
  user: one(users, { fields: [educations.userId], references: [users.id] }),
}));

// Types
export type Education = InferSelectModel<typeof educations>;
export type NewEducation = InferInsertModel<typeof educations>;
export type UpdateEducation = Partial<Omit<NewEducation, 'id' | 'createdAt'>>;
