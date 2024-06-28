'use client';

import { useEffect, useState } from 'react';

import { useDashboardContext } from '@/context/dashboard-context';
import { ChartData, ChartRow, Period } from '@/types';

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

import { cn } from '@/lib/utils';
import { formatChartDataDateProperties } from '@/helpers/format/format-chart-data-date-properties';
import { getNetAmountChartData } from '@/lib/balance/get.net-amount-chart-data';

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

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getNetAmountChartData(userId, dashboard.period);

      data.rows = formatChartDataDateProperties(data.rows) as ChartRow[];

      setData(data);
    };
    getData();
  }, [dashboard]);

  if (!data) {
    return (
      <Bento.Box>
        <Bento.Box.Header>No Data</Bento.Box.Header>
      </Bento.Box>
    );
  }

  let headerTitle = 'Net Amount';

  const headerAmount = data.balance.amount.current.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

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
      ''
    );

  let headerLabel = '';
  if (dashboard.period === 'weekly') {
    headerLabel = 'vs last week';
  } else if (dashboard.period === 'monthly') {
    headerLabel = 'vs last month';
  } else if (dashboard.period === 'yearly') {
    headerLabel = 'vs last year';
  }

  const header = (
    <Balance.Compact>
      <Balance.Compact.Header>{headerTitle}</Balance.Compact.Header>

      <div className='flex flex-row items-end gap-1'>
        <Balance.Compact.Amount className=''>
          {' '}
          ${headerAmount}
        </Balance.Compact.Amount>
        <Balance.Compact.SubHeader className='mb-0.5'>
          from 123451
        </Balance.Compact.SubHeader>
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

  const startDate = data ? data.rows[0].date : '';
  const endDate = data ? data.rows[data.rows.length - 1].date : '';

  return (
    <Bento.Box className={cn('', className)}>
      <Bento.Box.Header className='flex flex-row justify-between border-none'>
        {header}
        <div className=''>
          <Select
            defaultValue={dashboard.period}
            onValueChange={value => {
              changeDashboardPeriod(value as Period);
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
          <Chart.Area data={data.rows} index='date' categories={['amount']} />
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
