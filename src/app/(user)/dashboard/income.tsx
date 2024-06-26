'use client';

import Bento from '@/components/sections/bento';
import { useDashboardContext } from '@/context/dashboard-context';
import { getIncomesChartData } from '@/lib/income/get-incomes-chart-data';
import { useEffect, useState } from 'react';

const Income = () => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  const [data, setData] = useState<any | null>(null);

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
      <Bento.Box.Content></Bento.Box.Content>
    </Bento.Box>
  );
};

export default Income;
