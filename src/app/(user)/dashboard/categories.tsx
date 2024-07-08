'use client';

import { useEffect, useState } from 'react';
import { useDashboardContext } from '@/context/dashboard';

import { cn } from '@/lib/utils';
import { getCategoriesChartData } from '@/lib/category/get-categories-chart-data';
import { CategoryChartData } from '@/types';
import { columns } from './_columns/categories';

import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import Table from '@/components/sections/table';
import Form from '@/components/sections/form';

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

  const incomeOnRowsSelected = (data: CategoryChartData[]) => {
    changeDashboardSelectedCategories(data, 'income');
  };
  const expenseOnRowsSelected = (data: CategoryChartData[]) => {
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
          rowActions={[
            <Form.Delete.Categories
              type='income'
              selectedCategories={dashboard.selectedCategories.income}
            />
          ]}
          passSelectedRowsToParent={incomeOnRowsSelected}
        />

        <Form.Add.Category type='income' />
      </Bento.Box.Content>

      <Bento.Box.Content className='flex flex-col space-y-4'>
        <div className='mb-2'>
          <p className='text-heading-200'>Expense</p>
        </div>

        <Chart.Progress.Stacked items={expenseCategoriesChartData} />

        <Table
          columns={columns}
          data={data.expense}
          rowActions={[
            <Form.Delete.Categories
              type='expense'
              selectedCategories={dashboard.selectedCategories.income}
            />
          ]}
          passSelectedRowsToParent={expenseOnRowsSelected}
        />

        <Form.Add.Category type='expense' />
      </Bento.Box.Content>
    </Bento.Box>
  );
};

export default Categories;
