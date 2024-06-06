import Navbar from '@/components/sections/navigation';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <Navbar.User.Vertical className='hidden min-w-[300px] md:flex' />
      <main className='w-full'>
        <Navbar.User.Horizontal />
        {children}
      </main>
    </div>
  );
};

export default Layout;
