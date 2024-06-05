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
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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

{
  /* <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='option-two'
                    id='option-two'
                    className='peer sr-only aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                  <Label
                    htmlFor='option-two'
                    className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 text-sm font-medium leading-none hover:bg-accent hover:text-accent-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                  >
                    <p className=''>Cash</p>
                  </Label>
                </div> */
}

const Expense = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <div className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='...'
          render={() => (
            <FormItem className=''>
              <FormLabel>Deduct from:</FormLabel>
              <FormControl>
                <RadioGroup className=''>
                  <ScrollArea className='h-[100px] w-full '>
                    <div className='flex flex-row gap-2 pr-2 pt-2'>
                      {wallets.map(wallet => {
                        return (
                          <Wallet
                            name={wallet.name}
                            value={wallet.id}
                            id={wallet.id}
                          />
                        );
                      })}
                    </div>

                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-2'>
          <FormInput form={form} title='Amount' type='text' placeholder='125' />
          <FormInput
            form={form}
            title='Description'
            type='text'
            placeholder='Total expense on food'
          />
          <FormInput form={form} title='Input' type='text' placeholder='123' />
        </div>

        <Button type='submit' className='mt-4 w-full'>
          Submit
        </Button>
      </div>
    </Form>
  );
};

const Wallet = ({
  name,
  value,
  id,
  className
}: {
  name: string;
  value: string;
  id: string;
  className?: string;
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <RadioGroupItem value={value} id={id} className='peer sr-only' />
      <Label
        htmlFor={id}
        className={cn(
          'grid h-[75px] w-[75px] place-items-center rounded-lg ring ring-muted hover:cursor-pointer peer-data-[state=checked]:ring-foreground',
          className
        )}
      >
        <p className=''>{name}</p>
      </Label>
    </div>
  );
};

const FormInput = ({
  className,
  form,
  title,
  type,
  placeholder
}: {
  className?: string;
  form: any;
  title: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name='...'
      render={() => (
        <FormItem className={cn('', className)}>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Expense;
