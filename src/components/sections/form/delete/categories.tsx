'use client';

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
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import deleteCategoriesSchema from '@/schemas/delete-categories';
import { useDashboardContext } from '@/context/dashboard';
import { CategoryType } from '@/types';

const Categories = ({
  className,
  type
}: {
  className?: string;
  type: CategoryType;
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();

  const { dashboard } = useDashboardContext();

  const selectedCategories =
    type === 'income'
      ? dashboard.selectedCategories.income
      : dashboard.selectedCategories.expense;

  const form = useForm<z.infer<typeof deleteCategoriesSchema>>({
    resolver: zodResolver(deleteCategoriesSchema),
    defaultValues: {
      categories: selectedCategories,
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof deleteCategoriesSchema>) => {
    console.log('Deleting category...');
    console.log(data);
    console.log(dashboard);
  };
  //   const onSubmit = async (data: z.infer<typeof deleteCategoriesSchema>) => {
  //     console.log('Deleting category...');
  //     console.log(data);
  //   };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col', className)}
      >
        <DialogFooter className='flex flex-row justify-end gap-2'>
          {/* <DialogClose asChild> */}
          <Button className='w-full' variant='destructive' type='submit'>
            Delete
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </form>
    </Form>
  );
};

export default Categories;
