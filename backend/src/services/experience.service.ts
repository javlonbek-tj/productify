import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { experiences } from '../db/schema';
import { AppError } from '../utils/appError';
import type { NewExperience, UpdateExperience } from '../db/schema';

export async function getExperiences(userId: string) {
  return db.select().from(experiences).where(eq(experiences.userId, userId));
}

export async function createExperience(data: NewExperience) {
  const [experience] = await db.insert(experiences).values(data).returning();
  return experience;
}

export async function updateExperience(
  id: string,
  userId: string,
  data: UpdateExperience,
) {
  const [existing] = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, id));
  if (!existing) throw new AppError('Experience not found.', 404);
  if (existing.userId !== userId)
    throw new AppError('You are not allowed to update this experience.', 403);

  const [updated] = await db
    .update(experiences)
    .set(data)
    .where(eq(experiences.id, id))
    .returning();
  return updated;
}

export async function removeExperience(id: string, userId: string) {
  const [existing] = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, id));
  if (!existing) throw new AppError('Experience not found.', 404);
  if (existing.userId !== userId)
    throw new AppError('You are not allowed to delete this experience.', 403);

  const [deleted] = await db
    .delete(experiences)
    .where(eq(experiences.id, id))
    .returning();
  return deleted;
}
