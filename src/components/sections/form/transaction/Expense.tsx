'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import trackExpenseSchema from '@/schemas/track-expense';

const wallets = [
  {
    id: '1',
    name: 'Cash',
    color: '#7C3AED',
    description: '',
    balance: 2810,
    createdAt: new Date(),
    transactionCount: 3,
    isDeleted: {
      status: false,
      deletedAt: new Date()
    }
  },
  {
    id: '2',
    name: 'GCash',
    color: '#2994FC',
    description: '',
    balance: 500,
    createdAt: new Date(),
    transactionCount: 0,
    isDeleted: {
      status: false,
      deletedAt: new Date()
    }
  },
  {
    id: '3',
    name: 'Savings',
    color: '#21C5E0',
    description: '',
    balance: 2000,
    createdAt: new Date(),
    transactionCount: 0,
    isDeleted: {
      status: false,
      deletedAt: new Date()
    }
  },
  {
    id: '4',
    name: 'Paypal',
    color: '#F23E94',
    description: '',
    balance: 700,
    createdAt: new Date(),
    transactionCount: 0,
    isDeleted: {
      status: false,
      deletedAt: new Date()
    }
  }
];

const categories = [
  {
    id: '1',
    name: 'Food',
    createdAt: new Date(),
    icon: '',
    isDeleted: {
      status: false,
      deletedAt: new Date()
    },
    color: ''
  },
  {
    id: '2',
    name: 'Transportation',
    createdAt: new Date(),
    icon: '',
    isDeleted: {
      status: false,
      deletedAt: new Date()
    },
    color: ''
  },
  {
    id: '3',
    name: 'Shopping',
    createdAt: new Date(),
    icon: '',
    isDeleted: {
      status: false,
      deletedAt: new Date()
    },
    color: ''
  },
  {
    id: '4',
    name: 'Phone',
    createdAt: new Date(),
    icon: '',
    isDeleted: {
      status: false,
      deletedAt: new Date()
    },
    color: ''
  },
  {
    id: '5',
    name: 'Housing',
    createdAt: new Date(),
    icon: '',
    isDeleted: {
      status: false,
      deletedAt: new Date()
    },
    color: ''
  },
  {
    id: '6',
    name: 'Education',
    createdAt: new Date(),
    icon: '',
    isDeleted: {
      status: false,
      deletedAt: new Date()
    },
    color: ''
  },
  {
    id: '7',
    name: 'Entertainment',
    createdAt: new Date(),
    icon: '',
    isDeleted: {
      status: false,
      deletedAt: new Date()
    },
    color: ''
  },
  {
    id: '8',
    name: 'Other',
    createdAt: new Date(),
    icon: '',
    isDeleted: {
      status: false,
      deletedAt: new Date()
    },
    color: ''
  }
];

const Expense = () => {
  const form = useForm<z.infer<typeof trackExpenseSchema>>({
    resolver: zodResolver(trackExpenseSchema),
    defaultValues: {
      walletId: categories[0].id
    }
  });

  const onSubmit = (data: z.infer<typeof trackExpenseSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-4 flex flex-col gap-4'
      >
        <div className='flex flex-col gap-1'>
          <FormField
            control={form.control}
            name='walletId'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Deduct from:</FormLabel>
                <FormControl>
                  <FormRadioCardGroup
                    data={wallets}
                    orientation='horizontal'
                    field={field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='125' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormSelect data={categories} field={field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Total expense on food'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='w-full'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

const FormSelect = ({
  data,
  field
}: {
  data: {
    id: string;
    name: string;
    isDeleted: {
      status: boolean;
      [key: string]: any;
    };
    [key: string]: any;
  }[];
  field: any;
}) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder='Choose' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='max-h-[300px]'>
        {data.map(item => {
          return (
            <SelectItem value={item.id} key={item.id}>
              {item.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

const FormRadioCardGroup = ({
  data,
  className,
  orientation,
  field
}: {
  data: {
    id: string;
    name: string;
    [key: string]: any;
  }[];
  className?: string;
  orientation: 'horizontal' | 'vertical';
  field: any;
}) => {
  return (
    <RadioGroup
      className=''
      defaultValue={field.value}
      onValueChange={field.onChange}
    >
      <ScrollArea className={cn('h-[96px] w-full', className)}>
        <div
          className={`flex ${orientation == 'vertical' ? 'flex-col' : 'flex-row'} gap-2 pr-2 pt-2`}
        >
          {data.map(item => {
            return (
              <FormRadioCard
                name={item.name}
                value={item.id}
                id={item.id}
                key={item.id}
              />
            );
          })}
        </div>
        <ScrollBar orientation={orientation} />
      </ScrollArea>
    </RadioGroup>
  );
};
const FormRadioCard = ({
  name,
  value,
  id,
  className,
  ...props
}: {
  name: string;
  value: string;
  id: string;
  className?: string;
}) => {
  return (
    <FormItem className='flex items-center space-x-2' {...props}>
      <FormControl>
        <RadioGroupItem value={value} id={id} className='peer sr-only' />
      </FormControl>
      <Label
        htmlFor={id}
        className={cn(
          'grid h-[75px] w-[75px] place-items-center rounded-lg text-center ring ring-muted hover:cursor-pointer peer-data-[state=checked]:ring-foreground',
          className
        )}
      >
        {name}
      </Label>
    </FormItem>
  );
};

export default Expense;
