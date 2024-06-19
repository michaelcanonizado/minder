'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';
import addWalletSchema from '@/schemas/add-wallet';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormInput } from '../components';

const Wallet = ({ className }: { className?: string }) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();

  const form = useForm<z.infer<typeof addWalletSchema>>({
    resolver: zodResolver(addWalletSchema),
    defaultValues: {
      name: '',
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof addWalletSchema>) => {
    console.log('hello');
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col', className)}
      >
        <div className='mt-8 flex flex-row gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <FormInput type='text' placeholder='Paypal' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='balance'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Balance{' '}
                  <span className='text-body-200 text-muted-foreground'>
                    {' '}
                    (optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <FormInput type='text' placeholder='5000' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-row justify-end gap-2'>
          <Button type='button' className='w-fit' variant='outline'>
            Cancel
          </Button>
          <Button type='submit' className='w-fit px-8'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Wallet;
