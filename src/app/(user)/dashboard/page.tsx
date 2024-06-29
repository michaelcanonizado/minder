import Bento from '@/components/sections/bento';

import NetAmount from './net-amount';
import Income from './income';
import Expense from './expense';

import { DashboardContextProvider } from '@/context/dashboard-context';
import Categories from './categories';

const Dashboard = async () => {
  const userId = process.env.TEMP_USER_ID!;

  return (
    <DashboardContextProvider>
      <div className='px-8'>
        <Bento className='grid-cols-4'>
          <NetAmount className='col-span-4' />
          <Income className='col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2' />
          <Expense className='col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2' />
          <Categories className='col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2' />
        </Bento>
      </div>
    </DashboardContextProvider>
  );
};

export default Dashboard;
