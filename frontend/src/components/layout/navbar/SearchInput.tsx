import { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchInput() {
  const [focused, setFocused] = useState(false);

  return (
    <Input
      prefix={<SearchOutlined className='text-gray-500' />}
      placeholder='Search'
      variant='filled'
      className={`rounded-full bg-[#EEF3F8] transition-all duration-300 ${
        focused ? 'w-90' : 'w-60'
      }`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
