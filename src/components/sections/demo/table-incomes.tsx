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

import { Income } from '@/app/demo/data';

const TableIncomes = ({ data }: { data: Income[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Description</TableHead>
          <TableHead>Wallet</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className='text-right'>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(transaction => (
          <TableRow key={transaction.transactionId}>
            <TableCell className='font-medium'>
              {transaction.description}
            </TableCell>
            <TableCell>{transaction.wallet.name}</TableCell>
            <TableCell>{transaction.category.name}</TableCell>
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

export default TableIncomes;
