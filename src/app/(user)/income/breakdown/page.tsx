import React from 'react';

import { getIncomesData } from '@/lib/get-incomes-data';
import Bento from '@/components/sections/bento';
import Table from '@/components/sections/table';
import { columns } from './columns';
import Pagination from '@/components/sections/pagination';

const IncomeBreakdown = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let page =
    typeof searchParams.page == 'string' ? Number(searchParams.page) : 1;
  page = page < 1 ? 1 : page;
  const limit = 10;

  const incomes = await getIncomesData({ page, limit });

  console.log(incomes);
  console.log(`Data count: ${incomes.data.length}`);

  return (
    <div className='px-8'>
      <div className=''>
        <Bento className='grid-cols-1'>
          <Bento.Box>
            <Bento.Box.Header className='text-display'>
              Income Breakdown
            </Bento.Box.Header>
            <Bento.Box.Content className='space-y-4 p-0 pb-4'>
              <Table.DataTable.Scroll columns={columns} data={incomes.data} />
              <Pagination
                pathname='/income/breakdown'
                currentPage={page}
                pagesCount={incomes.pages.max}
              />
            </Bento.Box.Content>
          </Bento.Box>
        </Bento>
      </div>
    </div>
  );
};

export default IncomeBreakdown;
