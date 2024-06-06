'use client';

import React from 'react';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { CalendarIcon } from 'lucide-react';

import { FormItem, FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { FC } from 'react';

export const FormDatePicker = ({
  className,
  field
}: {
  className?: string;
  field: any;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant='outline'
            className={cn(
              'w-full pl-3 text-left font-normal hover:bg-background hover:text-muted-foreground ',
              !field.value && 'text-muted-foreground ',
              className
            )}
          >
            {field.value ? (
              format(field.value, 'PPPP')
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='end'>
        <Calendar
          mode='single'
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export const FormSelect = ({
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

export const FormRadioCardGroup = ({
  data,
  className,
  orientation,
  field,
  name,
  ...props
}: {
  data: {
    id: string;
    name: string;
    balance?: number;
    [key: string]: any;
  }[];
  className?: string;
  orientation: 'horizontal' | 'vertical';
  field: any;
  name: string;
}) => {
  return (
    <RadioGroup
      className=''
      defaultValue={field.value}
      onValueChange={field.onChange}
      name={name}
      {...props}
    >
      <ScrollArea className={cn('h-[96px] w-full', className)}>
        <div
          className={`flex ${orientation == 'vertical' ? 'flex-col' : 'flex-row'} gap-2 pr-2 pt-2`}
        >
          {data.map(item => {
            return (
              <FormRadioCard
                title={item.name}
                subtitle={item.balance}
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
  title,
  subtitle,
  value,
  id,
  className,
  ...props
}: {
  title: string;
  subtitle?: number;
  value: string;
  id: string;
  className?: string;
}) => {
  const detail = subtitle ? (
    <p className='text-body-200 mt-1 text-muted-foreground'>
      {subtitle.toLocaleString('en-US', {
        notation: 'compact',
        maximumFractionDigits: 2
      })}
    </p>
  ) : (
    ''
  );

  return (
    <FormItem className='flex items-center space-x-2' {...props}>
      <FormControl>
        <RadioGroupItem value={value} id={id} className='peer sr-only' />
      </FormControl>
      <Label
        htmlFor={id}
        className={cn(
          'size-[75px] rounded-lg ring ring-muted hover:cursor-pointer peer-data-[state=checked]:ring-foreground',
          className
        )}
      >
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <p className=''>{title}</p>
          {detail}
        </div>
      </Label>
      {/* <Label
          htmlFor={id}
          className={cn(
            'grid size-[75px] place-items-center rounded-lg text-center ring ring-muted hover:cursor-pointer peer-data-[state=checked]:ring-foreground',
            className
          )}
        >
          {name}
        </Label> */}
    </FormItem>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return <Input type={type} ref={ref} {...props} />;
  }
);
