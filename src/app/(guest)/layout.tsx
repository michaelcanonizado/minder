import React from 'react';
import Navbar from '@/components/sections/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar.Guest.Horizontal />
      <main>{children}</main>
    </>
  );
};

export default Layout;
