'use client';

import React, { useState } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import Vertical from './vertical';
import { Menu } from 'lucide-react';

const Horizontal = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className='flex w-full gap-4 p-8'>
      <div className='block md:hidden'>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant='outline' className='h-fit p-2'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[75%] p-0 pt-8'>
            {/* Use <Vertical/> directly instead of using <Navbar.User.Vertical/> to not get the "Uncaught ReferenceError: Cannot access '__WEBPACK_DEFAULT_EXPORT__' before initialization" error */}
            <Vertical setOpen={setSheetOpen} />
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
