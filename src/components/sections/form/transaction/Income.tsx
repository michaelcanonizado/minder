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

import trackIncomeSchema from '@/schemas/track-income';
import { UserCategoryType, UserWalletType } from '@/models/user';
import { addIncomeTransaction } from '@/lib/income/add-income-transaction';
import { usePathname } from 'next/navigation';

const Income = ({
  wallets,
  categories,
  userId
}: {
  wallets: UserWalletType[];
  categories: UserCategoryType[];
  userId: string;
}) => {
  const currentPathname = usePathname();

  const form = useForm<z.infer<typeof trackIncomeSchema>>({
    resolver: zodResolver(trackIncomeSchema),
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

  const onSubmit = async (data: z.infer<typeof trackIncomeSchema>) => {
    const response = await addIncomeTransaction(data);

    if (!response.isSuccessful) {
      console.log('Error adding income!');
      console.log(response);
      return;
    }

    form.reset();
  };

  console.log(form);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action={addIncomeTransaction}
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
  );
};

export default Income;
