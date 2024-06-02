import Sidebar from '@/components/sections/navigation/sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <main className=''>{children}</main>
    </div>
  );
};

export default Layout;
