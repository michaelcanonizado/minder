import { getBalanceTransfersData } from '@/lib/get-balance-transfers-data';
import React from 'react';

const WalletBreakdown = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let page =
    typeof searchParams.page == 'string' ? Number(searchParams.page) : 1;
  page = page < 1 ? 1 : page;
  const limit = 1;

  const balanceTransfers = await getBalanceTransfersData({ page, limit });

  console.log(balanceTransfers);

  return <div className='px-8'>Wallet Breakdown</div>;
};

export default WalletBreakdown;
