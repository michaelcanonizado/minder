import { cn } from '@/lib/utils';
import React from 'react';

const Balance = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <section
      className={cn(
        'flex flex-col justify-end gap-2 rounded-lg border p-8',
        className
      )}
    >
      {children}
    </section>
  );
};

const Header = ({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn('text-xl', className)}>
      <h3>{children}</h3>
    </div>
  );
};

const Amount = ({
  className,
  amount
}: {
  className?: string;
  amount: number;
}) => {
  let formattedAmount;

  if (amount) {
    formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  return (
    <div className={cn('text-2xl font-bold tracking-wide', className)}>
      <p>{formattedAmount}</p>
    </div>
  );
};

Balance.Header = Header;
Balance.Amount = Amount;

export default Balance;
