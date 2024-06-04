'use client';

import React from 'react';

import { Progress as ProgressBar } from '@/components/ui/progress';
import { Utensils } from 'lucide-react';

const Progress = () => {
  //   const data = {
  //     id: '1',
  //     name: 'Food',
  //     createdAt: new Date(),
  //     icon: '',
  //     color: '#7C3AED',
  //     isDeleted: {
  //       status: false,
  //       deletedAt: new Date()
  //     },
  //     budget: {
  //       allocated: 1234,
  //       totalUsed: Math.ceil(Math.random() * (2000 - 50) + 50),
  //       remaining: 0,
  //       percentageUsed: 0
  //     }
  //   };

  //   data.budget.remaining = data.budget.allocated - data.budget.totalUsed;

  //   data.budget.percentageUsed = Math.ceil(
  //     (data.budget.totalUsed / data.budget.allocated) * 100
  //   );

  //   if (data.budget.percentageUsed > 100) {
  //     data.budget.percentageUsed = 100;
  //   }
  //   console.log(data.budget);

  // Props
  const header = 'Food';
  // Might change category icons to be emojis
  const icon = <Utensils />;
  const value = 75;
  const pillText = 1234;
  const color = '#7C3AED';

  return (
    <div className='w-full space-y-2'>
      <div className='flex flex-row justify-between'>
        <div className='flex'>
          <p className=''>{header}</p>
        </div>
        <div
          className={`${value >= 100 ? 'bg-accent-200' : 'bg-accent-100'} w-fit rounded-full pl-[14px] pr-[16px] pt-[2px]`}
        >
          <p className='text-body-100'>${pillText}</p>
        </div>
      </div>
      <div className='w-full'>
        <ProgressBar
          value={value}
          className='h-[8px] w-full bg-muted'
          fillColor={color}
        />
      </div>
    </div>
  );
};

export default Progress;
