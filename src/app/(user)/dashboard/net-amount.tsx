'use client';

import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { useDashboardContext } from '@/context/dashboard-context';
import { ChartData, ChartRow, Period } from '@/types';

import { getNetAmountChartData } from '@/lib/balance/get.net-amount-chart-data';

import { ArrowDown, ArrowUp } from 'lucide-react';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import Balance from '@/components/sections/balance';
import { formatChartDataDateProperties } from '@/helpers/format/format-chart-data-date-properties';

const periods: Period[] = ['weekly', 'monthly', 'yearly'];

const NetAmount = () => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  const [data, setData] = useState<ChartData | null>(null);

  console.log(userId);

  useEffect(() => {
    const getData = async () => {
      const data = await getNetAmountChartData(userId, dashboard.period);

      data.rows = formatChartDataDateProperties(data.rows) as ChartRow[];

      console.log(data);

      setData(data);
    };
    getData();
  }, [dashboard]);

  const startDate = data ? data.rows[0].date : '';
  const endDate = data ? data.rows[data.rows.length - 1].date : '';

  return (
    <Bento.Box className=''>
      <Bento.Box.Header className='border-none'>
        <div className=''></div>
        <div className=''>
          <Select
            defaultValue={dashboard.period}
            onValueChange={value => changeDashboardPeriod(value as Period)}
          >
            <SelectTrigger className='w-[180px] capitalize'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {periods.map(period => {
                  return (
                    <SelectItem
                      value={period}
                      className='capitalize'
                      key={period}
                    >
                      {period}
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
