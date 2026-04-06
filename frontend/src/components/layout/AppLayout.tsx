import { Outlet } from 'react-router';
import Navbar from './Navbar';

export default function AppLayout() {
  return (
    <div className='min-h-screen bg-[#F3F2EE]'>
      <Navbar />
      <main className='pt-13'>
        <Outlet />
      </main>
    </div>
  );
}
