import { cn } from '@/lib/utils';
import { screenBreakpoints } from '@/helpers/screen-breakpoints';

import Balance from '@/components/sections/demo/balance';
import Wallets from '@/components/sections/demo/wallets';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TableExpenses from '@/components/sections/demo/table-expenses';
import TableIncomes from '@/components/sections/demo/table-incomes';
import TableWalletTransfers from '@/components/sections/demo/table-wallet-transfers';
import FormExpense from '@/components/sections/demo/form-expense';
import FormIncome from '@/components/sections/demo/form-income';
import FormTransfer from '@/components/sections/demo/form-transfer';

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

  const tabLinks = [
    {
      title: 'Expense',
      value: 'expense',
      component: {
        table: <TableExpenses data={userExpenses} />,
        form: <FormExpense />
      }
    },
    {
      title: 'Income',
      value: 'income',
      component: {
        table: <TableIncomes data={userIncomes} />,
        form: <FormIncome />
      }
    },
    {
      title: 'Transfer',
      value: 'transfer',
      component: {
        table: <TableWalletTransfers data={userWalletTransfers} />,
        form: <FormTransfer />
      }
    }
  ];

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
      <div className='col-span-12 mb-10 flex justify-center'>
        <h1 className='text-base'>Section to test the core functionalities</h1>
      </div>
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
              {tab.component.form}
            </TabsContent>
          );
        })}
      </Tabs>

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
              {tab.component.table}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
