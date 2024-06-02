import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className=''>{children}</main>
    </div>
  );
};

export default Layout;
