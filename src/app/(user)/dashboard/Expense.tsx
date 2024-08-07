import { ChartRow, Period } from '@/types';

import { cn } from '@/lib/utils';
import { formatChartDataDateProperties } from '@/helpers/format/format-chart-data-date-properties';
import { formatDate } from '@/helpers/format/formatDate';
import { getExpenseChartData } from '@/lib/expense/get-expense-chart-data';

import { ArrowDown, ArrowUp } from 'lucide-react';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import Balance from '@/components/sections/balance';

const Expense = async ({
  className,
  period
}: {
  className?: string;
  period: Period;
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const data = await getExpenseChartData(userId, period);
  data.rows = formatChartDataDateProperties(data.rows) as ChartRow[];

  if (!data) {
    return (
      <Bento.Box className={cn('', className)}>
        <Bento.Box.Header>No Data</Bento.Box.Header>
      </Bento.Box>
    );
  }

  const startDate = data ? formatDate(data.dates.start) : '';
  const endDate = data ? formatDate(data.dates.end) : '';

  let headerTitle = 'Expense';
  if (period === 'weekly') {
    headerTitle = 'Expense this week';
  } else if (period === 'monthly') {
    headerTitle = 'Expense this month';
  } else if (period === 'yearly') {
    headerTitle = 'Expense this year';
  }

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
    data.balance.percentageChange.percentage !== Infinity &&
    data.balance.percentageChange.percentage !== -Infinity ? (
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
      <Bento.Box.Header className='border-none'>{header}</Bento.Box.Header>
      <Bento.Box.Content className='p-0'>
        {data && (
          <Chart.Area
            data={data.rows}
            index='date'
            categories={['amount']}
            className='h-[100px]'
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

export default Expense;
