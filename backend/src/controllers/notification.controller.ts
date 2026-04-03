import { Response, NextFunction } from 'express';
import * as notificationService from '../services/notification.service';
import type { AuthRequest } from '../middlewares/auth.middleware';

export async function getNotifications(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const notifications = await notificationService.getNotifications(
      req.user!.userId,
    );
    res.status(200).json({ status: 'success', data: notifications });
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const notification = await notificationService.markAsRead(
      req.params.id as string,
      req.user!.userId,
    );
    res.status(200).json({ status: 'success', data: notification });
  } catch (error) {
    next(error);
  }
}

export async function markAllAsRead(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await notificationService.markAllAsRead(req.user!.userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
