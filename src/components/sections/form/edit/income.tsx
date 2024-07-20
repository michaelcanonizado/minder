'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IncomeType } from '@/models/income';
import { useUserContext } from '@/context/user';
import addIncomeTransactionSchema from '@/schemas/add-income-transaction';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  FormDatePicker,
  FormSelect,
  FormRadioCardGroup,
  FormInput
} from '../components';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

const Income = ({ defaultValues }: { defaultValues: IncomeType }) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user } = useUserContext();

  const form = useForm<z.infer<typeof addIncomeTransactionSchema>>({
    resolver: zodResolver(addIncomeTransactionSchema),
    defaultValues: {
      amount: defaultValues.amount,
      userId: userId,
      walletId: defaultValues.wallet._id,
      categoryId: defaultValues.category._id,
      date: defaultValues.transactionDate,
      description: defaultValues.description,
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof addIncomeTransactionSchema>) => {
    console.log(data);
  };

  const onOpenChange = (open: boolean) => {
    if (open === false) {
      form.reset();
    }
    setIsDialogOpen(open);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogTrigger className='text-body-100 w-full rounded px-2 py-1 transition-colors hover:bg-muted'>
        <MoreHorizontal />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Income</DialogTitle>
          <DialogDescription>Edit income details</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-4 flex flex-col gap-4'
          >
            <div className='flex flex-col gap-1'>
              <FormField
                control={form.control}
                name='walletId'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Add to:</FormLabel>
                    <FormControl className='mt-[-6px]'>
                      <FormRadioCardGroup
                        /* ts-ignore */
                        data={user.wallets}
                        orientation='horizontal'
                        field={field}
                        name='walletId'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <FormInput type='text' placeholder='125' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormDatePicker field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='categoryId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormSelect data={user.categories.income} field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <FormInput
                        type='text'
                        placeholder='Monthly salary'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Income;
