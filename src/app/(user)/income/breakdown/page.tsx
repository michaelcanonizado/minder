import React from 'react';

import { getIncomesData } from '@/lib/get-incomes-data';
import Bento from '@/components/sections/bento';
import Table from '@/components/sections/table';
import { columns } from './columns';

const IncomeBreakdown = async () => {
  const page: number = 1;
  const limit: number = 4;
  const data = await getIncomesData({ page, limit });

  console.log(data);
  console.log(`Data count: ${data.length}`);

  return (
    <div className='px-8'>
      <div className=''>
        <Bento className='grid-cols-1'>
          <Bento.Box>
            <Bento.Box.Header className='text-display'>
              Income Breakdown
            </Bento.Box.Header>
            <Bento.Box.Content className='p-0'>
              <Table.DataTable.Scroll columns={columns} data={data} />
            </Bento.Box.Content>
          </Bento.Box>
        </Bento>
      </div>
    </div>
  );
};

export default IncomeBreakdown;
