import { cn } from '@/lib/utils';
import React from 'react';

const Label = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className='text-body-200 text-muted-foreground'>
      <p className={cn('', className)}>{children}</p>
    </div>
  );
};

export default Label;
