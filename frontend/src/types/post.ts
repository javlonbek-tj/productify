export type PostVisibility = 'public' | 'connections' | 'private';

export type ReactionType =
  | 'like'
  | 'celebrate'
  | 'support'
  | 'love'
  | 'insightful'
  | 'curious';

export interface PostAuthor {
  id: string;
  firstname: string | null;
  lastname: string | null;
  headline: string | null;
  profilePhoto: string | null;
}

export interface PostReaction {
  postId: string;
  userId: string;
  type: ReactionType;
  createdAt: string;
}

export interface Post {
  id: string;
  content: string;
  media: string[];
  visibility: PostVisibility;
  userId: string;
  user: PostAuthor;
  reactions: PostReaction[];
  comments: { id: string }[];
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
