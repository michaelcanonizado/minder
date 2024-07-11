import { cn } from '@/lib/utils';
import { getCategoriesChartData } from '@/lib/category/get-categories-chart-data';
import { CategoryChartData, Period } from '@/types';
import { columns } from './_columns/categories';

import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import Table from '@/components/sections/table';
import Form from '@/components/sections/form';
import { match } from 'assert';

const Categories = async ({
  className,
  selectedIncomeCategoriesId,
  selectedExpenseCategoriesId,
  period
}: {
  className?: string;
  selectedIncomeCategoriesId: string[];
  selectedExpenseCategoriesId: string[];
  period: Period;
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const data = await getCategoriesChartData(userId, period);

  const expenseCategoriesChartData = data.expense.map(category => {
    return {
      amount: category.rows.length,
      color: category.color.code.primary,
      name: category.name
    };
  });
  const incomeCategoriesChartData = data.income.map(category => {
    return {
      amount: category.rows.length,
      color: category.color.code.primary,
      name: category.name
    };
  });

  const selectedIncomeCategories = selectedIncomeCategoriesId
    .map(selectedCategoryId => {
      const matchedCategory = data.income.find(category => {
        if (category._id === selectedCategoryId) {
          return category;
        }
      });
      if (matchedCategory) {
        return matchedCategory;
      }
    })
    .filter(item => {
      if (item) {
        return item;
      }
    }) as CategoryChartData[];
  const selectedExpenseCategories = selectedExpenseCategoriesId
    .map(selectedCategoryId => {
      const matchedCategory = data.expense.find(category => {
        if (category._id === selectedCategoryId) {
          return category;
        }
      });
      if (matchedCategory) {
        return matchedCategory;
      }
    })
    .filter(item => {
      if (item) {
        return item;
      }
    }) as CategoryChartData[];

  return (
    <Bento.Box className={cn('space-y-4 !pb-4', className)}>
      <Bento.Box.Header>
        <p className='text-heading-100'>Categories</p>
      </Bento.Box.Header>

      <Bento.Box.Content className='flex flex-col space-y-4 px-0'>
        <div className='px-4'>
          <div className='mb-2'>
            <p className='text-heading-200'>Income</p>
          </div>

          <Chart.Progress.Stacked items={incomeCategoriesChartData} />
        </div>

        <Table
          columns={columns}
          data={data.income}
          queryString='selectedIncomeCategories'
          selectedRows={selectedIncomeCategories}
          rowActions={[
            <Form.Delete.Categories
              type='income'
              selectedCategories={selectedIncomeCategories}
            />
          ]}
        />

        <Form.Add.Category type='income' className='!mx-4 !mt-2' />
      </Bento.Box.Content>

      <Bento.Box.Content className='flex flex-col space-y-4 p-0'>
        <div className='px-4'>
          <div className='mb-2'>
            <p className='text-heading-200'>Expense</p>
          </div>

          <Chart.Progress.Stacked items={expenseCategoriesChartData} />
        </div>

        <Table
          columns={columns}
          data={data.expense}
          queryString='selectedExpenseCategories'
          selectedRows={selectedExpenseCategories}
          rowActions={[
            <Form.Delete.Categories
              type='expense'
              selectedCategories={selectedExpenseCategories}
            />
          ]}
        />

        <Form.Add.Category type='expense' className='!mx-4 !mt-2' />
      </Bento.Box.Content>
    </Bento.Box>
  );
};

export default Categories;
