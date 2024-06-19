import { getWalletsData } from '@/lib/get-wallets-data';
import { ChevronRight } from 'lucide-react';
import Balance from '@/components/sections/balance';

const WalletGroup = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const wallets = await getWalletsData(userId);

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-muted-foreground'>Wallets</p>
      <ul className='flex flex-col gap-4 pl-4'>
        {wallets.data.map(wallet => {
          return (
            <div className='flex flex-row gap-4'>
              <ChevronRight />
              <Balance.Slim>
                <Balance.Slim.Header>{wallet.name}</Balance.Slim.Header>
                <div className='flex flex-col items-end'>
                  <Balance.Slim.Amount>
                    $
                    {wallet.balance!.toLocaleString('en-US', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })}
                  </Balance.Slim.Amount>
                  <Balance.Slim.SubHeader className='text-foreground'>
                    Graph
                  </Balance.Slim.SubHeader>
                </div>
              </Balance.Slim>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default WalletGroup;
