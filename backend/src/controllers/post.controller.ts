import { Response, NextFunction } from 'express';
import * as postService from '../services/post.service';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type { CreatePostInput, UpdatePostInput } from '../schemas/post.schema';

export async function getAllPosts(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({ status: 'success', data: posts });
  } catch (error) {
    next(error);
  }
}

export async function getPost(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const post = await postService.getPostWithRelations(
      req.params.id as string,
    );
    res.status(200).json({ status: 'success', data: post });
  } catch (error) {
    next(error);
  }
}

export async function getMyPosts(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const posts = await postService.getPostsByUser(req.user!.userId);
    res.status(200).json({ status: 'success', data: posts });
  } catch (error) {
    next(error);
  }
}

export async function getUserPosts(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const posts = await postService.getPostsByUser(
      req.params.userId as string,
    );
    res.status(200).json({ status: 'success', data: posts });
  } catch (error) {
    next(error);
  }
}

export async function createPost(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const post = await postService.createPost({
      ...(req.body as CreatePostInput),
      userId: req.user!.userId,
    });
    res.status(201).json({ status: 'success', data: post });
  } catch (error) {
    next(error);
  }
}

export async function updatePost(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const post = await postService.updatePost(
      req.params.id as string,
      req.user!.userId,
      req.body as UpdatePostInput,
    );
    res.status(200).json({ status: 'success', data: post });
  } catch (error) {
    next(error);
  }
}

export async function deletePost(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await postService.removePost(req.params.id as string, req.user!.userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
