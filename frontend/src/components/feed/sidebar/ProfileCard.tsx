import { Link } from 'react-router';
import { Avatar } from 'antd';
import { BsPlusLg } from 'react-icons/bs';
import { useAuthStore } from '@/store/authStore';
import { getInitials, getFullName } from '@/utils/user.utils';

export default function ProfileCard() {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  const initials = getInitials(user.firstname, user.lastname, user.email);
  const fullName = getFullName(user.firstname, user.lastname, user.email);

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
      {/* Banner */}
      <Link to='/profile'>
        <div className='h-14 bg-linear-to-r from-blue-300 to-blue-500' />
      </Link>

      {/* Avatar */}
      <div className='-mt-8 px-3'>
        <Avatar
          size={64}
          src={user.profilePhoto ?? undefined}
          className='border-2 border-white bg-[#0A66C2] text-xl font-semibold text-white'
        >
          {!user.profilePhoto && initials}
        </Avatar>
      </div>

      {/* Name + headline + location */}
      <div className='px-3 pt-1 pb-3'>
        <Link
          to='/profile'
          className='block text-sm font-semibold text-gray-900 hover:underline truncate'
        >
          {fullName}
        </Link>
        <p className='mt-0.5 text-xs text-gray-600 leading-snug'>
          {user.headline ?? 'Add a headline'}
        </p>
        {user.location && (
          <p className='mt-0.5 text-xs text-gray-500'>{user.location}</p>
        )}

        {/* + Experience button */}
        <Link
          to='/profile'
          className='mt-3 block w-full rounded bg-gray-100 p-0.5 transition-colors hover:bg-gray-200'
        >
          <div className='flex items-center gap-1 rounded border border-dashed border-gray-500 px-2 py-1 text-xs font-semibold text-gray-600'>
            <BsPlusLg size={12} />
            Experience
          </div>
        </Link>
      </div>
    </div>
  );
}
