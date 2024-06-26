'use client';

import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import { useDashboardContext } from '@/context/dashboard-context';
import { formatChartDataDateProperties } from '@/helpers/format/format-chart-data-date-properties';
import { getIncomesChartData } from '@/lib/income/get-incomes-chart-data';
import { ChartData, ChartRow } from '@/types';
import { useEffect, useState } from 'react';

const Income = () => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  const [data, setData] = useState<ChartData | null>(null);

  console.log(userId);

  useEffect(() => {
    const getData = async () => {
      const data = await getIncomesChartData(
        userId,
        dashboard.period as 'weekly' | 'monthly'
      );

      data.rows = formatChartDataDateProperties(data.rows) as ChartRow[];

      console.log(data);

      setData(data);
    };
    getData();
  }, [dashboard]);

  console.log('Income component render');

  const startDate = data ? data.rows[0].date : '';
  const endDate = data ? data.rows[data.rows.length - 1].date : '';

  return (
    <Bento.Box>
      <Bento.Box.Header className='border-none'>
        Income {dashboard.period}
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

export default Income;
