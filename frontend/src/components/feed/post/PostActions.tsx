import { BsHandThumbsUp, BsHandThumbsUpFill, BsChatDots, BsArrowRepeat, BsSend } from 'react-icons/bs';
import { useAuthStore } from '@/store/authStore';
import { useReactToPost } from '@/hooks/posts/useReactToPost';
import type { PostReaction } from '@/types/post';

interface Props {
  postId: string;
  reactions: PostReaction[];
}

const actionClass =
  'flex flex-1 items-center justify-center gap-1.5 rounded py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100';

export default function PostActions({ postId, reactions }: Props) {
  const userId = useAuthStore((s) => s.user?.id);
  const { react, remove } = useReactToPost();

  const myReaction = reactions.find((r) => r.userId === userId);
  const isLiked = !!myReaction;
  const isPending = react.isPending || remove.isPending;

  function toggleLike() {
    if (isPending) return;
    if (isLiked) {
      remove.mutate(postId);
    } else {
      react.mutate({ postId, type: 'like' });
    }
  }

  return (
    <div className='flex items-center border-t border-gray-200 pt-1'>
      <button onClick={toggleLike} className={`${actionClass} ${isLiked ? 'text-[#0A66C2]' : ''}`}>
        {isLiked ? <BsHandThumbsUpFill size={18} /> : <BsHandThumbsUp size={18} />}
        Like
      </button>

      <button className={actionClass}>
        <BsChatDots size={18} />
        Comment
      </button>

      <button className={actionClass}>
        <BsArrowRepeat size={18} />
        Repost
      </button>

      <button className={actionClass}>
        <BsSend size={18} />
        Send
      </button>
    </div>
  );
}
