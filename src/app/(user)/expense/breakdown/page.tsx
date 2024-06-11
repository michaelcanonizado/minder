import React from 'react';

import { getExpensesData } from '@/lib/get-expenses-data';
import Bento from '@/components/sections/bento';
import Table from '@/components/sections/table';
import { columns } from './columns';
import Pagination from '@/components/sections/pagination';

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let page =
    typeof searchParams.page == 'string' ? Number(searchParams.page) : 1;
  page = page < 1 ? 1 : page;
  const limit = 10;
  const expenses = await getExpensesData({ page, limit });

  return (
    <div className='px-8'>
      <div className=''>
        <Bento className='grid-cols-1'>
          <Bento.Box>
            <Bento.Box.Header className='text-display'>
              Expenses Breakdown
            </Bento.Box.Header>
            <Bento.Box.Content className='space-y-4 p-0 pb-4'>
              <Table.DataTable.Scroll columns={columns} data={expenses.data} />
              <Pagination
                pathname='/expense/breakdown'
                currentPage={page}
                pagesCount={expenses.pages.max}
              />
            </Bento.Box.Content>
          </Bento.Box>
        </Bento>
      </div>
    </div>
  );
};

export default Page;
