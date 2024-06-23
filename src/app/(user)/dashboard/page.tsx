import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ArrowDown, ArrowUp } from 'lucide-react';

import Balance from '@/components/sections/balance';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';

import NetAmount from './net-amount';
import WeeklyIncome from './weekly-income';
import WeeklyExpense from './weekly-expense';
import MonthlyIncome from './monthly-income';
import MonthlyExpense from './monthly-expense';

import { getBalanceData } from '@/lib/balance/get-balance-data';
import { getPercentageChange } from '@/helpers/get-percentage-change';

import { DashboardContextProvider } from '@/context/dashboard-context';

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

  const balanceData = await getBalanceData(userId);

  if (!balanceData) {
    return <h1 className='text-display'>User was not found!</h1>;
  }

  const netAmountPercentageChange = getPercentageChange(
    balanceData.net.total.lastWeek,
    balanceData.net.total.current
  );
  const incomeThisWeekPercentageChange = getPercentageChange(
    balanceData.income.period.lastWeek,
    balanceData.income.period.thisWeek
  );
  const expenseThisWeekPercentageChange = getPercentageChange(
    balanceData.expense.period.lastWeek,
    balanceData.expense.period.thisWeek
  );
  const incomeThisMonthPercentageChange = getPercentageChange(
    balanceData.income.period.lastMonth,
    balanceData.income.period.thisMonth
  );
  const expenseThisMonthPercentageChange = getPercentageChange(
    balanceData.expense.period.lastMonth,
    balanceData.expense.period.thisMonth
  );

  const balances: BalanceType[] = [
    {
      tabName: 'Net Amount',
      header: 'Net Amount',
      amount: balanceData.net.total.current,
      percentageChange: {
        percentage: netAmountPercentageChange,
        isPositive: netAmountPercentageChange > 0 ? true : false,
        difference:
          balanceData.net.total.current - balanceData.net.total.lastWeek,
        timePeriod: 'weekly'
      },
      graph: <NetAmount />
    },
    {
      tabName: 'Income (weekly)',
      header: 'Income this week',
      amount: balanceData.income.period.thisWeek,
      percentageChange: {
        percentage: incomeThisWeekPercentageChange,
        isPositive: incomeThisWeekPercentageChange > 0 ? true : false,
        difference:
          balanceData.income.period.thisWeek -
          balanceData.income.period.lastWeek,
        timePeriod: 'weekly'
      },
      graph: <WeeklyIncome />
    },
    {
      tabName: 'Expense (weekly)',
      header: 'Expenses this week',
      amount: balanceData.expense.period.thisWeek,
      percentageChange: {
        percentage: expenseThisWeekPercentageChange,
        isPositive: expenseThisWeekPercentageChange >= 0 ? false : true,
        difference:
          balanceData.expense.period.thisWeek -
          balanceData.expense.period.lastWeek,
        timePeriod: 'weekly'
      },
      graph: <WeeklyExpense />
    },
    {
      tabName: 'Income (monthly)',
      header: 'Income this month',
      amount: balanceData.income.period.thisMonth,
      percentageChange: {
        percentage: incomeThisMonthPercentageChange,
        isPositive: incomeThisMonthPercentageChange > 0 ? true : false,
        difference:
          balanceData.income.period.thisMonth -
          balanceData.income.period.lastMonth,
        timePeriod: 'monthly'
      },
      graph: <MonthlyIncome />
    },
    {
      tabName: 'Expense (monthly)',
      header: 'Expenses this month',
      amount: balanceData.expense.period.thisMonth,
      percentageChange: {
        percentage: expenseThisMonthPercentageChange,
        isPositive: expenseThisMonthPercentageChange >= 0 ? false : true,
        difference:
          balanceData.expense.period.thisMonth -
          balanceData.expense.period.lastMonth,
        timePeriod: 'monthly'
      },
      graph: <MonthlyExpense />
    }
  ];

  return (
    <div className='px-8'>
      <DashboardContextProvider>
        <Bento className='grid-cols-1'>
          <Bento.Box>
            <Tabs defaultValue={balances[0].tabName} className='w-full'>
              {balances.map(item => {
                return (
                  <TabsContent value={item.tabName}>
                    <Bento.Box.Header className='border-none'>
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
                    <Bento.Box.Content className='p-0'>
                      {item.graph}
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
      </DashboardContextProvider>
    </div>
  );
};

export default Dashboard;
