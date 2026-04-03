import { Router } from 'express';
import type { Response } from 'express';
import * as notificationController from '../controllers/notification.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import type { AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res: Response, next) =>
  notificationController.getNotifications(req as AuthRequest, res, next),
);
router.patch('/read-all', (req, res: Response, next) =>
  notificationController.markAllAsRead(req as AuthRequest, res, next),
);
router.patch('/:id/read', (req, res: Response, next) =>
  notificationController.markAsRead(req as AuthRequest, res, next),
);

export default router;
