'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import {
  FormDatePicker,
  FormSelect,
  FormRadioCardGroup,
  FormInput
} from '../components';

import trackExpenseSchema from '@/schemas/track-expense';
import { UserCategoryType, UserWalletType } from '@/models/user';
import { usePathname } from 'next/navigation';
import { addExpenseTransaction } from '@/lib/expense/add-expense-transaction';

const Expense = ({
  wallets,
  categories,
  userId
}: {
  wallets: UserWalletType[];
  categories: UserCategoryType[];
  userId: string;
}) => {
  const currentPathname = usePathname();

  const form = useForm<z.infer<typeof trackExpenseSchema>>({
    resolver: zodResolver(trackExpenseSchema),
    defaultValues: {
      amount: '' as unknown as number,
      userId: userId,
      walletId: wallets[0]._id,
      categoryId: '',
      date: undefined,
      description: '',
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof trackExpenseSchema>) => {
    const response = await addExpenseTransaction(data);

    if (!response.isSuccessful) {
      console.log('Error adding income!');
      console.log(response);
      return;
    }

    form.reset();
  };

  return (
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
                <FormLabel>Deduct from:</FormLabel>
                <FormControl className='mt-[-6px]'>
                  <FormRadioCardGroup
                    /* @ts-ignore */
                    data={wallets}
                    orientation='horizontal'
                    field={field}
                    name='wallets'
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
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  {/* @ts-ignore */}
                  <FormSelect data={categories} field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    placeholder='Total expense on food'
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
  );
};

export default Expense;
