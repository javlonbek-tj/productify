import { Response, NextFunction } from 'express';
import * as socialService from '../services/social.service';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type { SendConnectionRequestInput } from '../schemas/social.schema';

export async function follow(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await socialService.follow(
      req.user!.userId,
      req.params.userId as string,
    );
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

export async function unfollow(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await socialService.unfollow(
      req.user!.userId,
      req.params.userId as string,
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function block(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await socialService.block(
      req.user!.userId,
      req.params.userId as string,
    );
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

export async function unblock(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await socialService.unblock(
      req.user!.userId,
      req.params.userId as string,
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function viewProfile(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await socialService.viewProfile(
      req.params.userId as string,
      req.user!.userId,
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function sendConnectionRequest(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await socialService.sendConnectionRequest(
      req.user!.userId,
      req.params.userId as string,
      (req.body as SendConnectionRequestInput).message,
    );
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

export async function acceptConnectionRequest(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await socialService.respondToConnectionRequest(
      req.params.id as string,
      req.user!.userId,
      'accepted',
    );
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

export async function rejectConnectionRequest(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await socialService.respondToConnectionRequest(
      req.params.id as string,
      req.user!.userId,
      'rejected',
    );
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

export async function withdrawConnectionRequest(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await socialService.withdrawConnectionRequest(
      req.params.id as string,
      req.user!.userId,
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getReceivedRequests(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const requests = await socialService.getReceivedRequests(req.user!.userId);
    res.status(200).json({ status: 'success', data: requests });
  } catch (error) {
    next(error);
  }
}

export async function getSentRequests(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const requests = await socialService.getSentRequests(req.user!.userId);
    res.status(200).json({ status: 'success', data: requests });
  } catch (error) {
    next(error);
  }
}
