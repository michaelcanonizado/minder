'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { useToast } from '@/components/ui/use-toast';
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
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    const response = await addNewWallet(data);

    toast({
      title: response.message.title,
      description: response.message.description,
      variant: response.isSuccessful ? 'success' : 'destructive'
    });

    setIsDialogOpen(false);

    if (response.resetForm) {
      form.reset();
    }
  };

  const onOpenChange = (open: boolean) => {
    form.reset();
    setIsDialogOpen(open);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
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

              <Button type='submit' className='w-fit px-8'>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Wallet;
