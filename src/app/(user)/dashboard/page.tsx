import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';

import NetAmount from './net-amount';
import Income from './income';
import Expense from './expense';

import { DashboardContextProvider } from '@/context/dashboard-context';

const Dashboard = async () => {
  const userId = process.env.TEMP_USER_ID!;

  return (
    <DashboardContextProvider>
      <div className='px-8'>
        <Bento className='grid-cols-1'>
          <NetAmount />
          <Income />
          <Expense />
          <Bento.Box className=''>
            <Bento.Box.Header>
              <p className='text-heading-100'>Expense Budget</p>
            </Bento.Box.Header>
            <Bento.Box.Content className='flex flex-col gap-2'>
              <Chart.Progress />
              <Chart.Progress />
              <Chart.Progress />
              <Chart.Progress />
            </Bento.Box.Content>
          </Bento.Box>
        </Bento>
      </div>
    </DashboardContextProvider>
  );
};

export default Dashboard;
