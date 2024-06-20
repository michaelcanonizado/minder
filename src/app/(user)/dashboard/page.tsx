import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ArrowDown, ArrowUp } from 'lucide-react';
import Balance from '@/components/sections/balance';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import { getBalanceData } from '@/lib/get-balance-data';
import { getPercentageChange } from '@/helpers/get-percentage-change';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import NetAmount from './net-amount';
import WeeklyIncome from './weekly-income';
import WeeklyExpense from './weekly-expense';
import MonthlyIncome from './monthly-income';
import MonthlyExpense from './monthly-expense';

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
  graph: React.ReactNode;
};

const Dashboard = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const walletsBalanceData = await getBalanceData(userId);

  if (!walletsBalanceData) {
    return <h1 className='text-display'>User was not found!</h1>;
  }

  const netAmountPercentageChange = getPercentageChange(
    walletsBalanceData.net.total.lastWeek,
    walletsBalanceData.net.total.current
  );
  const incomeThisWeekPercentageChange = getPercentageChange(
    walletsBalanceData.income.period.lastWeek,
    walletsBalanceData.income.period.thisWeek
  );
  const expenseThisWeekPercentageChange = getPercentageChange(
    walletsBalanceData.expense.period.lastWeek,
    walletsBalanceData.expense.period.thisWeek
  );
  const incomeThisMonthPercentageChange = getPercentageChange(
    walletsBalanceData.income.period.lastMonth,
    walletsBalanceData.income.period.thisMonth
  );
  const expenseThisMonthPercentageChange = getPercentageChange(
    walletsBalanceData.expense.period.lastMonth,
    walletsBalanceData.expense.period.thisMonth
  );

  const balances: BalanceType[] = [
    {
      tabName: 'Net Amount',
      header: 'Net Amount',
      amount: walletsBalanceData.net.total.current,
      percentageChange: {
        percentage: netAmountPercentageChange,
        isPositive: netAmountPercentageChange > 0 ? true : false,
        difference:
          walletsBalanceData.net.total.current -
          walletsBalanceData.net.total.lastWeek,
        timePeriod: 'weekly'
      },
      graph: <NetAmount />
    },
    {
      tabName: 'Income (weekly)',
      header: 'Income this week',
      amount: walletsBalanceData.income.period.thisWeek,
      percentageChange: {
        percentage: incomeThisWeekPercentageChange,
        isPositive: incomeThisWeekPercentageChange > 0 ? true : false,
        difference:
          walletsBalanceData.income.period.thisWeek -
          walletsBalanceData.income.period.lastWeek,
        timePeriod: 'weekly'
      },
      graph: <WeeklyIncome />
    },
    {
      tabName: 'Expense (weekly)',
      header: 'Expenses this week',
      amount: walletsBalanceData.expense.period.thisWeek,
      percentageChange: {
        percentage: expenseThisWeekPercentageChange,
        isPositive: expenseThisWeekPercentageChange >= 0 ? false : true,
        difference:
          walletsBalanceData.expense.period.thisWeek -
          walletsBalanceData.expense.period.lastWeek,
        timePeriod: 'weekly'
      },
      graph: <WeeklyExpense />
    },
    {
      tabName: 'Income (monthly)',
      header: 'Income this month',
      amount: walletsBalanceData.income.period.thisMonth,
      percentageChange: {
        percentage: incomeThisMonthPercentageChange,
        isPositive: incomeThisMonthPercentageChange > 0 ? true : false,
        difference:
          walletsBalanceData.income.period.thisMonth -
          walletsBalanceData.income.period.lastMonth,
        timePeriod: 'monthly'
      },
      graph: <MonthlyIncome />
    },
    {
      tabName: 'Expense (monthly)',
      header: 'Expenses this month',
      amount: walletsBalanceData.expense.period.thisMonth,
      percentageChange: {
        percentage: expenseThisMonthPercentageChange,
        isPositive: expenseThisMonthPercentageChange >= 0 ? false : true,
        difference:
          walletsBalanceData.expense.period.thisMonth -
          walletsBalanceData.expense.period.lastMonth,
        timePeriod: 'monthly'
      },
      graph: <MonthlyExpense />
    }
  ];

  return (
    <div className='px-8'>
      <Bento className='grid-cols-1'>
        <Bento.Box>
          <Tabs defaultValue={balances[0].tabName} className='w-full'>
            <ScrollArea className='bg-muted py-1'>
              <TabsList className='w-full rounded-b-none'>
                {balances.map(item => {
                  return (
                    <TabsTrigger
                      value={item.tabName}
                      className='min-w-[150px] grow'
                    >
                      {item.tabName}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              <ScrollBar
                orientation='horizontal'
                thumbClassName='bg-background/80'
                className=''
              />
            </ScrollArea>
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
                    {item.graph}
                    {/* <Chart.Line.Minimal /> */}
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
