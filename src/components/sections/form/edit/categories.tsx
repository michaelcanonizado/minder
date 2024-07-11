'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import editCategorySchema from '@/schemas/edit-category';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { CategoryChartData, categoryColors, CategoryType } from '@/types';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { FormInput } from '../components';
import { Check } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { editCategory } from '@/lib/category/edit-category';

const Category = ({
  className,
  category,
  type
}: {
  className?: string;
  category: CategoryChartData;
  type: CategoryType;
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();

  const form = useForm<z.infer<typeof editCategorySchema>>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      _id: category._id,
      name: category.name,
      colorId: category.color._id,
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof editCategorySchema>) => {
    console.log(data);
    const response = await editCategory(data, type);

    form.reset();
  };

  return (
    <div className={cn('p-2', className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('flex flex-col p-0')}
        >
          <div className='flex flex-col'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <FormInput
                      className=''
                      type='text'
                      placeholder=''
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='colorId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <ScrollArea>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex max-h-[200px] flex-col space-y-1'
                      >
                        {categoryColors.map(color => {
                          return (
                            <FormItem className='mr-4 flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem
                                  value={color._id}
                                  className='sr-only'
                                />
                              </FormControl>
                              <FormLabel className='!m-0 flex w-full flex-row justify-between font-normal'>
                                <div className='flex flex-row gap-2'>
                                  <div
                                    className='size-[16px] rounded-sm'
                                    style={{
                                      backgroundColor: color.code.primary
                                    }}
                                  />
                                  <p className=''>{color.name}</p>
                                </div>
                                {field.value === color._id && (
                                  <Check className='size-[16px]' />
                                )}
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                        <ScrollBar orientation='vertical' />
                      </RadioGroup>
                    </ScrollArea>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='mt-4 w-full px-8'>
            Confirm
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Category;
