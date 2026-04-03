import { Router } from 'express';
import type { Response } from 'express';
import * as messageController from '../controllers/message.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  startConversationSchema,
  sendMessageSchema,
} from '../schemas/message.schema';
import type { AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/conversations', (req, res: Response, next) =>
  messageController.getConversations(req as AuthRequest, res, next),
);
router.post(
  '/conversations',
  validate(startConversationSchema),
  (req, res: Response, next) =>
    messageController.startConversation(req as AuthRequest, res, next),
);
router.get('/conversations/:conversationId', (req, res: Response, next) =>
  messageController.getMessages(req as AuthRequest, res, next),
);
router.post(
  '/conversations/:conversationId',
  validate(sendMessageSchema),
  (req, res: Response, next) =>
    messageController.sendMessage(req as AuthRequest, res, next),
);

export default router;
