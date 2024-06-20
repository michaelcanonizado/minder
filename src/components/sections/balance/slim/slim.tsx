import { cn } from '@/lib/utils';
import React from 'react';

const Slim = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex w-full max-w-full flex-col justify-between overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

const Header = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className='text-body-200 text-muted-foreground'>
      <p
        className={cn(
          'line-clamp-1 overflow-hidden truncate  text-ellipsis',
          className
        )}
      >
        {children}
      </p>
    </div>
  );
};

const Amount = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className='text-body-100 text-foreground'>
      <h3 className={cn('', className)}>{children}</h3>
    </div>
  );
};

const SubHeader = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className='text-body-200 flex flex-row text-muted-foreground'>
      <p className={cn('', className)}>{children}</p>
    </div>
  );
};

Slim.Header = Header;
Slim.Amount = Amount;
Slim.SubHeader = SubHeader;

export default Slim;
