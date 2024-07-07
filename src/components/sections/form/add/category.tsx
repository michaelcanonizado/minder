'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import addCategorySchema from '@/schemas/add-cetegory';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { CategoryType } from '@/types';
import { categoryColors } from '@/types';

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
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormInput, FormSelect } from '../components';
import { useEffect, useState } from 'react';
import { getCategoriesData } from '@/lib/category/get-categories-data';

const Category = ({
  className,
  type
}: {
  className?: string;
  type: CategoryType;
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();

  const [categories, setCategories] = useState<Awaited<
    ReturnType<typeof getCategoriesData>
  > | null>(null);

  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: '',
      color: categoryColors[0]._id,
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof addCategorySchema>) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild style={{ margin: '0' }}>
        <Button variant='outline'>Add Category</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
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
                      <FormInput type='text' placeholder='Cash' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <FormSelect field={field} data={categoryColors} />
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

export default Category;
