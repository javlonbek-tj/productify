import { Link } from 'react-router';
import { BsBookmarkFill } from 'react-icons/bs';

export default function MyItems() {
  return (
    <div className='rounded-lg border border-gray-200 bg-white px-3 py-2'>
      <Link
        to='/saved'
        className='flex items-center gap-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0A66C2]'
      >
        <BsBookmarkFill size={16} className='text-gray-500' />
        Saved items
      </Link>
    </div>
  );
}
