import React from 'react';

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
import { cn } from '@/lib/utils';
import { CategoryChartData } from '@/types';

const Category = ({
  className,
  category
}: {
  className?: string;
  category: CategoryChartData;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            'justift-start flex h-fit w-full py-4 transition-colors hover:bg-muted',
            className
          )}
        >
          <p className=''>Edit</p>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className=''>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Edit</DialogDescription>
          <div className=''>
            {category._id} - {category.name} - {category.color.name}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Category;
