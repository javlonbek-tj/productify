import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reactionsApi } from '@/api/reactions.api';

export function useReactToPost() {
  const queryClient = useQueryClient();

  const react = useMutation({
    mutationFn: ({ postId, type }: { postId: string; type: 'like' }) =>
      reactionsApi.react(postId, type),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  const remove = useMutation({
    mutationFn: (postId: string) => reactionsApi.remove(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  return { react, remove };
}
