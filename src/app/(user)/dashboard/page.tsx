import React from 'react';

import Balance from '@/components/sections/balance';
import Bento from '@/components/sections/bento';
import Graph from '@/components/sections/graph';

const Dashboard = () => {
  return (
    <div className='px-8'>
      <Bento>
        <Bento.Box>
          <Bento.Box.Header>
            <Balance.Compact variant='total' />
          </Bento.Box.Header>
          <Graph.Minimal />
        </Bento.Box>
        <Bento.Box>
          <Bento.Box.Header>
            <Balance.Compact variant='total' />
          </Bento.Box.Header>
          <Graph.Minimal />
        </Bento.Box>
      </Bento>
    </div>
  );
};

export default Dashboard;
