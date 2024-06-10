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
      <Bento className='min-w-max grid-cols-1'>
        <Bento.Box>
          <Bento.Box.Header>Income Breakdown</Bento.Box.Header>
          <Bento.Box.Content>
            <Table.DataTable columns={columns} data={data} />
          </Bento.Box.Content>
        </Bento.Box>
      </Bento>
    </div>
  );
};

export default IncomeBreakdown;
