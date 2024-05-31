import Balance from '@/components/sections/demo/balance';
import Wallets from '@/components/sections/demo/wallets';
import { screenBreakpoints } from '@/helpers/screen-breakpoints';
import { cn } from '@/lib/utils';

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
    </div>
  );
}
