import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header className='sticky top-0 w-full'>
      <nav className='flex justify-between border border-b-gray-900 px-10 py-6'>
        <div>
          <Link href='/'>
            <h1 className='text-2xl font-bold tracking-wide'>Minder</h1>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
