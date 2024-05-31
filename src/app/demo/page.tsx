import { cn } from '@/lib/utils';
import { screenBreakpoints } from '@/helpers/screen-breakpoints';

import Balance from '@/components/sections/demo/balance';
import Wallets from '@/components/sections/demo/wallets';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DataTable from '@/components/sections/demo/data-table';

import {
  UsersCollection,
  ExpensesCollection,
  IncomesCollection,
  WalletTransfersCollection,
  User,
  Expense,
  Income,
  WalletTransfer
} from './data';
import { getUser } from './helpers/get-user';
import { getTransactions } from './helpers/get-transactions';

export const tabLinks = [
  {
    title: 'Expense',
    value: 'expense',
    component: <DataTable />
  },
  {
    title: 'Income',
    value: 'income',
    component: <DataTable />
  },
  {
    title: 'Transfer',
    value: 'transfer',
    component: <DataTable />
  }
];

export default function Demo() {
  const targetUserId = '123456789';

  const user = getUser(UsersCollection, targetUserId);

  const userExpenses = getTransactions(
    ExpensesCollection,
    targetUserId
  ) as Expense[];
  const userIncomes = getTransactions(
    IncomesCollection,
    targetUserId
  ) as Income[];
  const userWalletTransfers = getTransactions(
    WalletTransfersCollection,
    targetUserId
  ) as WalletTransfer[];

  console.log(userIncomes);

  if (!user) {
    return <h1 className='mt-20 text-center text-4xl'>User not found</h1>;
  }

  return (
    <div
      className={cn(
        'mx-auto mt-20 grid w-full grid-cols-12 gap-4 px-10',
        screenBreakpoints
      )}
    >
      <Balance className='col-span-4'>
        <Balance.Header>Balance</Balance.Header>
        <Balance.Amount amount={user.balance} />
      </Balance>

      <Wallets className='col-span-8'>
        {user.wallets.map(wallet => {
          return (
            <Wallets.Wallet key={wallet.id}>
              <Wallets.Wallet.Header iconColor={wallet.color}>
                {wallet.name}
              </Wallets.Wallet.Header>
              <Wallets.Wallet.Amount amount={wallet.balance} />
            </Wallets.Wallet>
          );
        })}
      </Wallets>

      <Tabs
        defaultValue={tabLinks[0].value}
        className='col-span-full min-w-[400px] rounded-xl border'
      >
        <TabsList className='grid w-full grid-cols-3 rounded-b-none'>
          {tabLinks.map(tab => {
            return (
              <TabsTrigger className='rounded-md' value={tab.value}>
                {tab.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {tabLinks.map(tab => {
          return (
            <TabsContent className='mt-0' value={tab.value}>
              {tab.component}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
