'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { IncomeType } from '@/models/income';
import { UserWalletType } from '@/models/user';

import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<IncomeType>[] = [
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
    accessorKey: 'transactionDate',
    header: () => <div className=''>Date</div>,
    cell: ({ row }) => {
      const transactionDate: Date = row.getValue('transactionDate');

      return (
        <div className=''>{format(transactionDate, 'E, MMM d, yyyy')}</div>
      );
    }
  },
  {
    accessorKey: 'amount',
    header: () => <div className=''>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);

      return <div className=''>{formatted}</div>;
    }
  },
  {
    accessorKey: 'category',
    header: () => <div className=''>Category</div>,
    cell: ({ row }) => {
      const category = row.original.category;

      const styles = {
        backgroundColor: category.color.code.secondary,
        color: category.color.code.primary
      };

      return (
        <div className='w-fit rounded-full px-3 py-1' style={styles}>
          <p className=''>{category.name}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'wallet',
    header: () => <div className=''>Wallet</div>,
    cell: ({ row }) => {
      const wallet: UserWalletType = row.getValue('wallet');

      return <div className=''>{wallet.name}</div>;
    }
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
