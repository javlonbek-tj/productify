import { useNavigate } from 'react-router';
import { Avatar, Dropdown } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { useLogout } from '@/hooks/auth/useForgotPassword';

export default function UserMenu() {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const initial = user?.firstname?.[0] ?? user?.email?.[0]?.toUpperCase() ?? '?';

  const items = [
    {
      key: 'header',
      label: (
        <div className='py-1'>
          <p className='font-semibold text-gray-900'>
            {user?.firstname && user?.lastname
              ? `${user.firstname} ${user.lastname}`
              : user?.email}
          </p>
          <p className='text-xs text-gray-500'>{user?.email}</p>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' as const },
    {
      key: 'profile',
      label: 'View Profile',
      onClick: () => void navigate(`/profile/${user?.id}`),
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      label: <span className='text-gray-700'>Sign Out</span>,
      onClick: () => logout(),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
      <button className='flex cursor-pointer flex-col items-center justify-center gap-0.5 border-b-2 border-transparent px-3 hover:border-gray-400'>
        <Avatar
          size={24}
          src={user?.profilePhoto ?? undefined}
          className='bg-[#0A66C2] text-xs'
        >
          {initial}
        </Avatar>
        <span className='text-xs font-medium text-gray-600'>Me ▾</span>
      </button>
    </Dropdown>
  );
}
