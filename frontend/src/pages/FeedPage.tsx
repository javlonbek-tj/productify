import LeftSidebar from '@/components/feed/sidebar/LeftSidebar';
import PostCreationCard from '@/components/feed/PostCreationCard';
import PostList from '@/components/feed/PostList';

export default function FeedPage() {
  return (
    <div className='mx-auto max-w-[1128px] px-4 py-6'>
      <div className='flex gap-6'>
        {/* Left sidebar */}
        <aside className='hidden w-56 flex-shrink-0 lg:block'>
          <div className='sticky top-[76px]'>
            <LeftSidebar />
          </div>
        </aside>

        {/* Main feed */}
        <section className='flex min-w-0 flex-1 flex-col gap-3'>
          <PostCreationCard />
          <PostList />
        </section>

        {/* Right sidebar — 300px: 300/4=75 */}
        <aside className='hidden w-75 flex-shrink-0 xl:block'>
          <div className='rounded-lg bg-white shadow' />
        </aside>
      </div>
    </div>
  );
}
