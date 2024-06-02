import Sidebar from '@/components/sections/navigation/user-sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='p-8'>{children}</main>
    </div>
  );
};

export default Layout;
