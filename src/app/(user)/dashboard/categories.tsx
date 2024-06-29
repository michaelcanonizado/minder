import { cn } from '@/lib/utils';

import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';

const Categories = ({ className }: { className?: string }) => {
  return (
    <Bento.Box className={cn('', className)}>
      <Bento.Box.Header>
        <p className='text-heading-100'>Categories</p>
      </Bento.Box.Header>
      <Bento.Box.Content className='flex flex-col gap-2'>
        <Chart.Progress.Stacked />
      </Bento.Box.Content>
    </Bento.Box>
  );
};

export default Categories;
