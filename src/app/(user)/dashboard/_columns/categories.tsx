'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CategoryChartData } from '@/types';

import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Form from '@/components/sections/form';

export const columns: ColumnDef<CategoryChartData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: () => <div className=''>Category</div>,
    cell: ({ row }) => {
      const colors = row.original.color.code;

      return (
        <div
          className='w-fit rounded-full px-3 py-1'
          style={{
            backgroundColor: colors.secondary
          }}
        >
          <p
            className='Capitalize'
            style={{
              color: colors.primary
            }}
          >
            {row.getValue('name')}
          </p>
        </div>
      );
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
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Form.Edit.Category />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
