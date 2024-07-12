import React from 'react';

import { getExpenseTransactions } from '@/lib/expense/get-expense-transactions';
import Bento from '@/components/sections/bento';
import Table from '@/components/sections/table';
import { columns } from './columns';
import Pagination from '@/components/sections/pagination';

const expenseTransactions = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let page =
    typeof searchParams.page == 'string' ? Number(searchParams.page) : 1;
  page = page < 1 ? 1 : page;
  const limit = 10;

  const selectedExpenseRowsRaw = searchParams.selected
    ? (searchParams.selected as string)
    : '';
  const selectedExpenseRowsArray = selectedExpenseRowsRaw.split(',');

  const userId = process.env.TEMP_USER_ID!;

  const expenses = await getExpenseTransactions({ page, limit, userId });

  return (
    <div className=''>
      <div className=''>
        <Bento className='grid-cols-1'>
          <Bento.Box>
            <Bento.Box.Header className='text-display'>
              Expenses Transaction
            </Bento.Box.Header>
            <Bento.Box.Content className='space-y-4 p-0 pb-4'>
              <Table columns={columns} data={expenses.data} />
              <Pagination
                pathname='/expense/transactions'
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

export default expenseTransactions;
