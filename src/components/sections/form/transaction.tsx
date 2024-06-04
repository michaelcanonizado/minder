'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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

const Transaction = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <div className='flex flex-col gap-2'>
        <Amount form={form} />
        <Amount form={form} />
        <Amount form={form} />
        <Amount form={form} />
      </div>

      <Button type='submit' className='mt-4 w-full'>
        Submit
      </Button>
    </Form>
  );
};

const Amount = ({ className, form }: { className?: string; form: any }) => {
  return (
    <FormField
      control={form.control}
      name='...'
      render={() => (
        <FormItem className={cn('', className)}>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input type='text' placeholder='1234' />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Transaction;
