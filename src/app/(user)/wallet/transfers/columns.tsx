'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { BalanceTransferType } from '@/models/balance-transfer';
import { UserWalletType } from '@/models/user';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<BalanceTransferType>[] = [
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
    accessorKey: 'sourceWallet',
    header: () => <div className=''>Source</div>,
    cell: ({ row }) => {
      const source: UserWalletType = row.getValue('sourceWallet');

      return <div className=''>{source.name}</div>;
    }
  },
  {
    accessorKey: 'destinationWallet',
    header: () => <div className=''>Destination</div>,
    cell: ({ row }) => {
      const destination: UserWalletType = row.getValue('destinationWallet');

      return <div className=''>{destination.name}</div>;
    }
  },
  {
    accessorKey: 'description',
    header: 'Description'
  }
];
