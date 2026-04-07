import { useState } from 'react';
import { Link } from 'react-router';
import { Avatar, Dropdown } from 'antd';
import {
  BsGlobe,
  BsPeopleFill,
  BsLockFill,
  BsThreeDots,
  BsHandThumbsUpFill,
} from 'react-icons/bs';
import { getInitials, getFullName } from '@/utils/user.utils';
import { formatTimeAgo } from '@/utils/time.utils';
import PostMedia from './post/PostMedia';
import PostActions from './post/PostActions';
import type { Post } from '@/types/post';

const VISIBILITY_ICON = {
  public: <BsGlobe size={12} />,
  connections: <BsPeopleFill size={12} />,
  private: <BsLockFill size={12} />,
};

const CONTENT_LIMIT = 300;

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { user } = post;

  const initials = getInitials(user.firstname, user.lastname, user.id);
  const fullName = getFullName(user.firstname, user.lastname, user.id);
  const isLong = post.content.length > CONTENT_LIMIT;
  const displayContent =
    isLong && !expanded ? post.content.slice(0, CONTENT_LIMIT) + '…' : post.content;

  return (
    <div className='rounded-lg border border-gray-200 bg-white'>
      {/* Header */}
      <div className='flex items-start justify-between px-4 pt-4 pb-2'>
        <div className='flex items-start gap-3'>
          <Link to={`/profile/${user.id}`}>
            <Avatar
              size={48}
              src={user.profilePhoto ?? undefined}
              className='bg-[#0A66C2] font-semibold text-white'
            >
              {!user.profilePhoto && initials}
            </Avatar>
          </Link>

          <div>
            <Link
              to={`/profile/${user.id}`}
              className='text-sm font-semibold text-gray-900 hover:underline'
            >
              {fullName}
            </Link>
            {user.headline && (
              <p className='text-xs text-gray-500 line-clamp-1'>{user.headline}</p>
            )}
            <div className='flex items-center gap-1 text-xs text-gray-400'>
              <span>{formatTimeAgo(post.createdAt)}</span>
              <span>•</span>
              {VISIBILITY_ICON[post.visibility]}
            </div>
          </div>
        </div>

        <Dropdown
          trigger={['click']}
          menu={{ items: [{ key: 'report', label: 'Report post' }] }}
          placement='bottomRight'
        >
          <button className='rounded-full p-1 text-gray-500 hover:bg-gray-100'>
            <BsThreeDots size={20} />
          </button>
        </Dropdown>
      </div>

      {/* Content */}
      <div className='px-4 pb-2'>
        <p className='whitespace-pre-wrap text-sm text-gray-900'>{displayContent}</p>
        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className='text-sm font-semibold text-gray-500 hover:text-gray-800'
          >
            {expanded ? 'See less' : 'See more'}
          </button>
        )}
      </div>

      {/* Media */}
      {post.media.length > 0 && <PostMedia media={post.media} />}

      {/* Stats */}
      {(post.reactions.length > 0 || post.comments.length > 0) && (
        <div className='flex items-center justify-between px-4 py-2 text-xs text-gray-500'>
          {post.reactions.length > 0 && (
            <div className='flex items-center gap-1'>
              <span className='flex h-4 w-4 items-center justify-center rounded-full bg-[#0A66C2] text-white'>
                <BsHandThumbsUpFill size={9} />
              </span>
              <span>{post.reactions.length}</span>
            </div>
          )}
          {post.comments.length > 0 && (
            <span className='ml-auto hover:underline cursor-pointer'>
              {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className='px-2 pb-1'>
        <PostActions postId={post.id} reactions={post.reactions} />
      </div>
    </div>
  );
}
