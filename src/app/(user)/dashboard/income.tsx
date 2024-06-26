'use client';

import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import { useDashboardContext } from '@/context/dashboard-context';
import { formatChartDataDateProperties } from '@/helpers/format/format-chart-data-date-properties';
import { getIncomesChartData } from '@/lib/income/get-incomes-chart-data';
import { ChartData } from '@/types';
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
      console.log(data);
      setData(data);
    };
    getData();
  }, [dashboard]);

  console.log('Income component render');

  return (
    <Bento.Box>
      <Bento.Box.Header>Income {dashboard.period}</Bento.Box.Header>
      <Bento.Box.Content>
        {data && (
          <Chart.Area
            data={formatChartDataDateProperties(data.rows)}
            index='date'
            categories={['amount']}
          />
        )}
      </Bento.Box.Content>
    </Bento.Box>
  );
};

export default Income;
