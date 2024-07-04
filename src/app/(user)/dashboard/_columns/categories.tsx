'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CategoryChartData } from '@/types';

import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

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
    header: ({ column }) => {
      return (
        <div className='flex flex-row justify-end'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className=''
          >
            <div className='text-right'>Amount</div>
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
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
