'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';
import addWalletSchema from '@/schemas/add-wallet';
import { addNewWallet } from '@/lib/wallet/add-new-wallet';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/sections/form/components';

const Wallet = ({ className }: { className?: string }) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();

  const form = useForm<z.infer<typeof addWalletSchema>>({
    resolver: zodResolver(addWalletSchema),
    defaultValues: {
      name: '',
      balance: '' as unknown as number,
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof addWalletSchema>) => {
    // Coerce the data.userId to match the passed userId incase it was changed
    if (data.userId !== userId) {
      data.userId = userId;
    }

    const response = await addNewWallet(data);

    if (!response!.isSuccessful) {
      console.log('Error adding income!');
      console.log(response);
      return;
    }

    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger className='transition-color flex w-full flex-row gap-2 rounded-lg border p-2 duration-200 ease-in hover:bg-accent'>
        <Plus className='min-w-[24px]' />
        <p className=''>Add Wallet</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Wallet</DialogTitle>
          <DialogDescription>Add new wallet to your account</DialogDescription>
        </DialogHeader>
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
                      Initial Balance{' '}
                      <span className='text-body-200 text-muted-foreground'>
                        {' '}
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <FormInput type='text' placeholder='0' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='flex flex-row justify-end gap-2'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type='submit' className='w-fit px-8'>
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Wallet;
