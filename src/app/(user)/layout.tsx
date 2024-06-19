import Navbar from '@/components/sections/navigation';
import WalletGroup from '@/components/sections/navigation/user/wallet-group';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-screen flex w-full flex-row'>
      <Navbar.User.Vertical className='hidden min-w-[300px] md:flex'>
        {/* <WalletGroup /> */}
      </Navbar.User.Vertical>
      <main className='w-full max-w-full overflow-x-hidden'>
        <Navbar.User.Horizontal />
        {children}
      </main>
    </div>
  );
};

export default Layout;
