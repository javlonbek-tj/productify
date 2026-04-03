import { Router } from 'express';
import type { Response } from 'express';
import * as commentController from '../controllers/comment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { updateCommentSchema } from '../schemas/comment.schema';
import type { AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.patch('/:id', validate(updateCommentSchema), (req, res: Response, next) =>
  commentController.updateComment(req as AuthRequest, res, next),
);
router.delete('/:id', (req, res: Response, next) =>
  commentController.deleteComment(req as AuthRequest, res, next),
);

export default router;
