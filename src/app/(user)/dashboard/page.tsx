import React from 'react';

import Balance from '@/components/sections/balance';
import Bento from '@/components/sections/bento';
import Graph from '@/components/sections/graph';

const Dashboard = () => {
  return (
    <div className='px-8'>
      <Bento className='grid-cols-3'>
        <Bento.Box>
          <Bento.Box.Header>
            <Balance.Compact variant='total' />
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Graph.Minimal />
          </Bento.Box.Content>
        </Bento.Box>
        <Bento.Box>
          <Bento.Box.Header>
            <Balance.Compact variant='total' />
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Graph.Minimal />
          </Bento.Box.Content>
        </Bento.Box>
        <Bento.Box>
          <Bento.Box.Header>
            <Balance.Compact variant='total' />
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Graph.Minimal />
          </Bento.Box.Content>
        </Bento.Box>
      </Bento>
    </div>
  );
};

export default Dashboard;
