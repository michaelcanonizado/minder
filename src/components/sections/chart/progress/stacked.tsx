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
        'flex w-full flex-row overflow-hidden rounded-full',
        className
      )}
    >
      {items.map(item => {
        return (
          <div
            className={cn('h-[8px]')}
            style={{
              width: `${(item.amount / totalAmount) * 100}%`,
              backgroundColor: item.color
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Stacked;
