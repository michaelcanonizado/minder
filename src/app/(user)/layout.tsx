import Form from '@/components/sections/form';
import Navbar from '@/components/sections/navigation';
import Wallet from '@/components/sections/wallet';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-screen flex w-full flex-row'>
      <Navbar.User.Vertical className='hidden min-w-[300px] md:flex'>
        <div className='flex flex-col gap-2'>
          <p className='text-muted-foreground'>Wallets</p>
          <Form.Add.Wallet className='ml-4' />
          <Wallet.Group />
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
