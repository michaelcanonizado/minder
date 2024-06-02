import Navbar from '@/components/sections/navigation/user-navbar';
import Sidebar from '@/components/sections/navigation/user-sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <Sidebar className='hidden min-w-[300px] sm:flex' />
      <main className='w-full'>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
