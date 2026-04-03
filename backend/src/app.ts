import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ENV } from './config';
import {
  authRouter,
  userRouter,
  postRouter,
  commentRouter,
  socialRouter,
  experienceRouter,
  educationRouter,
  notificationRouter,
  messageRouter,
} from './routes';
import { globalErrorHandler } from './controllers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/social', socialRouter);
app.use('/api/v1/experiences', experienceRouter);
app.use('/api/v1/educations', educationRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/messages', messageRouter);

app.use(globalErrorHandler);

export default app;
