import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { users } from '../db/schema';
import { AppError } from '../utils/appError';
import type { UpdateUser } from '../db/schema';

export async function getAllUsers() {
  return db.select().from(users);
}

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  if (!user) throw new AppError('User not found.', 404);
  return user;
}

export async function getUserProfile(id: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      posts: true,
      comments: true,
      following: true,
      followers: true,
      blockedUsers: true,
      blockedBy: true,
      profileViews: true,
      viewedProfiles: true,
      reactions: true,
      postViews: true,
      experiences: true,
      educations: true,
    },
  });
  if (!user) throw new AppError('User not found.', 404);
  return user;
}

export async function updateUser(id: string, data: UpdateUser) {
  const [existing] = await db.select().from(users).where(eq(users.id, id));
  if (!existing) throw new AppError('User not found.', 404);

  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return user;
}

export async function removeUser(id: string) {
  const [existing] = await db.select().from(users).where(eq(users.id, id));
  if (!existing) throw new AppError('User not found.', 404);

  const [user] = await db.delete(users).where(eq(users.id, id)).returning();
  return user;
}
