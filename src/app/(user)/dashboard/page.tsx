import Bento from '@/components/sections/bento';

import NetAmount from './net-amount';
import Income from './income';
import Expense from './expense';

import { DashboardContextProvider } from '@/context/dashboard';
import Categories from './categories';
import { Period } from '@/types';

const Dashboard = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const userId = process.env.TEMP_USER_ID!;

  const period = searchParams.period
    ? (searchParams.period as Period)
    : ('weekly' as Period);

  const selectedIncomeCategoriesRowsRaw = searchParams.selectedIncomeCategories
    ? (searchParams.selectedIncomeCategories as string)
    : '';
  const selectedIncomeCategoriesRowsArray =
    selectedIncomeCategoriesRowsRaw.split(',');

  console.log(selectedIncomeCategoriesRowsArray);

  return (
    <DashboardContextProvider>
      <div className=''>
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
            selectedCategories={selectedIncomeCategoriesRowsArray}
          />
        </Bento>
      </div>
    </DashboardContextProvider>
  );
};

export default Dashboard;
