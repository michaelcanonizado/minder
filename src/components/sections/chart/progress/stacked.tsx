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

  console.log('Rerendering stacked progress bar!!!: ', items);

  return (
    <div
      className={cn(
        'flex h-[8px] w-full flex-row overflow-hidden rounded-full bg-muted',
        className
      )}
    >
      {totalAmount !== 0
        ? items.map((item, index) => {
            return (
              <div
                className={cn('')}
                style={{
                  width: `${(item.amount / totalAmount) * 100}%`,
                  backgroundColor: item.color
                }}
                key={index}
              ></div>
            );
          })
        : ''}
    </div>
  );
};

export default Stacked;
