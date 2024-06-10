import React from 'react';

import { getExpensesData } from '@/lib/get-expenses-data';
import Bento from '@/components/sections/bento';
import Table from '@/components/sections/table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import Link from 'next/link';

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page == 'string' ? Number(searchParams.page) : 1;
  const limit = 2;
  const data = await getExpensesData({ page, limit });

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
                <Button variant='outline' size='sm' disabled={page <= 1}>
                  <Link
                    href={`/expense/breakdown?page=${page > 1 ? page - 1 : 1}`}
                  >
                    Previous
                  </Link>
                </Button>
                <Button variant='outline' size='sm'>
                  <Link href={`/expense/breakdown?page=${page + 1}`}>Next</Link>
                </Button>
              </div>
            </Bento.Box.Content>
          </Bento.Box>
        </Bento>
      </div>
    </div>
  );
};

export default Page;
