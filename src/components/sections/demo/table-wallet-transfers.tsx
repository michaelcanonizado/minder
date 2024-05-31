import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { WalletTransfer } from '@/app/demo/data';

const TableWalletTransfers = ({ data }: { data: WalletTransfer[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Date</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead className='text-right'>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(transaction => (
          <TableRow key={transaction.transferId}>
            <TableCell className='font-medium'>
              {transaction.transferDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </TableCell>
            <TableCell>{transaction.fromWallet.name}</TableCell>
            <TableCell>{transaction.toWallet.name}</TableCell>
            <TableCell className='text-right'>{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>$0,000.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableWalletTransfers;
