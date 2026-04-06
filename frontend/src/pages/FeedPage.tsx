export default function FeedPage() {
  return (
    <div className='mx-auto max-w-[1128px] px-4 py-6'>
      <div className='flex gap-6'>
        {/* Left sidebar — 225px: 225/4=56.25, eng yaqin standart w-56 (224px) */}
        <aside className='hidden w-56 flex-shrink-0 lg:block'>
          <div className='rounded-lg bg-white shadow' />
        </aside>

        {/* Main feed */}
        <section className='min-w-0 flex-1'>
          <div className='rounded-lg bg-white p-4 shadow'>
            <p className='text-gray-500'>Feed — coming soon</p>
          </div>
        </section>

        {/* Right sidebar — 300px: 300/4=75 */}
        <aside className='hidden w-75 flex-shrink-0 xl:block'>
          <div className='rounded-lg bg-white shadow' />
        </aside>
      </div>
    </div>
  );
}
