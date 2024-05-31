import { cn } from '@/lib/utils';
import React from 'react';

const Wallets = ({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <section
      className={cn('flex flex-col gap-2 rounded-lg border p-8', className)}
    >
      <div className=''>
        <h3 className='fontbold text-2xl'>Wallets</h3>
      </div>
      <div className='flex flex-row justify-between'>{children}</div>
    </section>
  );
};

const Wallet = ({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

const Header = ({
  className,
  children,
  iconColor
}: {
  className?: string;
  children?: React.ReactNode;
  iconColor?: string;
}) => {
  return (
    <div
      className={cn('flex flex-row items-center gap-1 text-base', className)}
    >
      {iconColor ? (
        <span
          className='aspect-square h-[12px] rounded-full'
          style={{ backgroundColor: iconColor }}
        ></span>
      ) : (
        ''
      )}
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

  if (amount || amount == 0) {
    formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  return (
    <div className={cn('text-xl font-bold', className)}>
      <p>{formattedAmount}</p>
    </div>
  );
};

Wallet.Header = Header;
Wallet.Amount = Amount;

Wallets.Wallet = Wallet;

export default Wallets;
