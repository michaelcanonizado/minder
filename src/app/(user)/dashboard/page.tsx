import Bento from '@/components/sections/bento';
import React from 'react';

const Dashboard = () => {
  return (
    <div className='px-8'>
      <Bento>
        <Bento.Box>
          <Bento.Balance variant='total' />
          <Bento.Graph />
        </Bento.Box>
        <Bento.Box>
          <Bento.Balance variant='income' />
          <Bento.Graph />
        </Bento.Box>
      </Bento>
    </div>
  );
};

export default Dashboard;
