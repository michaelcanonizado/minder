'use client';

import { ColumnDef } from '@tanstack/react-table';

import { IncomeType } from '@/models/income';

export const columns: ColumnDef<IncomeType>[] = [
  {
    accessorKey: 'transactionDate',
    header: 'Date'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'wallet',
    header: 'Wallet'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  }
];
