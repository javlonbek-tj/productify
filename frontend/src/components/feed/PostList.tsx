import { Skeleton } from 'antd';
import { usePosts } from '@/hooks/posts/usePosts';
import PostCard from './PostCard';

export default function PostList() {
  const { data: posts, isPending, isError } = usePosts();

  if (isPending) {
    return (
      <div className='flex flex-col gap-3'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='rounded-lg border border-gray-200 bg-white p-4'>
            <Skeleton avatar active paragraph={{ rows: 3 }} />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className='rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500'>
        Failed to load posts.
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className='rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500'>
        No posts yet. Be the first to post!
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
