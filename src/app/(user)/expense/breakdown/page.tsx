import React from 'react';

import { getExpensesData } from '@/lib/get-expenses-data';
import Bento from '@/components/sections/bento';
import Table from '@/components/sections/table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';

const ExpenseBreakdown = async () => {
  const page: number = 1;
  const limit: number = 10;
  const data = await getExpensesData({ page, limit });

  console.log(data);
  console.log(`Data count: ${data.length}`);

  return (
    <div className='px-8'>
      <div className=''>
        <Bento className='grid-cols-1'>
          <Bento.Box>
            <Bento.Box.Header className='text-display'>
              Expenses Breakdown
            </Bento.Box.Header>
            <Bento.Box.Content className='p-0'>
              <Table.DataTable.Scroll columns={columns} data={data} />
              <div className='mr-4 flex items-center justify-end space-x-2 py-4'>
                <Button
                  variant='outline'
                  size='sm'
                  // onClick={() => table.previousPage()}
                  // disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  // onClick={() => table.nextPage()}
                  // disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </Bento.Box.Content>
          </Bento.Box>
        </Bento>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
