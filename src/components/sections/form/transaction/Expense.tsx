'use client';

import React from 'react';
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
  const form = useForm();

  return (
    <Form {...form}>
      <div className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='...'
          render={() => (
            <FormItem className=''>
              <FormLabel>Deduct from:</FormLabel>
              <FormControl>
                <FormRadioCardGroup data={wallets} orientation='horizontal' />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-2'>
          <FormInput form={form} title='Amount' type='text' placeholder='125' />
          <FormField
            control={form.control}
            name='...'
            render={({ field }) => (
              <FormSelect title='Category' data={categories} field={field} />
            )}
          />

          <FormInput
            form={form}
            title='Description'
            type='text'
            placeholder='Total expense on food'
          />
        </div>
        <Button type='submit' className='mt-4 w-full'>
          Submit
        </Button>
      </div>
    </Form>
  );
};

const FormSelect = ({
  data,
  title,
  className,
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
  title: string;
  className?: string;
  field: any;
}) => {
  return (
    <FormItem>
      <FormLabel>{title}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder='Expense category' />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {data.map(item => {
            return <SelectItem value={item.id}>{item.name}</SelectItem>;
          })}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

const FormRadioCardGroup = ({
  data,
  className,
  orientation
}: {
  data: {
    id: string;
    name: string;
    [key: string]: any;
  }[];
  className?: string;
  orientation: 'horizontal' | 'vertical';
}) => {
  return (
    <RadioGroup className='' defaultValue={wallets[0].id}>
      <ScrollArea className={cn('h-[100px] w-full', className)}>
        <div
          className={`flex ${orientation == 'vertical' ? 'flex-col' : 'flex-row'} gap-2 pr-2 pt-2`}
        >
          {data.map(wallet => {
            return (
              <FormRadioCard
                name={wallet.name}
                value={wallet.id}
                id={wallet.id}
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
  className
}: {
  name: string;
  value: string;
  id: string;
  className?: string;
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <RadioGroupItem value={value} id={id} className='peer sr-only' />
      <Label
        htmlFor={id}
        className={cn(
          'grid h-[75px] w-[75px] place-items-center rounded-lg ring ring-muted hover:cursor-pointer peer-data-[state=checked]:ring-foreground',
          className
        )}
      >
        <p className=''>{name}</p>
      </Label>
    </div>
  );
};

const FormInput = ({
  className,
  form,
  title,
  type,
  placeholder
}: {
  className?: string;
  form: any;
  title: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name='...'
      render={() => (
        <FormItem className={cn('', className)}>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Expense;
