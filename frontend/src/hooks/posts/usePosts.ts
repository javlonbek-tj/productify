import { useQuery } from '@tanstack/react-query';
import { postsApi } from '@/api/posts.api';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getAll,
  });
}
