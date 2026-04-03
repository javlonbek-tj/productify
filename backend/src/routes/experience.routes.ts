import { Router } from 'express';
import type { Response } from 'express';
import * as experienceController from '../controllers/experience.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createExperienceSchema,
  updateExperienceSchema,
} from '../schemas/experience.schema';
import type { AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res: Response, next) =>
  experienceController.getExperiences(req as AuthRequest, res, next),
);
router.post('/', validate(createExperienceSchema), (req, res: Response, next) =>
  experienceController.createExperience(req as AuthRequest, res, next),
);
router.patch('/:id', validate(updateExperienceSchema), (req, res: Response, next) =>
  experienceController.updateExperience(req as AuthRequest, res, next),
);
router.delete('/:id', (req, res: Response, next) =>
  experienceController.deleteExperience(req as AuthRequest, res, next),
);

export default router;
