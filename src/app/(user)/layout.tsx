import UserContextProvider, { User } from '@/context/user';

import Form from '@/components/sections/form';
import Navbar from '@/components/sections/navigation';
import Wallet from '@/components/sections/wallet';
import { getWalletsData } from '@/lib/wallet/get-wallets-data';
import { getCategoriesData } from '@/lib/category/get-categories-data';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const wallets = await getWalletsData(userId);
  const categories = await getCategoriesData(userId);

  const user: User = {
    wallets: wallets.data,
    categories: {
      income: categories.data.income,
      expense: categories.data.expense
    }
  };

  return (
    <UserContextProvider userData={user}>
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
    </UserContextProvider>
  );
};

export default Layout;
