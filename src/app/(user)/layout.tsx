import Form from '@/components/sections/form';
import Modal from '@/components/sections/modal';
import Navbar from '@/components/sections/navigation';
import Wallet from '@/components/sections/wallet';

import { Plus } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-screen flex w-full flex-row'>
      <Navbar.User.Vertical className='hidden min-w-[300px] md:flex'>
        <div className='flex flex-col gap-2'>
          <p className='text-muted-foreground'>Wallets</p>
          <div className='space-y-4 pl-4'>
            <Modal>
              <Modal.Trigger className='transition-color flex w-full flex-row gap-2 rounded-lg border p-2 duration-200 ease-in hover:bg-accent'>
                <Plus className='w-[24px]' />
                <p className=''>Add Wallet</p>
              </Modal.Trigger>
              <Modal.Content>hello</Modal.Content>
            </Modal>
            <Wallet.Group className='gap-4' />
          </div>
        </div>
      </Navbar.User.Vertical>
      <main className='w-full max-w-full overflow-x-hidden'>
        <Navbar.User.Horizontal />
        {children}
      </main>
    </div>
  );
};

export default Layout;
