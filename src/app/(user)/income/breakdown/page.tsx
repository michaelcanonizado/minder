import React from 'react';

import { getIncomesData } from '@/lib/get-incomes-data';
import Bento from '@/components/sections/bento';
import Table from '@/components/sections/table';

const IncomeBreakdown = async () => {
  const page: number = 1;
  const limit: number = 4;
  const data = await getIncomesData({ page, limit });

  console.log(data);
  console.log(`Data count: ${data.length}`);

  return (
    <div className='px-8'>
      <Bento className='grid-cols-1'>
        <Bento.Box>
          <Bento.Box.Header>Income Breakdown</Bento.Box.Header>
          <Bento.Box.Content>
            <Table.DataTable />
          </Bento.Box.Content>
        </Bento.Box>
      </Bento>
    </div>
  );
};

export default IncomeBreakdown;
