import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';

const Compact = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return <div className=''>{children}</div>;
};

const Header = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className='text-body-100 text-muted-foreground'>
      <p className={cn('', className)}>{children}</p>
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
    <div className='text-heading-100'>
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
    <div className='text-body-200 mt-1  text-muted-foreground'>
      <p className={cn('flex flex-row', className)}>{children}</p>
    </div>
  );
};

Compact.Header = Header;
Compact.Amount = Amount;
Compact.SubHeader = SubHeader;

export default Compact;
