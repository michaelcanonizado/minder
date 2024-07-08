'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';
import addWalletSchema from '@/schemas/add-wallet';
import { deleteCateogries } from '@/lib/category/delete-categories';
import { CategoryType } from '@/types';
import deleteCategoriesSchema from '@/schemas/delete-categories';

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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDashboardContext } from '@/context/dashboard';
import { Trash2 } from 'lucide-react';

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
      type: type,
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof deleteCategoriesSchema>) => {
    const response = await deleteCateogries(data, type);
    console.log(response);

    form.reset();
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
          <DialogTitle>Delete Categories</DialogTitle>
          <DialogDescription className=''>
            This will delete the categories from your account allong with the
            connected transactions!
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-2 pt-4'>
          <div className=''>
            <p className='text-body-100'>Selected Categories:</p>
          </div>
          <div className='ml-4 space-y-2'>
            {/* {rowsSelected.map((item, index) => {
              return (
                <div
                  className='text-body-200 flex flex-row space-x-1'
                  key={index}
                >
                  <p className=''>- {item.getValue('name')}</p>
                  <p className='text-muted-foreground'>
                    (123 transactions | $12345.00)
                  </p>
                </div>
              );
            })} */}
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('flex flex-col', className)}
          >
            <DialogFooter className='flex flex-row justify-end gap-2'>
              <DialogClose asChild>
                <Button className='w-full' variant='destructive' type='submit'>
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Categories;
