import ProfileCard from './ProfileCard';
import ProfileAnalytics from './ProfileAnalytics';
import MyItems from './MyItems';

export default function LeftSidebar() {
  return (
    <div className='flex flex-col gap-2'>
      <ProfileCard />
      <ProfileAnalytics />
      <MyItems />
    </div>
  );
}
