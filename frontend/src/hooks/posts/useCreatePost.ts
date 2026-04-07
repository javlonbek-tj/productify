import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@/api/posts.api';
import type { CreatePostRequest } from '@/types/post';

interface CreatePostPayload {
  data: CreatePostRequest;
  files?: File[];
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, files }: CreatePostPayload) => postsApi.create(data, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
