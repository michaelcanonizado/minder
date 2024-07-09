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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormInput, FormSelect } from '../components';
import { addNewCategory } from '@/lib/category/add-new-category';

const Category = ({
  className,
  type
}: {
  className?: string;
  type: CategoryType;
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;
  const currentPathname = usePathname();

  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: '',
      colorId: '',
      userId: userId,
      formPath: currentPathname
    }
  });

  const onSubmit = async (data: z.infer<typeof addCategorySchema>) => {
    const response = await addNewCategory(data, type);

    form.reset();
  };

  const selectedColor = categoryColors.find(color => {
    if (color._id === form.watch('colorId')) {
      return color;
    }
  });
  let inputStyles = {
    backgroundColor: '',
    color: '',
    outlineColor: '',
    borderColor: ''
  };
  if (selectedColor) {
    inputStyles = {
      backgroundColor: selectedColor.code.secondary,
      color: selectedColor.code.primary,
      outlineColor: selectedColor.code.primary,
      borderColor: selectedColor.code.primary
    };
  }

  const formHeader = `Add New ${type === 'income' ? 'Expense' : 'Expense'} Category`;

  const formDescription = `Create a new category to organize your ${type === 'income' ? 'income' : 'expense'}. Provide a name and a color for better clarity.`;

  return (
    <Dialog>
      <DialogTrigger asChild style={{ margin: '0' }}>
        <Button variant='outline' className='w-full'>
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className=''>
          <DialogTitle>{formHeader}</DialogTitle>
          <DialogDescription>{formDescription}</DialogDescription>
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
                      <FormInput
                        className=''
                        type='text'
                        placeholder='Cash'
                        style={inputStyles}
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
                  <FormItem className='w-full'>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <FormSelect
                        field={field}
                        data={categoryColors}
                        showColor={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='mt-4 flex flex-row justify-end gap-2'>
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
