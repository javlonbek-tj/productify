import { Link } from 'react-router';

export default function ProfileAnalytics() {
  return (
    <div className='rounded-lg border border-gray-200 bg-white px-3 py-2'>
      <Link
        to='/profile/analytics'
        className='flex items-center justify-between py-2 hover:bg-gray-50 -mx-3 px-3 rounded'
      >
        <span className='text-sm text-gray-700'>Profile viewers</span>
        <span className='text-sm font-semibold text-[#0A66C2]'>0</span>
      </Link>

      <Link
        to='/profile/analytics'
        className='block py-2 text-sm font-semibold text-gray-700 hover:text-[#0A66C2]'
      >
        View all analytics
      </Link>
    </div>
  );
}
