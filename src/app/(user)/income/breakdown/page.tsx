import React from 'react';

import { getIncomesData } from '@/lib/get-incomes-data';

const IncomeBreakdown = async () => {
  const page: number = 1;
  const limit: number = 4;
  const data = await getIncomesData({ page, limit });

  console.log(data);
  console.log(`Data count: ${data.length}`);

  return <div className='px-8'>Income Breakdown</div>;
};

export default IncomeBreakdown;
