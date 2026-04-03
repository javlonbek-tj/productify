import { Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type { UpdateUserInput } from '../schemas/user.schema';

export async function getMe(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await userService.getUserProfile(req.user!.userId);
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
}

export async function updateMe(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await userService.updateUser(
      req.user!.userId,
      req.body as UpdateUserInput,
    );
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
}

export async function deleteMe(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await userService.removeUser(req.user!.userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getUserProfile(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await userService.getUserProfile(req.params.id as string);
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    next(error);
  }
}
