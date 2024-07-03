'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CategoryChartData } from '@/types';

export const columns: ColumnDef<CategoryChartData>[] = [
  {
    accessorKey: 'name',
    header: () => <div className=''>Category</div>,
    cell: ({ row }) => {
      return <div className='Capitalize'>{row.getValue('name')}</div>;
    }
  },
  {
    accessorKey: 'percentage',
    header: () => <div className='text-right'>% Of Total</div>,
    cell: ({ row }) => {
      const percentage = parseFloat(row.getValue('percentage')).toFixed(2);
      return <div className='text-right'>{percentage}</div>;
    }
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);

      return <div className='text-right'>{formatted}</div>;
    }
  }
];
