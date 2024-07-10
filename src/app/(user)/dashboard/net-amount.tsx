'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ChartData, ChartRow, Period } from '@/types';
import { cn } from '@/lib/utils';
import { formatChartDataDateProperties } from '@/helpers/format/format-chart-data-date-properties';
import { formatDate } from '@/helpers/format/formatDate';
import { getNetAmountChartData } from '@/lib/net-amount/get-net-amount-chart-data';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import Balance from '@/components/sections/balance';

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

const NetAmount = ({ className }: { className?: string }) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const [data, setData] = useState<ChartData | null>(null);
  const [period, setPeriod] = useState<Period>('weekly');

  useEffect(() => {
    const getData = async () => {
      const data = await getNetAmountChartData(userId, period);

      data.rows = formatChartDataDateProperties(data.rows) as ChartRow[];

      setData(data);
    };
    getData();
  }, [period]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onChangePeriod = (value: Period) => {
    setPeriod(value);
    const currentUrl = new URLSearchParams(searchParams);
    currentUrl.set('period', value);
    const search = currentUrl.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  };

  if (!data) {
    return (
      <Bento.Box className={cn('', className)}>
        <Bento.Box.Header>No Data</Bento.Box.Header>
      </Bento.Box>
    );
  }

  const startDate = data ? formatDate(data.dates.start) : '';
  const endDate = data ? formatDate(data.dates.end) : '';

  let headerTitle = 'Net Amount';

  const headerCurrentAmount = (
    <Balance.Compact.Amount className=''>
      {' '}
      $
      {data.balance.amount.current.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })}
    </Balance.Compact.Amount>
  );

  const headerPreviousAmount = (
    <Balance.Compact.SubHeader className='mb-0.5'>
      from $
      {data.balance.amount.previous.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })}
    </Balance.Compact.SubHeader>
  );

  const headerDifference =
    data.balance.percentageChange.difference.toLocaleString('en-US', {
      signDisplay: 'always'
    });

  const headerArrow =
    data.balance.percentageChange.percentage > 0 ? (
      <ArrowUp className='h-fit w-[14px]' />
    ) : (
      <ArrowDown className='h-fit w-[14px]' />
    );

  const headerPercentage =
    data.balance.percentageChange.percentage !== Infinity ? (
      <span className='flex flex-row'>
        ({headerArrow}
        {` ${data.balance.percentageChange.percentage}%`}){' '}
      </span>
    ) : (
      <span className='flex flex-row'>({headerArrow})</span>
    );

  let headerLabel = '';
  if (period === 'weekly') {
    headerLabel = 'vs last week';
  } else if (period === 'monthly') {
    headerLabel = 'vs last month';
  } else if (period === 'yearly') {
    headerLabel = 'vs last year';
  }

  const header = (
    <Balance.Compact>
      <Balance.Compact.Header>{headerTitle}</Balance.Compact.Header>

      <div className='flex flex-row items-end gap-1'>
        {headerCurrentAmount}
        {headerPreviousAmount}
      </div>

      <Balance.Compact.SubHeader>
        <span
          className={`flex flex-row ${data.balance.percentageChange.isPositive ? 'text-accent-100' : 'text-accent-200'}`}
        >
          {headerDifference}
          &nbsp;{headerPercentage}
        </span>
        &nbsp;
        {headerLabel}
      </Balance.Compact.SubHeader>
    </Balance.Compact>
  );

  return (
    <Bento.Box className={cn('', className)}>
      <Bento.Box.Header className='flex flex-row justify-between border-none'>
        {header}
        <div>
          <Select
            defaultValue={period}
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
      </Bento.Box.Header>
      <Bento.Box.Content className='p-0'>
        {data && (
          <Chart.Area
            data={data.rows}
            index='date'
            categories={['amount']}
            colors={[
              data.balance.percentageChange.isPositive
                ? 'accent-100'
                : 'accent-200'
            ]}
          />
        )}
        <div className='flex flex-row justify-between px-4 pb-4 pt-8'>
          <Chart.Label>{startDate}</Chart.Label>
          <Chart.Label>{endDate}</Chart.Label>
        </div>
      </Bento.Box.Content>
    </Bento.Box>
  );
};

export default NetAmount;
