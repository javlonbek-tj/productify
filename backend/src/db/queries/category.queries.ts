import { eq } from 'drizzle-orm';
import { db } from '../index';
import { categories, type NewCategory, type UpdateCategory } from '../schema';

export const categoryQueries = {
  findAll: () => db.select().from(categories),

  findById: async (id: string) => {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  },

  findByName: async (name: string) => {
    const [category] = await db.select().from(categories).where(eq(categories.name, name));
    return category;
  },

  create: async (data: NewCategory) => {
    const [category] = await db.insert(categories).values(data).returning();
    return category;
  },

  update: async (id: string, data: UpdateCategory) => {
    const [category] = await db.update(categories).set(data).where(eq(categories.id, id)).returning();
    return category;
  },

  delete: async (id: string) => {
    const [category] = await db.delete(categories).where(eq(categories.id, id)).returning();
    return category;
  },
};
