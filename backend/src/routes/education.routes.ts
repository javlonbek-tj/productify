import { Router } from 'express';
import type { Response } from 'express';
import * as educationController from '../controllers/education.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createEducationSchema,
  updateEducationSchema,
} from '../schemas/education.schema';
import type { AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res: Response, next) =>
  educationController.getEducations(req as AuthRequest, res, next),
);
router.post('/', validate(createEducationSchema), (req, res: Response, next) =>
  educationController.createEducation(req as AuthRequest, res, next),
);
router.patch('/:id', validate(updateEducationSchema), (req, res: Response, next) =>
  educationController.updateEducation(req as AuthRequest, res, next),
);
router.delete('/:id', (req, res: Response, next) =>
  educationController.deleteEducation(req as AuthRequest, res, next),
);

export default router;
