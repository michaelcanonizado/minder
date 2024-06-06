'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';

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

import trackTransferSchema from '@/schemas/track-transfer';

const wallets = [
  {
    id: '1',
    name: 'Cash',
    color: '#7C3AED',
    description: '',
    balance: 2810,
    createdAt: new Date(),
    transactionCount: 3,
    isDeleted: {
      status: false,
      deletedAt: new Date()
    }
  },
  {
    id: '2',
    name: 'GCash',
    color: '#2994FC',
    description: '',
    balance: 500,
    createdAt: new Date(),
    transactionCount: 0,
    isDeleted: {
      status: false,
      deletedAt: new Date()
    }
  },
  {
    id: '3',
    name: 'Savings',
    color: '#21C5E0',
    description: '',
    balance: 2000,
    createdAt: new Date(),
    transactionCount: 0,
    isDeleted: {
      status: false,
      deletedAt: new Date()
    }
  },
  {
    id: '4',
    name: 'Paypal',
    color: '#F23E94',
    description: '',
    balance: 700,
    createdAt: new Date(),
    transactionCount: 0,
    isDeleted: {
      status: false,
      deletedAt: new Date()
    }
  }
];

const Transfer = () => {
  const form = useForm<z.infer<typeof trackTransferSchema>>({
    resolver: zodResolver(trackTransferSchema),
    defaultValues: {
      // I need to set each value a default value to remove the 'Warning: A component is changing an uncontrolled input to be controlled.' error from the <Input/> components. Amount is of type number, but i dont want to set its default value to 0 as i only want the placeholder to show, not prefill the <Input/> component. If you know a solution to this, feel free to pull request or commentat the repo.
      // @ts-ignore
      amount: '',
      sourceWalletId: wallets[0].id,
      destinationWalletId: wallets[0].id,
      categoryId: '',
      date: undefined,
      description: ''
    }
  });

  const onSubmit = (data: z.infer<typeof trackTransferSchema>) => {
    console.log(data);
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
            name='sourceWalletId'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>From:</FormLabel>
                <FormControl>
                  <FormRadioCardGroup
                    data={wallets}
                    orientation='horizontal'
                    field={field}
                    name='source'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='destinationWalletId'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>To:</FormLabel>
                <FormControl>
                  <FormRadioCardGroup
                    data={wallets}
                    orientation='horizontal'
                    field={field}
                    name='destination'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-4'>
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

export default Transfer;
