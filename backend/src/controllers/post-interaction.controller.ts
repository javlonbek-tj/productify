import { Response, NextFunction } from 'express';
import * as interactionService from '../services/post-interaction.service';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type { ReactInput } from '../schemas/post-interaction.schema';

export async function reactToPost(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const reaction = await interactionService.reactToPost(
      req.params.postId as string,
      req.user!.userId,
      (req.body as ReactInput).type,
    );
    res.status(200).json({ status: 'success', data: reaction });
  } catch (error) {
    next(error);
  }
}

export async function removeReaction(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await interactionService.removeReaction(
      req.params.postId as string,
      req.user!.userId,
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function viewPost(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await interactionService.viewPost(
      req.params.postId as string,
      req.user!.userId,
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
