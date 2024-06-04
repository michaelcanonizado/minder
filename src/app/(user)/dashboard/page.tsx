import React from 'react';

import Balance from '@/components/sections/balance';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';

const Dashboard = () => {
  return (
    <div className='px-8'>
      <Bento className='grid-cols-3'>
        <Bento.Box>
          <Bento.Box.Header>
            <Balance.Compact variant='total' />
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Chart.LineMinimal />
          </Bento.Box.Content>
        </Bento.Box>
        <Bento.Box>
          <Bento.Box.Header>
            <Balance.Compact variant='total' />
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Chart.LineMinimal />
          </Bento.Box.Content>
        </Bento.Box>
        <Bento.Box>
          <Bento.Box.Header>
            <Balance.Compact variant='total' />
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Chart.LineMinimal />
          </Bento.Box.Content>
        </Bento.Box>
        <Bento.Box className='col-span-3'>
          <Bento.Box.Header>
            <Balance.Compact variant='weekly' />
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
  );
};

export default Dashboard;
