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
import { addIncomeTransaction } from '@/lib/add-income-transaction';
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
      // I need to set each value a default value to remove the 'Warning: A component is changing an uncontrolled input to be controlled.' error from the <Input/> components. Amount is of type number, but i dont want to set its default value to 0 as i only want the placeholder to show, not prefill the <Input/> component. If you know a solution to this, feel free to pull request or commentat the repo.
      // @ts-ignore
      amount: '',
      userId: userId,
      walletId: wallets[0]._id,
      categoryId: '',
      date: undefined,
      description: '',
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof trackIncomeSchema>) => {
    // Coerce the data.userId to match the passed userId incase it was changed
    if (data.userId !== userId) {
      data.userId = userId;
    }

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
        // onSubmit={form.handleSubmit(onSubmit)}
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
                <FormControl>
                  <FormRadioCardGroup
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
