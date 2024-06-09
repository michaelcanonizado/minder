import { getExpensesData } from '@/lib/get-expenses-data';
import React from 'react';

const ExpenseBreakdown = async () => {
  const page: number = 3;
  const limit: number = 2;
  const data = await getExpensesData({ page, limit });

  return <div className='px-8'>Expense Breakdown</div>;
};

export default ExpenseBreakdown;
