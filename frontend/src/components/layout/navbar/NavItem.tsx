import { Link, useLocation } from 'react-router';
import type { NavItem as NavItemType } from '@/constants/navigation';

export default function NavItem({ label, path, icon: Icon }: NavItemType) {
  const { pathname } = useLocation();
  const isActive = pathname === path;

  return (
    <Link
      to={path}
      className={`flex flex-col items-center justify-center gap-0.5 px-5 border-b-2 transition-colors no-underline text-gray-500 ${
        isActive
          ? 'border-black text-gray-800'
          : 'border-transparent hover:text-gray-800'
      }`}
    >
      <Icon size={20} />
      <span className='text-xs font-medium'>{label}</span>
    </Link>
  );
}
