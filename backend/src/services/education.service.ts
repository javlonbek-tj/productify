import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { educations } from '../db/schema';
import { AppError } from '../utils/appError';
import type { NewEducation, UpdateEducation } from '../db/schema';

export async function getEducations(userId: string) {
  return db.select().from(educations).where(eq(educations.userId, userId));
}

export async function createEducation(data: NewEducation) {
  const [education] = await db.insert(educations).values(data).returning();
  return education;
}

export async function updateEducation(
  id: string,
  userId: string,
  data: UpdateEducation,
) {
  const [existing] = await db
    .select()
    .from(educations)
    .where(eq(educations.id, id));
  if (!existing) throw new AppError('Education not found.', 404);
  if (existing.userId !== userId)
    throw new AppError('You are not allowed to update this education.', 403);

  const [updated] = await db
    .update(educations)
    .set(data)
    .where(eq(educations.id, id))
    .returning();
  return updated;
}

export async function removeEducation(id: string, userId: string) {
  const [existing] = await db
    .select()
    .from(educations)
    .where(eq(educations.id, id));
  if (!existing) throw new AppError('Education not found.', 404);
  if (existing.userId !== userId)
    throw new AppError('You are not allowed to delete this education.', 403);

  const [deleted] = await db
    .delete(educations)
    .where(eq(educations.id, id))
    .returning();
  return deleted;
}
