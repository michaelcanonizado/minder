import Chart from '@/components/sections/chart';
import { getIncomesWeekly } from '@/lib/get-incomes-weekly';
import { AreaChart } from '@tremor/react';
import React from 'react';

const WeeklyIncome = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getIncomesWeekly(userId);

  console.log(data);

  return (
    <AreaChart
      data={data}
      index='transactionDate'
      categories={['amount']}
      showAnimation={true}
      showLegend={false}
      showGridLines={false}
      showYAxis={false}
      curveType='natural'
      yAxisWidth={10}
      startEndOnly={true}
      className='h-[250px]'
    />
  );
};

export default WeeklyIncome;
