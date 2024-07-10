'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Period } from '@/types';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const periods: { name: string; key: Period }[] = [
  {
    name: 'Weekly',
    key: 'weekly'
  },
  {
    name: 'Monthly',
    key: 'monthly'
  },
  {
    name: 'Yearly',
    key: 'yearly'
  }
];

const PeriodSelect = ({
  className,
  defaultValue
}: {
  className?: string;
  defaultValue: Period;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onChangePeriod = (value: Period) => {
    const currentUrl = new URLSearchParams(searchParams);
    currentUrl.set('period', value);
    const search = currentUrl.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return (
    <div className={cn('', className)}>
      <Select
        defaultValue={defaultValue}
        onValueChange={value => {
          onChangePeriod(value as Period);
        }}
      >
        <SelectTrigger className='w-[100px]'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {periods.map(period => {
              return (
                <SelectItem value={period.key} key={period.key}>
                  {period.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PeriodSelect;
