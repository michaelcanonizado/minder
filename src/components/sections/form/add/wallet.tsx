'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { FormInput } from '../components';

import { usePathname } from 'next/navigation';
import addWalletSchema from '@/schemas/add-wallet';
import { Form } from '@/components/ui/form';

const Wallet = ({ className }: { className?: string }) => {
  const userId = process.env.TEMP_USER_ID!;
  const currentPathname = usePathname();

  const form = useForm<z.infer<typeof addWalletSchema>>({
    resolver: zodResolver(addWalletSchema),
    defaultValues: {
      name: '',
      balance: 0,
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof addWalletSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className={cn('', className)}></form>
    </Form>
  );
};

export default Wallet;
