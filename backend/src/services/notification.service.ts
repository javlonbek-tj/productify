import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { notifications } from '../db/schema';
import { AppError } from '../utils/appError';
import type { NewNotification } from '../db/schema';

export async function getNotifications(userId: string) {
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.recipientId, userId));
}

export async function createNotification(data: NewNotification) {
  const [notification] = await db
    .insert(notifications)
    .values(data)
    .returning();
  return notification;
}

export async function markAsRead(id: string, userId: string) {
  const [notification] = await db
    .select()
    .from(notifications)
    .where(eq(notifications.id, id));
  if (!notification) throw new AppError('Notification not found.', 404);
  if (notification.recipientId !== userId)
    throw new AppError('Not authorized.', 403);

  const [updated] = await db
    .update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.id, id))
    .returning();
  return updated;
}

export async function markAllAsRead(userId: string) {
  await db
    .update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.recipientId, userId));
}
