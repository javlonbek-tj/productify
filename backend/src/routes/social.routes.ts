import { Router } from 'express';
import type { Response } from 'express';
import * as socialController from '../controllers/social.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { sendConnectionRequestSchema } from '../schemas/social.schema';
import type { AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

// Follow / Unfollow
router.post('/follow/:userId', (req, res: Response, next) =>
  socialController.follow(req as AuthRequest, res, next),
);
router.delete('/follow/:userId', (req, res: Response, next) =>
  socialController.unfollow(req as AuthRequest, res, next),
);

// Block / Unblock
router.post('/block/:userId', (req, res: Response, next) =>
  socialController.block(req as AuthRequest, res, next),
);
router.delete('/block/:userId', (req, res: Response, next) =>
  socialController.unblock(req as AuthRequest, res, next),
);

// Profile views
router.post('/view/:userId', (req, res: Response, next) =>
  socialController.viewProfile(req as AuthRequest, res, next),
);

// Connection requests
router.get('/connections/received', (req, res: Response, next) =>
  socialController.getReceivedRequests(req as AuthRequest, res, next),
);
router.get('/connections/sent', (req, res: Response, next) =>
  socialController.getSentRequests(req as AuthRequest, res, next),
);
router.post(
  '/connections/send/:userId',
  validate(sendConnectionRequestSchema),
  (req, res: Response, next) =>
    socialController.sendConnectionRequest(req as AuthRequest, res, next),
);
router.patch('/connections/:id/accept', (req, res: Response, next) =>
  socialController.acceptConnectionRequest(req as AuthRequest, res, next),
);
router.patch('/connections/:id/reject', (req, res: Response, next) =>
  socialController.rejectConnectionRequest(req as AuthRequest, res, next),
);
router.delete('/connections/:id', (req, res: Response, next) =>
  socialController.withdrawConnectionRequest(req as AuthRequest, res, next),
);

export default router;
