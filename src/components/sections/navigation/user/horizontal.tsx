import React from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import Navbar from '..';
import { Menu } from 'lucide-react';

const Horizontal = () => {
  return (
    <header className='flex w-full gap-4 p-8'>
      <div className='block sm:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' className='h-fit p-2'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[75%] p-0 pt-8'>
            <Navbar.User.Vertical />
          </SheetContent>
        </Sheet>
      </div>
      <div className='flex items-end'>
        <h2 className='text-heading-100'>Morning, Mikey</h2>
      </div>
    </header>
  );
};

export default Horizontal;
