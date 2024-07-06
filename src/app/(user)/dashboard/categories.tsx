'use client';

import { useEffect, useState } from 'react';

import { useDashboardContext } from '@/context/dashboard';

import { cn } from '@/lib/utils';
import { getCategoriesChartData } from '@/lib/category/get-categories-chart-data';
import { columns } from './_columns/categories';

import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import Table, { DataTable } from '@/components/sections/table';
import { Button } from '@/components/ui/button';
import Form from '@/components/sections/form';
import { Table as TanstackTable } from '@tanstack/react-table';
import { CategoryChartData, categoryColors } from '@/types';

const Categories = ({ className }: { className?: string }) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const { dashboard, changeDashboardSelectedCategories } =
    useDashboardContext();

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
      color: category.color.code.primary
    };
  });
  const incomeCategoriesChartData = data.income!.map(category => {
    return {
      amount: category.rows.length,
      color: category.color.code.primary
    };
  });

  const incomeCategoriesDeleteCTA = (
    <div className='pt-4'>
      <Form.Delete.Categories type='income' />
    </div>
  );
  const incomeOnSubmit = (data: CategoryChartData[]) => {
    changeDashboardSelectedCategories(data, 'income');
  };

  const expenseCategoriesDeleteCTA = (
    <div className='pt-4'>
      <Form.Delete.Categories type='expense' />
    </div>
  );
  const expenseOnSubmit = (data: CategoryChartData[]) => {
    changeDashboardSelectedCategories(data, 'expense');
  };

  return (
    <Bento.Box className={cn('', className)}>
      <Bento.Box.Header>
        <p className='text-heading-100'>Categories</p>
      </Bento.Box.Header>

      <Bento.Box.Content className='mt-4 flex flex-col space-y-4'>
        <div className='mb-2'>
          <p className='text-heading-200'>Income</p>
        </div>

        <Chart.Progress.Stacked items={incomeCategoriesChartData} />

        <Table
          columns={columns}
          data={data.income}
          deleteCTA={incomeCategoriesDeleteCTA}
          passSelectedRowsToParent={incomeOnSubmit}
        />
      </Bento.Box.Content>

      <Bento.Box.Content className='flex flex-col space-y-4'>
        <div className='mb-2'>
          <p className='text-heading-200'>Expense</p>
        </div>

        <Chart.Progress.Stacked items={expenseCategoriesChartData} />

        <Table
          columns={columns}
          data={data.expense}
          deleteCTA={expenseCategoriesDeleteCTA}
          passSelectedRowsToParent={expenseOnSubmit}
        />
      </Bento.Box.Content>
    </Bento.Box>
  );
};

export default Categories;
