import Bento from '@/components/sections/bento';

import NetAmount from './net-amount';
import Income from './income';
import Expense from './expense';

import { DashboardContextProvider } from '@/context/dashboard';
import Categories from './categories';

const Dashboard = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const userId = process.env.TEMP_USER_ID!;

  const selectedRowsRaw = searchParams.selected
    ? (searchParams.selected as string)
    : '';
  const selectedRowsArray = selectedRowsRaw.split(',');

  return (
    <DashboardContextProvider>
      <div className=''>
        <Bento className='grid-cols-4'>
          <NetAmount className='col-span-4' />
          <Income className='col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2' />
          <Expense className='col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2' />
          <Categories
            className='col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2'
            selectedCategories={selectedRowsArray}
          />
        </Bento>
      </div>
    </DashboardContextProvider>
  );
};

export default Dashboard;
