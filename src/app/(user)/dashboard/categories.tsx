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
  selectedCategories,
  period
}: {
  className?: string;
  selectedCategories: string[];
  period: Period;
}) => {
  const userId = process.env.NEXT_PUBLIC_TEMP_USER_ID!;

  const data = await getCategoriesChartData(userId, period);

  const expenseCategoriesChartData = data.expense.map(category => {
    return {
      amount: category.rows.length,
      color: category.color.code.primary
    };
  });
  const incomeCategoriesChartData = data.income.map(category => {
    return {
      amount: category.rows.length,
      color: category.color.code.primary
    };
  });

  const selectedIncomeCategories = selectedCategories
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

  console.log(selectedIncomeCategories);

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
          queryString='selectedIncomeCategories'
          rowActions={[
            <Form.Delete.Categories
              type='income'
              selectedCategories={selectedIncomeCategories}
            />
          ]}
        />

        <Form.Add.Category type='income' />
      </Bento.Box.Content>

      {/* <Bento.Box.Content className='flex flex-col space-y-4'>
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
      </Bento.Box.Content> */}
    </Bento.Box>
  );
};

export default Categories;
