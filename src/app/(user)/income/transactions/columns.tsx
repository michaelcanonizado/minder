'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { IncomeType } from '@/models/income';
import { UserCategoryType, UserWalletType } from '@/models/user';

import { Checkbox } from '@/components/ui/checkbox';

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
      const category: UserCategoryType = row.getValue('category');

      return <div className=''>{category.name}</div>;
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
  }
];
