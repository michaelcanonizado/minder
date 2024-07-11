'use client';

import { cn } from '@/lib/utils';

type StackedType = {
  items: {
    amount: number;
    color: string;
    name: string;
  }[];
  className?: string;
};

const Stacked = ({ items, className }: StackedType) => {
  const totalAmount = items.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);

  const itemsToShow = items.filter(item => {
    if (item.amount !== 0) {
      return item;
    }
  });

  return (
    <div
      className={cn(
        'flex h-[8px] w-full flex-row rounded-full bg-muted',
        className
      )}
    >
      {itemsToShow.length !== 0
        ? itemsToShow.map((item, index) => {
            /* Manually add border radius to the start and end of
            the progress bar as putting overflow-hidden in
            the parent container will hide the tooltip*/
            let borderRadius = 'rounded-none';
            if (index === 0) {
              borderRadius = 'rounded-l-full';
            }
            if (index === itemsToShow.length - 1) {
              borderRadius = 'rounded-r-full';
            }
            if (itemsToShow.length === 1) {
              borderRadius = 'rounded-full';
            }

            return (
              <div
                className={cn('group relative cursor-pointer', borderRadius)}
                style={{
                  width: `${(item.amount / totalAmount) * 100}%`,
                  backgroundColor: item.color
                }}
                key={index}
              >
                <div
                  className='left-[50%] z-50 hidden translate-x-[-50%] translate-y-[-140%] rounded-full border px-4 py-1 group-hover:absolute group-hover:flex'
                  style={{
                    backgroundColor: item.color
                  }}
                >
                  <div
                    className='absolute left-[50%] z-10 size-[12px] translate-x-[-50%] translate-y-[150%] rotate-45'
                    style={{
                      backgroundColor: item.color
                    }}
                  ></div>
                  {item.name}
                </div>
              </div>
            );
          })
        : ''}
    </div>
  );
};

export default Stacked;
