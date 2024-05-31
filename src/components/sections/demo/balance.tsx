import { cn } from '@/lib/utils';
import React from 'react';

const Balance = ({
  className,
  balance
}: {
  className?: string;
  balance?: number;
}) => {
  let formattedBalance;

  if (balance) {
    formattedBalance = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(balance);
  }

  return (
    <section
      className={cn(
        'flex flex-col justify-end gap-2 rounded-lg border p-8',
        className
      )}
    >
      <div className=''>
        <h3 className='text-xl'>Balance</h3>
      </div>
      <div className=''>
        <p className='text-2xl font-bold tracking-wide'>{formattedBalance}</p>
      </div>
    </section>
  );
};

export default Balance;
