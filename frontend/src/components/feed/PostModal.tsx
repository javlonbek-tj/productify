import { useState } from 'react';
import { Modal, Avatar, Button, Dropdown, Upload, Image, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  BsImageFill,
  BsGlobe,
  BsPeopleFill,
  BsLockFill,
  BsChevronDown,
} from 'react-icons/bs';
import type { UploadFile, UploadProps, GetProp } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { useCreatePost } from '@/hooks/posts/useCreatePost';
import { getInitials, getFullName } from '@/utils/user.utils';
import type { PostVisibility } from '@/types/post';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface Props {
  open: boolean;
  onClose: () => void;
}

const VISIBILITY_OPTIONS: {
  value: PostVisibility;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: 'public', label: 'Anyone', icon: <BsGlobe size={14} /> },
  { value: 'connections', label: 'Connections only', icon: <BsPeopleFill size={14} /> },
  { value: 'private', label: 'Only me', icon: <BsLockFill size={14} /> },
];

function beforeUpload(file: FileType) {
  const isAllowed =
    file.type.startsWith('image/') || file.type.startsWith('video/');
  if (!isAllowed) {
    message.error('Only image and video files are allowed.');
    return Upload.LIST_IGNORE;
  }
  const isUnder10MB = file.size / 1024 / 1024 < 10;
  if (!isUnder10MB) {
    message.error('File must be smaller than 10 MB.');
    return Upload.LIST_IGNORE;
  }
  return false;
}

export default function PostModal({ open, onClose }: Props) {
  const user = useAuthStore((state) => state.user);
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<PostVisibility>('public');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewSrc, setPreviewSrc] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const { mutate: createPost, isPending } = useCreatePost();

  if (!user) return null;

  const initials = getInitials(user.firstname, user.lastname, user.email);
  const fullName = getFullName(user.firstname, user.lastname, user.email);
  const selected = VISIBILITY_OPTIONS.find((o) => o.value === visibility)!;

  function handlePreview(file: UploadFile) {
    const src = file.url ?? (file.originFileObj ? URL.createObjectURL(file.originFileObj as File) : '');
    setPreviewSrc(src);
    setPreviewOpen(true);
  }

  function handleSubmit() {
    if (!content.trim()) return;
    const files = fileList
      .map((f) => f.originFileObj)
      .filter((f): f is File => f instanceof File);

    createPost(
      { data: { content: content.trim(), visibility }, files },
      { onSuccess: () => handleClose() },
    );
  }

  function handleClose() {
    setContent('');
    setVisibility('public');
    setFileList([]);
    onClose();
  }

  const showUploadArea = fileList.length < 10;

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title='Create a post'
      width={552}
      destroyOnHidden
    >
      {/* Author */}
      <div className='flex items-center gap-3 py-3'>
        <Avatar
          size={48}
          src={user.profilePhoto ?? undefined}
          className='bg-[#0A66C2] font-semibold text-white'
        >
          {!user.profilePhoto && initials}
        </Avatar>
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-semibold text-gray-900'>{fullName}</p>
          <Dropdown
            trigger={['click']}
            menu={{
              items: VISIBILITY_OPTIONS.map((o) => ({
                key: o.value,
                label: (
                  <span className='flex items-center gap-2'>
                    {o.icon}
                    {o.label}
                  </span>
                ),
                onClick: () => setVisibility(o.value),
              })),
              selectedKeys: [visibility],
            }}
          >
            <button className='flex items-center gap-1 rounded-full border border-gray-400 px-2 py-0.5 text-xs font-semibold text-gray-700 hover:bg-gray-50'>
              {selected.icon}
              {selected.label}
              <BsChevronDown size={10} />
            </button>
          </Dropdown>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='What do you want to talk about?'
        rows={5}
        className='w-full resize-none border-none text-base text-gray-900 placeholder-gray-400 outline-none'
      />

      {/* Media upload grid */}
      {fileList.length > 0 && (
        <div className='mt-3'>
          <Upload
            listType='picture-card'
            fileList={fileList}
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            onChange={({ fileList: newList }) => setFileList(newList)}
            accept='image/*,video/*'
            multiple
            maxCount={10}
          >
            {showUploadArea && (
              <button type='button'>
                <PlusOutlined />
                <div className='mt-1 text-xs'>Add more</div>
              </button>
            )}
          </Upload>
        </div>
      )}

      {/* Hidden image for preview */}
      <Image
        src={previewSrc}
        style={{ display: 'none' }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          src: previewSrc,
        }}
      />

      {/* Footer */}
      <div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-3'>
        <Upload
          beforeUpload={beforeUpload}
          onChange={({ fileList: newList }) => setFileList(newList)}
          fileList={fileList}
          accept='image/*,video/*'
          multiple
          maxCount={10}
          showUploadList={false}
        >
          <button
            type='button'
            className='flex items-center gap-2 rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          >
            <BsImageFill size={20} />
            <span className='text-sm font-semibold'>Photo</span>
          </button>
        </Upload>

        <Button
          type='primary'
          shape='round'
          disabled={!content.trim()}
          loading={isPending}
          onClick={handleSubmit}
        >
          Post
        </Button>
      </div>
    </Modal>
  );
}
