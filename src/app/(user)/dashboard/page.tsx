import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Balance from '@/components/sections/balance';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';

const Dashboard = () => {
  const balances = [
    {
      name: 'Total'
    },
    {
      name: 'Income'
    },
    {
      name: 'Expense'
    }
  ];

  return (
    <div className='px-8'>
      <Bento className='grid-cols-1'>
        <Bento.Box>
          <Tabs defaultValue='Total' className='w-full'>
            <TabsList className='w-full rounded-b-none'>
              {balances.map(item => {
                return (
                  <TabsTrigger value={item.name} className='grow'>
                    {item.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {balances.map(item => {
              return (
                <TabsContent value={item.name}>
                  <Bento.Box.Header>
                    <Balance.Compact variant='total' />
                  </Bento.Box.Header>
                  <Bento.Box.Content>
                    <Chart.Line.Minimal />
                  </Bento.Box.Content>
                </TabsContent>
              );
            })}
          </Tabs>
        </Bento.Box>
        <Bento.Box className=''>
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
