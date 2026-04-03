import { Response, NextFunction } from 'express';
import * as experienceService from '../services/experience.service';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type {
  CreateExperienceInput,
  UpdateExperienceInput,
} from '../schemas/experience.schema';

export async function getExperiences(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const experiences = await experienceService.getExperiences(
      req.user!.userId,
    );
    res.status(200).json({ status: 'success', data: experiences });
  } catch (error) {
    next(error);
  }
}

export async function createExperience(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const experience = await experienceService.createExperience({
      ...(req.body as CreateExperienceInput),
      userId: req.user!.userId,
    });
    res.status(201).json({ status: 'success', data: experience });
  } catch (error) {
    next(error);
  }
}

export async function updateExperience(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const experience = await experienceService.updateExperience(
      req.params.id as string,
      req.user!.userId,
      req.body as UpdateExperienceInput,
    );
    res.status(200).json({ status: 'success', data: experience });
  } catch (error) {
    next(error);
  }
}

export async function deleteExperience(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await experienceService.removeExperience(
      req.params.id as string,
      req.user!.userId,
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
