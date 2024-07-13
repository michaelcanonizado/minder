'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import deleteExpenseTransactionSchema from '@/schemas/delete-expense-transaction';
import { ExpenseType } from '@/models/expense';

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
import { deleteExpenseTransactions } from '@/lib/expense/delete-expense-transactions';
import { useToast } from '@/components/ui/use-toast';

const Expenses = ({
  className,
  selectedExpenseIds = [],
  tableData
}: {
  className?: string;
  selectedExpenseIds?: string[];
  tableData: ExpenseType[];
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();
  const { toast } = useToast();

  const selectedExpenses = selectedExpenseIds.map(id => {
    const selectedRow = tableData.find(row => {
      if (row._id === id) {
        return row;
      }
    });

    if (selectedRow) {
      return selectedRow;
    }
  });

  const form = useForm<z.infer<typeof deleteExpenseTransactionSchema>>({
    resolver: zodResolver(deleteExpenseTransactionSchema),
    defaultValues: {
      expenses: selectedExpenseIds,
      userId: userId,
      formPath: currentPathname
    }
  });

  useEffect(() => {
    form.setValue('expenses', selectedExpenseIds);
  }, [selectedExpenseIds]);

  const onSubmit = async (
    data: z.infer<typeof deleteExpenseTransactionSchema>
  ) => {
    const response = await deleteExpenseTransactions(data);

    toast({
      title: response.message.title,
      description: response.message.description,
      variant: response.isSuccessful ? 'success' : 'destructive'
    });

    form.reset();
  };

  const selectedExpensesList = (
    <div className='space-y-2 pt-4'>
      <div className=''>
        <p className='text-body-100'>Selected Expenses:</p>
      </div>
      <div className='ml-4 space-y-2'>
        {selectedExpenses[0] &&
          selectedExpenses.map(item => {
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
          <DialogTitle>Delete Expenses</DialogTitle>
          <DialogDescription className=''>
            This will delete tracked expenses from your account!
          </DialogDescription>
        </DialogHeader>

        {selectedExpensesList}

        <div className='mt-8'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn('flex flex-col', className)}
            >
              <DialogFooter className='flex flex-row justify-end gap-2'>
                <DialogClose asChild>
                  <Button
                    className='w-full'
                    variant='destructive'
                    type='submit'
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Expenses;
