import { Link } from 'react-router';
import LinkedInMark from '@/components/ui/brand/LinkedInMark';
import { NAV_ITEMS } from '@/constants/navigation';
import NavItem from './navbar/NavItem';
import UserMenu from './navbar/UserMenu';
import SearchInput from './navbar/SearchInput';

export default function Navbar() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 h-13 border-b border-gray-200 bg-white'>
      <div className='mx-auto flex h-full max-w-282 items-stretch gap-2 px-4'>
        {/* Left: Logo + Search */}
        <div className='flex w-100 shrink-0 items-center gap-2'>
          <Link to='/' className='flex items-center'>
            <LinkedInMark />
          </Link>
          <SearchInput />
        </div>

        {/* Center: Nav items */}
        <nav className='flex flex-1 items-stretch justify-center'>
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        {/* Right: Me dropdown */}
        <div className='flex items-stretch'>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
