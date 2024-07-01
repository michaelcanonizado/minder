'use client';

import { useDashboardContext } from '@/context/dashboard-context';

import { cn } from '@/lib/utils';

import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';

const Categories = ({ className }: { className?: string }) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  //
  console.log('Categories: ', dashboard);

  const categories = [
    {
      amount: 13,
      color: '#32a852'
    },
    {
      amount: 5,
      color: '#1e4096'
    },
    {
      amount: 9,
      color: '#700c11'
    }
  ];

  return (
    <Bento.Box className={cn('', className)}>
      <Bento.Box.Header>
        <p className='text-heading-100'>Categories</p>
      </Bento.Box.Header>
      <Bento.Box.Content className='flex flex-col gap-2'>
        <Chart.Progress.Stacked items={categories} />
      </Bento.Box.Content>
    </Bento.Box>
  );
};

export default Categories;
