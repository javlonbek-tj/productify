import api from './axiosInstance';
import type { ReactionType } from '@/types/post';

export const reactionsApi = {
  react: (postId: string, type: ReactionType) =>
    api.put(`/posts/${postId}/reactions`, { type }),

  remove: (postId: string) =>
    api.delete(`/posts/${postId}/reactions`),
};
