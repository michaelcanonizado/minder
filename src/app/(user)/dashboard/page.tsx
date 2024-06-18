import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ArrowDown, ArrowUp } from 'lucide-react';
import Balance from '@/components/sections/balance';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import { getBalanceData } from '@/lib/get-balance-data';
import { getPercentageChange } from '@/helpers/get-percentage-change';

type BalanceType = {
  tabName: string;
  header: string;
  amount: number;
  percentageChange: {
    percentage: number;
    difference: number;
    isPositive: boolean;
    timePeriod: 'weekly' | 'monthly';
  };
};

const Dashboard = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getBalanceData(userId);

  console.log('---------------------------------------');
  console.log(data);
  ('---------------------------------------');

  if (!data) {
    return <h1 className='text-display'>User was not found!</h1>;
  }

  const netAmountPercentageChange = getPercentageChange(
    data.net.total.lastWeek,
    data.net.total.current
  );
  const incomeThisWeekPercentageChange = getPercentageChange(
    data.income.period.lastWeek,
    data.income.period.thisWeek
  );
  const expenseThisWeekPercentageChange = getPercentageChange(
    data.expense.period.lastWeek,
    data.expense.period.thisWeek
  );

  const balances: BalanceType[] = [
    {
      tabName: 'Net Amount',
      header: 'Net Amount',
      amount: data.net.total.current,
      percentageChange: {
        percentage: netAmountPercentageChange,
        isPositive: netAmountPercentageChange > 0 ? true : false,
        difference: data.net.total.current - data.net.total.lastWeek,
        timePeriod: 'weekly'
      }
    },
    {
      tabName: 'Income (weekly)',
      header: 'Income this week',
      amount: data.income.period.thisWeek,
      percentageChange: {
        percentage: incomeThisWeekPercentageChange,
        isPositive: incomeThisWeekPercentageChange > 0 ? true : false,
        difference: data.income.period.thisWeek - data.income.period.lastWeek,
        timePeriod: 'weekly'
      }
    },
    {
      tabName: 'Expense (weekly)',
      header: 'Expenses this week',
      amount: data.expense.period.thisWeek,
      percentageChange: {
        percentage: expenseThisWeekPercentageChange,
        isPositive: expenseThisWeekPercentageChange >= 0 ? false : true,
        difference: data.expense.period.thisWeek - data.expense.period.lastWeek,
        timePeriod: 'weekly'
      }
    }
  ];

  const amount = 3000;
  const difference = 1500;

  return (
    <div className='px-8'>
      <Bento className='grid-cols-1'>
        <Bento.Box>
          <Tabs defaultValue='Total' className='w-full'>
            <TabsList className='w-full rounded-b-none'>
              {balances.map(item => {
                return (
                  <TabsTrigger value={item.tabName} className='grow'>
                    {item.tabName}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {balances.map(item => {
              return (
                <TabsContent value={item.tabName}>
                  <Bento.Box.Header>
                    <Balance.Compact>
                      <Balance.Compact.Header>
                        {item.header}
                      </Balance.Compact.Header>
                      <Balance.Compact.Amount>
                        {' '}
                        $
                        {item.amount.toLocaleString('en-US', {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2
                        })}
                      </Balance.Compact.Amount>
                      <Balance.Compact.SubHeader>
                        <span
                          className={`flex flex-row ${item.percentageChange.isPositive ? 'text-accent-100' : 'text-accent-200'}`}
                        >
                          {item.percentageChange.difference.toLocaleString(
                            'en-US',
                            {
                              signDisplay: 'always'
                            }
                          )}
                          &nbsp; (
                          {item.percentageChange.percentage > 0 ? (
                            <ArrowUp className='h-fit w-[14px]' />
                          ) : (
                            <ArrowDown className='h-fit w-[14px]' />
                          )}
                          {` ${item.percentageChange.percentage}%`})
                        </span>
                        &nbsp;
                        {item.percentageChange.timePeriod === 'weekly'
                          ? 'vs last week'
                          : 'vs last month'}
                      </Balance.Compact.SubHeader>
                    </Balance.Compact>
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
  );
};

export default Dashboard;
