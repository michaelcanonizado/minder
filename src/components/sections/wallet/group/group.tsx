import { getWalletsData } from '@/lib/get-wallets-data';
import { ChevronRight } from 'lucide-react';
import Balance from '@/components/sections/balance';
import { cn } from '@/lib/utils';

const Group = async ({ className }: { className?: string }) => {
  const userId = process.env.TEMP_USER_ID!;

  const wallets = await getWalletsData(userId);

  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {wallets.data.map(wallet => {
        return (
          <div
            className='relative flex w-full flex-row gap-2 rounded-lg py-2 pl-2'
            key={wallet._id}
          >
            <ChevronRight className='min-w-[24px] ' />
            <Balance.Slim className=''>
              <Balance.Slim.Header>{wallet.name}</Balance.Slim.Header>
              <div className='flex flex-col items-start'>
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
  );
};

export default Group;
