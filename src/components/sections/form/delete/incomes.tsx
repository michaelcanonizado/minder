'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';
import { CategoryChartData, CategoryType } from '@/types';
import deleteIncomeTransactionSchema from '@/schemas/delete-income-transaction';

import { Form } from '@/components/ui/form';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const Incomes = ({
  className,
  selectedIncomes = []
}: {
  className?: string;
  selectedIncomes?: string[];
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();

  const form = useForm<z.infer<typeof deleteIncomeTransactionSchema>>({
    resolver: zodResolver(deleteIncomeTransactionSchema),
    defaultValues: {
      incomes: [],
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (
    data: z.infer<typeof deleteIncomeTransactionSchema>
  ) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='transition-color flex h-full w-full items-center justify-center rounded-none border border-none bg-inherit p-4 duration-200 ease-in hover:bg-accent'>
          <Trash2 className='w-[16px] stroke-foreground' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Incomes</DialogTitle>
          <DialogDescription className=''>
            This will delete tracked incomes from your account!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Incomes;
