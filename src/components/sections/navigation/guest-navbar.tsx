import { screenBreakpoints } from '@/helpers/screen-breakpoints';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header className='sticky top-0 w-full border border-muted'>
      <nav
        className={cn(
          'mx-auto flex w-full justify-between  px-8 py-6',
          screenBreakpoints
        )}
      >
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
