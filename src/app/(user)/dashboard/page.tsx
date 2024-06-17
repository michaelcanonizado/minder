import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Balance from '@/components/sections/balance';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import { getBalanceData } from '@/lib/get-balance-data';
import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getLastMonthStartAndEndDates } from '@/helpers/dates/get-last-month-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';

const Dashboard = async () => {
  const balances: {
    name: string;
    amount: number;
    percentageChange: {
      isPositive: boolean;
      timePeriod: 'weekly' | 'montly';
      percentage: number;
      difference: number;
    };
  }[] = [
    {
      name: 'Total',
      amount: 25808,
      percentageChange: {
        isPositive: true,
        timePeriod: 'montly',
        percentage: 0.3,
        difference: 1539
      }
    },
    {
      name: 'Income',
      amount: 91273,
      percentageChange: {
        isPositive: true,
        timePeriod: 'weekly',
        percentage: 0.9,
        difference: 1539
      }
    },
    {
      name: 'Expense',
      amount: 12839,
      percentageChange: {
        isPositive: false,
        timePeriod: 'weekly',
        percentage: 0.1,
        difference: 1539
      }
    }
  ];

  const userId = process.env.TEMP_USER_ID!;

  const { startDate: lastWeekStartDate, endDate: lastWeekEndDate } =
    getLastWeekStartAndEndDates();

  const { startDate: lastMonthStartDate, endDate: lastMonthEndDate } =
    getLastMonthStartAndEndDates();

  const { startDate: thisWeekStartDate, endDate: thisWeekEndDate } =
    getThisWeekStartAndEndDates();

  const dateNow = new Date();

  console.log('---------------------------------------');
  console.log('LW start: ', lastWeekStartDate.toLocaleString());
  console.log('LW end: ', lastWeekEndDate.toLocaleString());
  console.log('---------------------------------------');
  console.log('LM start : ', lastMonthStartDate.toLocaleString());
  console.log('LM end   : ', lastMonthEndDate.toLocaleString());
  console.log('---------------------------------------');
  console.log('TW start : ', thisWeekStartDate.toLocaleString());
  console.log('TW end   : ', thisWeekEndDate.toLocaleString());
  console.log('---------------------------------------');
  console.log('Date now : ', dateNow.toLocaleString());
  console.log('---------------------------------------');

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
                    <Balance.Compact
                      title={item.name}
                      amount={item.amount}
                      percentageChange={item.percentageChange}
                    />
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
            <Balance.Compact
              title={balances[0].name}
              amount={balances[0].amount}
              percentageChange={balances[0].percentageChange}
            />
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
