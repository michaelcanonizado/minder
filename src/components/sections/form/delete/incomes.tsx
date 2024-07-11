'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { usePathname } from 'next/navigation';
import deleteIncomeTransactionSchema from '@/schemas/delete-income-transaction';

import { Form } from '@/components/ui/form';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { IncomeType } from '@/models/income';

const Incomes = ({
  className,
  selectedIncomeIds = [],
  tableData
}: {
  className?: string;
  selectedIncomeIds?: string[];
  tableData: IncomeType[];
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();

  const selectedIncomes = selectedIncomeIds.map(id => {
    const selectedRow = tableData.find(row => {
      if (row._id === id) {
        return row;
      }
    });

    if (selectedRow) {
      return selectedRow;
    }
  });

  const form = useForm<z.infer<typeof deleteIncomeTransactionSchema>>({
    resolver: zodResolver(deleteIncomeTransactionSchema),
    defaultValues: {
      incomes: selectedIncomes,
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (
    data: z.infer<typeof deleteIncomeTransactionSchema>
  ) => {
    console.log(data);
  };

  const selectedIncomesList = (
    <div className='space-y-2 pt-4'>
      <div className=''>
        <p className='text-body-100'>Selected Income:</p>
      </div>
      <div className='ml-4 space-y-2'>
        {selectedIncomes[0] &&
          selectedIncomes.map(item => {
            if (!item) {
              return;
            }

            const transactionDate = format(
              item.transactionDate,
              'E, MMM d, yyyy'
            );
            const wallet = item.wallet.name;
            const category = item.category.name;

            return (
              <div
                className='text-body-200 flex flex-row space-x-1'
                key={item._id}
              >
                <p className=''>- ${item.amount}</p>
                <p className='text-muted-foreground'>
                  ( {transactionDate} | {wallet} | {category} )
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='transition-color flex h-full w-full items-center justify-center rounded-none border border-none bg-inherit p-4 duration-200 ease-in hover:bg-accent'>
          <Trash2 className='w-[16px] stroke-foreground' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Incomes</DialogTitle>
          <DialogDescription className=''>
            This will delete tracked incomes from your account!
          </DialogDescription>
        </DialogHeader>

        {selectedIncomesList}
      </DialogContent>
    </Dialog>
  );
};

export default Incomes;
