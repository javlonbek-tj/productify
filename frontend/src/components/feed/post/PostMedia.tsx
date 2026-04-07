import { Image } from 'antd';

interface Props {
  media: string[];
}

export default function PostMedia({ media }: Props) {
  if (!media.length) return null;

  const [first, second, third, fourth, ...rest] = media;
  const extraCount = rest.length;

  if (media.length === 1) {
    return (
      <div className='mt-3'>
        <Image src={first} alt='post media' className='max-h-[512px] w-full rounded object-cover' />
      </div>
    );
  }

  if (media.length === 2) {
    return (
      <div className='mt-3 grid grid-cols-2 gap-0.5'>
        <Image src={first} alt='media 1' className='h-64 w-full rounded-l object-cover' />
        <Image src={second} alt='media 2' className='h-64 w-full rounded-r object-cover' />
      </div>
    );
  }

  if (media.length === 3) {
    return (
      <div className='mt-3 grid grid-cols-2 gap-0.5'>
        <Image src={first} alt='media 1' className='row-span-2 h-full w-full rounded-l object-cover' />
        <Image src={second} alt='media 2' className='h-32 w-full rounded-tr object-cover' />
        <Image src={third} alt='media 3' className='h-32 w-full rounded-br object-cover' />
      </div>
    );
  }

  // 4+ images
  return (
    <div className='mt-3 grid grid-cols-2 gap-0.5'>
      <Image src={first} alt='media 1' className='h-48 w-full rounded-tl object-cover' />
      <Image src={second} alt='media 2' className='h-48 w-full rounded-tr object-cover' />
      <Image src={third} alt='media 3' className='h-48 w-full rounded-bl object-cover' />
      <div className='relative'>
        <Image src={fourth} alt='media 4' className='h-48 w-full rounded-br object-cover' />
        {extraCount > 0 && (
          <div className='absolute inset-0 flex items-center justify-center rounded-br bg-black/50'>
            <span className='text-2xl font-bold text-white'>+{extraCount + 1}</span>
          </div>
        )}
      </div>
    </div>
  );
}
