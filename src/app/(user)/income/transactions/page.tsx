import React from 'react';

import { getIncomeTransactions } from '@/lib/income/get-income-transactions';
import Bento from '@/components/sections/bento';
import Table from '@/components/sections/table';
import { columns } from './columns';
import Pagination from '@/components/sections/pagination';

const IncomeTransactions = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let page =
    typeof searchParams.page == 'string' ? Number(searchParams.page) : 1;
  page = page < 1 ? 1 : page;
  const limit = 10;

  const userId = process.env.TEMP_USER_ID!;

  const incomes = await getIncomeTransactions({ page, limit, userId });

  console.log(incomes);
  console.log(`Data count: ${incomes.data.length}`);

  return (
    <div className='px-8'>
      <div className=''>
        <Bento className='grid-cols-1'>
          <Bento.Box>
            <Bento.Box.Header className='text-display'>
              Income Transactions
            </Bento.Box.Header>
            <Bento.Box.Content className='space-y-4 p-0 pb-4'>
              <Table.DataTable.Scroll columns={columns} data={incomes.data} />
              <Pagination
                pathname='/income/transactions'
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

export default IncomeTransactions;
