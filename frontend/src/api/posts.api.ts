import api from './axiosInstance';
import type { Post, CreatePostRequest } from '@/types/post';
import type { ApiResponse } from '@/types';

export const postsApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Post[]>>('/posts');
    return response.data.data;
  },

  create: async (data: CreatePostRequest, files?: File[]) => {
    const form = new FormData();
    form.append('content', data.content);
    form.append('visibility', data.visibility ?? 'public');
    files?.forEach((file) => form.append('media', file));
    const response = await api.post<ApiResponse<Post>>('/posts', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data.data;
  },
};
