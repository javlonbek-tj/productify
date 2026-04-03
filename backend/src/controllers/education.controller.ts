import { Response, NextFunction } from 'express';
import * as educationService from '../services/education.service';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type {
  CreateEducationInput,
  UpdateEducationInput,
} from '../schemas/education.schema';

export async function getEducations(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const educations = await educationService.getEducations(req.user!.userId);
    res.status(200).json({ status: 'success', data: educations });
  } catch (error) {
    next(error);
  }
}

export async function createEducation(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const education = await educationService.createEducation({
      ...(req.body as CreateEducationInput),
      userId: req.user!.userId,
    });
    res.status(201).json({ status: 'success', data: education });
  } catch (error) {
    next(error);
  }
}

export async function updateEducation(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const education = await educationService.updateEducation(
      req.params.id as string,
      req.user!.userId,
      req.body as UpdateEducationInput,
    );
    res.status(200).json({ status: 'success', data: education });
  } catch (error) {
    next(error);
  }
}

export async function deleteEducation(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await educationService.removeEducation(
      req.params.id as string,
      req.user!.userId,
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
