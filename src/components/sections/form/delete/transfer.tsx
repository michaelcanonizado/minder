'use client';

import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { BalanceTransferType } from '@/models/balance-transfer';
import deleteBalanceTransfersSchema from '@/schemas/delete-balance-transfers';

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

const Transfer = ({
  className,
  selectedTransferIds = [],
  tableData,
  queryToRemove = 'selected'
}: {
  className?: string;
  selectedTransferIds?: string[];
  tableData: BalanceTransferType[];
  queryToRemove?: string;
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const selectedTransfers = selectedTransferIds.map(id => {
    const selectedRow = tableData.find(row => {
      if (row._id === id) {
        return row;
      }
    });

    if (selectedRow) {
      return selectedRow;
    }
  });

  const form = useForm<z.infer<typeof deleteBalanceTransfersSchema>>({
    resolver: zodResolver(deleteBalanceTransfersSchema),
    defaultValues: {
      balanceTransfers: selectedTransferIds,
      userId: userId,
      formPath: currentPathname
    }
  });

  useEffect(() => {
    form.setValue('balanceTransfers', selectedTransferIds);
  }, [selectedTransferIds]);

  const onSubmit = async (
    data: z.infer<typeof deleteBalanceTransfersSchema>
  ) => {
    console.log(data);
  };

  const selectedTransfersList = (
    <div className='space-y-2 pt-4'>
      <div className=''>
        <p className='text-body-100'>Selected Transfers:</p>
      </div>
      <div className='ml-4 space-y-2'>
        {selectedTransfers[0] &&
          selectedTransfers.map(item => {
            if (!item) {
              return;
            }

            const transactionDate = format(
              item.transactionDate,
              'E, MMM d, yyyy'
            );
            const sourceWallet = item.sourceWallet.name;
            const destinationWallet = item.destinationWallet.name;

            return (
              <div
                className='text-body-200 flex flex-row space-x-1'
                key={item._id}
              >
                <p className=''>- ${item.amount}</p>
                <p className='text-muted-foreground'>
                  ( {transactionDate} | {sourceWallet}
                  {' -> '}
                  {destinationWallet} )
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
          <DialogTitle>Delete Transfers</DialogTitle>
          <DialogDescription className=''>
            This will delete tracked balance transfers from your account!
          </DialogDescription>
        </DialogHeader>

        {selectedTransfersList}

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

export default Transfer;
