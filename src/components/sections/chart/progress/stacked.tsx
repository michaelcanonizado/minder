'use client';

import { cn } from '@/lib/utils';

type StackedType = {
  items: {
    amount: number;
    color: string;
  }[];
  className?: string;
};

const Stacked = ({ items, className }: StackedType) => {
  const totalAmount = items.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);

  return (
    <div
      className={cn(
        'flex h-[20px] w-full flex-row rounded-full bg-muted',
        className
      )}
    >
      {totalAmount !== 0
        ? items.map((item, index) => {
            return (
              <div
                className={cn('group relative cursor-pointer')}
                style={{
                  width: `${(item.amount / totalAmount) * 100}%`,
                  backgroundColor: item.color
                }}
                key={index}
              >
                <div
                  className='left-[50%] z-50 hidden translate-x-[-50%] translate-y-[-140%] rounded-full px-4 py-1 group-hover:absolute group-hover:flex'
                  style={{
                    backgroundColor: item.color
                  }}
                >
                  <div
                    className='absolute left-[50%] z-10 size-[12px] translate-x-[-50%] translate-y-[150%] rotate-45 '
                    style={{
                      backgroundColor: item.color
                    }}
                  ></div>
                  Food
                </div>
              </div>
            );
          })
        : ''}
    </div>
  );
};

export default Stacked;
