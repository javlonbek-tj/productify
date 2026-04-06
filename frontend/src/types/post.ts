import type { AuthUser } from './user';

export type PostVisibility = 'public' | 'connections' | 'private';

export type ReactionType =
  | 'like'
  | 'celebrate'
  | 'support'
  | 'love'
  | 'insightful'
  | 'curious';

export interface Post {
  id: string;
  content: string;
  media: string[];
  visibility: PostVisibility;
  userId: string;
  user?: AuthUser;
  createdAt: string;
  updatedAt: string;
}

// Requests
export interface CreatePostRequest {
  content: string;
  media?: string[];
  visibility?: PostVisibility;
}

export interface UpdatePostRequest {
  content?: string;
  media?: string[];
  visibility?: PostVisibility;
}

export interface ReactToPostRequest {
  type: ReactionType;
}
