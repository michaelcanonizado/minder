import { cn } from '@/lib/utils';
import { screenBreakpoints } from '@/helpers/screen-breakpoints';

import Balance from '@/components/sections/demo/balance';
import Wallets from '@/components/sections/demo/wallets';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import FormExpense from '@/components/sections/demo/form-expense';
import FormIncome from '@/components/sections/demo/form-income';
import FormTransfer from '@/components/sections/demo/form-transfer';

export const tabLinks = [
  {
    title: 'Expense',
    value: 'expense',
    component: <FormExpense />
  },
  {
    title: 'Income',
    value: 'income',
    component: <FormIncome />
  },
  {
    title: 'Transfer',
    value: 'transfer',
    component: <FormTransfer />
  }
];

export default function Demo() {
  return (
    <div
      className={cn(
        'mx-auto mt-20 grid w-full grid-cols-12 gap-4 px-10',
        screenBreakpoints
      )}
    >
      <Balance className='col-span-4'>
        <Balance.Header>Balance</Balance.Header>
        <Balance.Amount amount={1234} />
      </Balance>

      <Wallets className='col-span-8'>
        <Wallets.Wallet>
          <Wallets.Wallet.Header iconColor='#7C3AED'>
            Cash
          </Wallets.Wallet.Header>
          <Wallets.Wallet.Amount amount={1234} />
        </Wallets.Wallet>
        <Wallets.Wallet>
          <Wallets.Wallet.Header iconColor='#7C3AED'>
            GCash
          </Wallets.Wallet.Header>
          <Wallets.Wallet.Amount amount={1234} />
        </Wallets.Wallet>
        <Wallets.Wallet>
          <Wallets.Wallet.Header iconColor='#7C3AED'>
            Paypal
          </Wallets.Wallet.Header>
          <Wallets.Wallet.Amount amount={1234} />
        </Wallets.Wallet>
        <Wallets.Wallet>
          <Wallets.Wallet.Header iconColor='#7C3AED'>
            Savings
          </Wallets.Wallet.Header>
          <Wallets.Wallet.Amount amount={1234} />
        </Wallets.Wallet>
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
