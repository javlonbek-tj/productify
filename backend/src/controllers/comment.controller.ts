import { Response, NextFunction } from 'express';
import * as commentService from '../services/comment.service';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type {
  CreateCommentInput,
  UpdateCommentInput,
} from '../schemas/comment.schema';

export async function getComments(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const comments = await commentService.getCommentsByPost(
      req.params.postId as string,
    );
    res.status(200).json({ status: 'success', data: comments });
  } catch (error) {
    next(error);
  }
}

export async function createComment(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const comment = await commentService.createComment({
      ...(req.body as CreateCommentInput),
      postId: req.params.postId as string,
      userId: req.user!.userId,
    });
    res.status(201).json({ status: 'success', data: comment });
  } catch (error) {
    next(error);
  }
}

export async function updateComment(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const comment = await commentService.updateComment(
      req.params.id as string,
      req.user!.userId,
      req.body as UpdateCommentInput,
    );
    res.status(200).json({ status: 'success', data: comment });
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await commentService.removeComment(
      req.params.id as string,
      req.user!.userId,
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
