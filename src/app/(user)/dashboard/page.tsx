import Bento from '@/components/sections/bento';

import NetAmount from './net-amount';
import Income from './income';
import Expense from './expense';

import Categories from './categories';
import { Period } from '@/types';

const isValidPeriod = (period: string | string[] | undefined) => {
  return period === 'weekly' || period === 'monthly' || period === 'yearly';
};

const Dashboard = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const period = (
    isValidPeriod(searchParams.period) ? searchParams.period : 'weekly'
  ) as Period;

  const selectedIncomeCategoriesRowsRaw = searchParams.selectedIncomeCategories
    ? (searchParams.selectedIncomeCategories as string)
    : '';
  const selectedIncomeCategoriesRowsArray =
    selectedIncomeCategoriesRowsRaw.split(',');

  const selectedExpenseCategoriesRowsRaw =
    searchParams.selectedExpenseCategories
      ? (searchParams.selectedExpenseCategories as string)
      : '';
  const selectedExpenseCategoriesRowsArray =
    selectedExpenseCategoriesRowsRaw.split(',');

  return (
    <Bento className='grid-cols-4'>
      <NetAmount className='col-span-4' period={period} />
      <Income
        className='col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2'
        period={period}
      />
      <Expense
        className='col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2'
        period={period}
      />
      <Categories
        className='col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2'
        selectedIncomeCategoriesId={selectedIncomeCategoriesRowsArray}
        selectedExpenseCategoriesId={selectedExpenseCategoriesRowsArray}
        period={period}
      />
    </Bento>
  );
};

export default Dashboard;
