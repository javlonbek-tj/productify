import type { AuthUser } from './user';

export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  parentCommentId: string | null;
  user?: AuthUser;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

// Requests
export interface CreateCommentRequest {
  content: string;
  parentCommentId?: string;
}

export interface UpdateCommentRequest {
  content: string;
}
