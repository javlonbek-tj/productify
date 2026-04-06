import {
  BsHouseFill,
  BsPeopleFill,
  BsBriefcaseFill,
  BsChatDotsFill,
  BsBellFill,
} from 'react-icons/bs';
import type { IconType } from 'react-icons';

export interface NavItem {
  label: string;
  path: string;
  icon: IconType;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/', icon: BsHouseFill },
  {
    label: 'My Network',
    path: '/network',
    icon: BsPeopleFill,
  },
  {
    label: 'Jobs',
    path: '/jobs',
    icon: BsBriefcaseFill,
  },
  {
    label: 'Messaging',
    path: '/messaging',
    icon: BsChatDotsFill,
  },
  {
    label: 'Notifications',
    path: '/notifications',
    icon: BsBellFill,
  },
];
