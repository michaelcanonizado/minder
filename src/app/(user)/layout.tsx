import Navbar from '@/components/sections/navigation';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-screen flex w-full flex-row'>
      <Navbar.User.Vertical className='hidden min-w-[300px] md:flex' />
      <main className='w-full max-w-full overflow-x-hidden'>
        <Navbar.User.Horizontal />
        {children}
      </main>
    </div>
  );
};

export default Layout;
