'use client';

import { useEffect, useState } from 'react';

import { useDashboardContext } from '@/context/dashboard-context';
import { ChartData, ChartRow } from '@/types';

import { formatChartDataDateProperties } from '@/helpers/format/format-chart-data-date-properties';
import { getExpensesChartData } from '@/lib/expense/get-expenses-chart-data';

import { ArrowDown, ArrowUp } from 'lucide-react';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import Balance from '@/components/sections/balance';

const Income = () => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getExpensesChartData(
        userId,
        dashboard.period as 'weekly' | 'monthly'
      );

      data.rows = formatChartDataDateProperties(data.rows) as ChartRow[];

      setData(data);
    };
    getData();
  }, [dashboard]);

  console.log(data);

  return (
    <Bento.Box>
      <Bento.Box.Header>No Data</Bento.Box.Header>
    </Bento.Box>
  );
};

export default Income;
