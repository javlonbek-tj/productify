import { Response, NextFunction } from 'express';
import * as messageService from '../services/message.service';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type {
  StartConversationInput,
  SendMessageInput,
} from '../schemas/message.schema';

export async function getConversations(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const conversations = await messageService.getConversations(
      req.user!.userId,
    );
    res.status(200).json({ status: 'success', data: conversations });
  } catch (error) {
    next(error);
  }
}

export async function startConversation(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const conversation = await messageService.getOrCreateConversation(
      req.user!.userId,
      (req.body as StartConversationInput).userId,
    );
    res.status(200).json({ status: 'success', data: conversation });
  } catch (error) {
    next(error);
  }
}

export async function getMessages(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const messages = await messageService.getMessages(
      req.params.conversationId as string,
      req.user!.userId,
    );
    res.status(200).json({ status: 'success', data: messages });
  } catch (error) {
    next(error);
  }
}

export async function sendMessage(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const message = await messageService.sendMessage(
      req.params.conversationId as string,
      req.user!.userId,
      (req.body as SendMessageInput).content,
    );
    res.status(201).json({ status: 'success', data: message });
  } catch (error) {
    next(error);
  }
}
