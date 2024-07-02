'use client';

import { useEffect, useState } from 'react';

import { useDashboardContext } from '@/context/dashboard-context';

import { cn } from '@/lib/utils';
import { getCategoriesChartData } from '@/lib/category/get-categories-chart-data';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';

const Categories = ({ className }: { className?: string }) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  const [data, setData] = useState<Awaited<
    ReturnType<typeof getCategoriesChartData>
  > | null>(null);

  useEffect(() => {
    const getData = async () => {
      const result = await getCategoriesChartData(userId, dashboard.period);
      setData(result);
      console.log(result);
    };
    getData();
  }, [dashboard]);

  if (!data) {
    return <div className=''>No categories data</div>;
  }

  const expenseCategoriesChartData = data.expense!.map(category => {
    return {
      amount: category.rows.length,
      color: category.color
    };
  });
  const incomeCategoriesChartData = data.income!.map(category => {
    return {
      amount: category.rows.length,
      color: category.color
    };
  });

  const totalIncomeTransactionsCount = data.income!.reduce((sum, item) => {
    return sum + item.rows.length;
  }, 0);
  const totalExpenseTransactionsCount = data.expense!.reduce((sum, item) => {
    return sum + item.rows.length;
  }, 0);

  console.log(expenseCategoriesChartData);

  return (
    <Bento.Box className={cn('', className)}>
      <Bento.Box.Header>
        <p className='text-heading-100'>Categories</p>
      </Bento.Box.Header>

      <Bento.Box.Content className='mt-4 flex flex-col'>
        <div className='mb-4'>
          <p className='text-heading-200'>Income</p>
        </div>

        <Chart.Progress.Stacked items={incomeCategoriesChartData} />

        <Table className='mt-4'>
          <TableHeader>
            <TableRow className='text-body-200 w-full capitalize'>
              <TableHead className=''>Category</TableHead>
              <TableHead className='w-[100px]'>% of total</TableHead>
              <TableHead className='w-[100px] max-w-max text-right'>
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.income?.map(item => {
              const amount = item.amount.toLocaleString('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0
              });

              const percentage = totalIncomeTransactionsCount
                ? (
                    (item.rows.length / totalIncomeTransactionsCount) *
                    100
                  ).toFixed(2)
                : 0;

              const name = item.name;
              const color = item.color;

              return (
                <TableRow className='[&>*]:py-2' key={item._id}>
                  <TableCell>
                    <p
                      className='text-body-200 w-fit rounded-full bg-accent/50 px-2 py-1 capitalize'
                      style={{
                        color: color
                      }}
                    >
                      {name}
                    </p>
                  </TableCell>
                  <TableCell className='text-body-200 text-right  text-muted-foreground'>
                    {percentage}%
                  </TableCell>
                  <TableCell className='text-body-200 text-right text-muted-foreground'>
                    ${amount}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Bento.Box.Content>

      <Bento.Box.Content className='flex flex-col'>
        <div className='mb-4'>
          <p className='text-heading-200'>Expense</p>
        </div>

        <Chart.Progress.Stacked items={expenseCategoriesChartData} />

        <Table className='mt-4'>
          <TableHeader>
            <TableRow className='text-body-200 w-full capitalize'>
              <TableHead className=''>Category</TableHead>
              <TableHead className='w-[100px]'>% of total</TableHead>
              <TableHead className='w-[100px] max-w-max text-right'>
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.expense?.map(item => {
              const amount = item.amount.toLocaleString('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0
              });

              const percentage = totalExpenseTransactionsCount
                ? (
                    (item.rows.length / totalExpenseTransactionsCount) *
                    100
                  ).toFixed(2)
                : 0;

              const name = item.name;
              const color = item.color;

              return (
                <TableRow className='[&>*]:py-2' key={item._id}>
                  <TableCell>
                    <p
                      className='text-body-200 w-fit rounded-full bg-accent/50 px-2 py-1 capitalize'
                      style={{
                        color: color
                      }}
                    >
                      {name}
                    </p>
                  </TableCell>
                  <TableCell className='text-body-200 text-right  text-muted-foreground'>
                    {percentage}%
                  </TableCell>
                  <TableCell className='text-body-200 text-right text-muted-foreground'>
                    ${amount}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Bento.Box.Content>
    </Bento.Box>
  );
};

export default Categories;
