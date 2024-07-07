'use client';

import React from 'react';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { CalendarIcon } from 'lucide-react';

import { FormItem, FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
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
import { Item } from '@radix-ui/react-select';

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
  field,
  showColor = false
}: {
  data: {
    _id: string;
    name: string;
    [key: string]: any;
  }[];
  field: any;
  showColor?: boolean;
}) => {
  // Manually set the selected value as the component doesn't reset back to the placeholder even when form.reset() is called and field.value is == ''
  // As of the moment, shadcn doesn't provide a way to have the select placeholder to be text-muted-foreground. So this function is also used to set the text color to text-muted-foreground when no item is selected.
  let selectContainerClasses = '';
  if (data[0].code && showColor) {
    selectContainerClasses = 'space-y-1';
  }

  const getSelectedItem = () => {
    // If no item is selected
    if (field.value.length === 0) {
      return (
        <SelectTrigger className='text-muted-foreground'>
          <SelectValue placeholder='Choose'>Choose</SelectValue>
        </SelectTrigger>
      );
    }

    // Find the selected item in the passed data prop and render the <SelectValue/>
    const selectedItem = data.find(item => {
      if (item._id === field.value) {
        return field.value;
      }
    });

    return (
      <SelectTrigger className='text-foreground'>
        <SelectValue placeholder='Choose'>{selectedItem?.name}</SelectValue>
      </SelectTrigger>
    );
  };

  return (
    <Select onValueChange={field.onChange} defaultValue={field.defaultValue}>
      <FormControl>{getSelectedItem()}</FormControl>
      <SelectContent className='max-h-[300px]'>
        <SelectGroup className={cn('', selectContainerClasses)}>
          {data.map(item => {
            let buttonStyles = {
              backgroundColor: '',
              color: ''
            };
            if (item.code && showColor) {
              buttonStyles = {
                backgroundColor: item.code.secondary,
                color: item.code.primary
              };
            }

            return (
              <SelectItem value={item._id} key={item._id} style={buttonStyles}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
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
    _id: string;
    name: string;
    balance?: number;
    [key: string]: any;
  }[];
  className?: string;
  orientation: 'horizontal' | 'vertical';
  field: any;
  name: string;
}) => {
  /*
  !!!NOTE!!!
  Further improvements can be made to this component to make it more compound. I.e: allowing <FormRadioCard/> to be exported and have the loop outside
  */
  return (
    <RadioGroup
      className=''
      defaultValue={field.value}
      onValueChange={field.onChange}
      name={name}
      {...props}
    >
      <ScrollArea className={cn('h-[105px] w-full', className)}>
        <div
          className={`flex ${orientation == 'vertical' ? 'flex-col' : 'flex-row'} gap-2 pr-2`}
        >
          {data.map(item => {
            console.log(field.value);
            return (
              <FormRadioCard
                title={item.name}
                subtitle={item.balance}
                value={item._id}
                id={item._id}
                key={item._id}
                checked={item._id === field.value}
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
  checked,
  className,
  ...props
}: {
  title: string;
  subtitle?: number;
  value: string;
  id: string;
  checked?: boolean;
  className?: string;
}) => {
  const detail = (
    <p className='text-body-200 mt-1 text-muted-foreground'>
      {subtitle
        ? subtitle.toLocaleString('en-US', {
            notation: 'compact',
            maximumFractionDigits: 2
          })
        : 0}
    </p>
  );

  return (
    <FormItem
      className='flex grow items-center justify-center space-x-2'
      {...props}
    >
      <FormControl>
        <RadioGroupItem
          value={value}
          id={id}
          className='peer sr-only'
          checked={checked ? checked : false}
        />
      </FormControl>
      <Label
        htmlFor={id}
        className={cn(
          'flex min-h-[85px] w-full min-w-[85px] items-center rounded-lg ring ring-muted hover:cursor-pointer peer-data-[state=checked]:ring-foreground',
          className
        )}
      >
        <div className='flex h-full w-full flex-col items-center justify-center overflow-hidden text-center'>
          <p className='overflow-hidden text-ellipsis'>{title}</p>
          {detail}
        </div>
      </Label>
    </FormItem>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return <Input type={type} ref={ref} {...props} />;
  }
);
