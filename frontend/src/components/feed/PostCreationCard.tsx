import { useState } from 'react';
import { Avatar } from 'antd';
import { BsImageFill, BsPlayBtnFill, BsFileEarmarkTextFill } from 'react-icons/bs';
import { useAuthStore } from '@/store/authStore';
import { getInitials } from '@/utils/user.utils';
import PostModal from './PostModal';

const quickActions = [
  { label: 'Photo', icon: BsImageFill, color: 'text-blue-500' },
  { label: 'Video', icon: BsPlayBtnFill, color: 'text-green-500' },
  { label: 'Write article', icon: BsFileEarmarkTextFill, color: 'text-orange-500' },
];

export default function PostCreationCard() {
  const user = useAuthStore((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

  if (!user) return null;

  const initials = getInitials(user.firstname, user.lastname, user.email);

  return (
    <>
      <div className='rounded-lg border border-gray-200 bg-white p-3'>
        {/* Top row: avatar + input */}
        <div className='flex items-center gap-2'>
          <Avatar
            size={48}
            src={user.profilePhoto ?? undefined}
            className='shrink-0 bg-[#0A66C2] font-semibold text-white'
          >
            {!user.profilePhoto && initials}
          </Avatar>

          <button
            onClick={() => setModalOpen(true)}
            className='flex-1 rounded-full border border-gray-400 px-4 py-2.5 text-left text-sm font-semibold text-gray-500 hover:bg-gray-100'
          >
            Start a post
          </button>
        </div>

        {/* Quick action buttons */}
        <div className='mt-2 flex items-center justify-around'>
          {quickActions.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              onClick={() => setModalOpen(true)}
              className='flex items-center gap-2 rounded px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100'
            >
              <Icon size={18} className={color} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <PostModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
