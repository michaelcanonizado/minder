import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';

const Compact = ({ variant }: { variant: 'total' | 'expense' | 'income' }) => {
  const title = 'Total Balance';
  const amount = '$25,808.15';
  const percentageChange: {
    isPositive: boolean;
    timePeriod: 'weekly' | 'montly';
    percentage: number;
    difference: number;
  } = {
    isPositive: true,
    timePeriod: 'weekly',
    percentage: 0.9,
    difference: 1539
  };

  const arrowIconClasses = 'w-[16px] h-fit';

  const BalancePercentageChange = () => {
    return (
      <p className='text-body-200 flex flex-row text-muted-foreground'>
        <span
          className={`flex flex-row ${percentageChange.isPositive ? 'text-accent-100' : 'text-accent-200'}`}
        >
          {percentageChange.isPositive ? '+' : '-'}
          {percentageChange.difference}(
          {percentageChange.isPositive ? (
            <ArrowUp className={arrowIconClasses} />
          ) : (
            <ArrowDown className={arrowIconClasses} />
          )}
          {percentageChange.percentage}%)
        </span>
        &nbsp;vs last month
      </p>
    );
  };

  return (
    <div className=''>
      <div className=''>
        <p className='text-body-100 text-muted-foreground'>{title}</p>
      </div>
      <div className=''>
        <h3 className='text-heading-100'>{amount}</h3>
      </div>
      <div className=''>
        <BalancePercentageChange />
      </div>
    </div>
  );
};

export default Compact;
