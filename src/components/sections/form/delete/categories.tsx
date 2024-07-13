'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';
import { deleteCateogries } from '@/lib/category/delete-categories';
import { CategoryChartData, CategoryType } from '@/types';
import deleteCategoriesSchema from '@/schemas/delete-categories';

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
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

const Categories = ({
  className,
  type,
  selectedCategoryIds = [],
  tableData
}: {
  className?: string;
  type: CategoryType;
  selectedCategoryIds: string[];
  tableData: CategoryChartData[];
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();
  const { toast } = useToast();

  const selectedCategories = selectedCategoryIds
    .map(id => {
      const matchedCategory = tableData.find(category => {
        if (category._id === id) {
          return category;
        }
      });
      if (matchedCategory) {
        return matchedCategory;
      }
    })
    .filter(item => {
      if (item) {
        return item;
      }
    });

  const form = useForm<z.infer<typeof deleteCategoriesSchema>>({
    resolver: zodResolver(deleteCategoriesSchema),
    defaultValues: {
      categories: [],
      type: type,
      userId: userId,
      formPath: currentPathname
    }
  });

  useEffect(() => {
    form.setValue('categories', selectedCategoryIds);
  }, [selectedCategoryIds]);

  const onSubmit = async (data: z.infer<typeof deleteCategoriesSchema>) => {
    const response = await deleteCateogries(data, type);

    toast({
      title: response.message.title,
      description: response.message.description,
      variant: response.isSuccessful ? 'success' : 'destructive'
    });

    form.reset();
  };

  const selectedCategoriesList = (
    <div className='space-y-2 pt-4'>
      <div className=''>
        <p className='text-body-100'>Selected Categories:</p>
      </div>
      <div className='ml-4 space-y-2'>
        {selectedCategories.map(item => {
          return (
            <div
              className='text-body-200 flex flex-row space-x-1'
              key={item?._id}
            >
              <p className=''>- {item?.name}</p>
              <p className='text-muted-foreground'>
                (123 transactions | $12345.00)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

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

        {selectedCategoriesList}

        <div className='mt-8'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn('flex flex-col', className)}
            >
              <DialogFooter className='flex flex-row justify-end gap-2'>
                <DialogClose asChild>
                  <Button
                    className='w-full'
                    variant='destructive'
                    type='submit'
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Categories;
