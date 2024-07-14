import React from 'react';

import Bento from '@/components/sections/bento';
import Table from '@/components/sections/table';
import { columns } from './columns';
import Pagination from '@/components/sections/pagination';

import { getWalletTransfers } from '@/lib/wallet/get-wallet-transfers';
import Form from '@/components/sections/form';

const WalletBreakdown = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let page =
    typeof searchParams.page == 'string' ? Number(searchParams.page) : 1;
  page = page < 1 ? 1 : page;
  const limit = 10;

  const selectedTransferRowsRaw = searchParams.selected
    ? (searchParams.selected as string)
    : '';
  const selectedTransferRowsArray = selectedTransferRowsRaw.split(',');

  const userId = process.env.TEMP_USER_ID!;

  const balanceTransfers = await getWalletTransfers({
    page,
    limit,
    userId
  });

  console.log(balanceTransfers);

  return (
    <div className=''>
      <div className=''>
        <Bento className='grid-cols-1'>
          <Bento.Box>
            <Bento.Box.Header className='text-display'>
              Balance Transfers
            </Bento.Box.Header>
            <Bento.Box.Content className='space-y-4 p-0 pb-4'>
              <Table
                columns={columns}
                data={balanceTransfers.data}
                rowActions={[
                  <Form.Delete.Transfer
                    tableData={balanceTransfers.data}
                    selectedTransferIds={selectedTransferRowsArray}
                  />
                ]}
              />
              <Pagination
                pathname='/wallet/breakdown'
                currentPage={page}
                pagesCount={balanceTransfers.pages.max}
              />
            </Bento.Box.Content>
          </Bento.Box>
        </Bento>
      </div>
    </div>
  );
};

export default WalletBreakdown;
