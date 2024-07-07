import Form from '@/components/sections/form';
import Navbar from '@/components/sections/navigation';
import Wallet from '@/components/sections/wallet';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-screen flex w-full flex-row'>
      <Navbar.User.Vertical className='hidden min-w-[300px] md:flex'>
        <div className='flex flex-col gap-2'>
          <p className='text-body-200 text-muted-foreground'>Wallets</p>
          <div className='space-y-4 pl-4'>
            <Form.Add.Wallet />
            <Wallet.Group className='gap-4' />
          </div>
        </div>
      </Navbar.User.Vertical>
      <main className='w-full max-w-full overflow-x-hidden'>
        <Navbar.User.Horizontal />
        <div className='px-8 pb-20'>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
