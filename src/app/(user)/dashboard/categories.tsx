import { cn } from '@/lib/utils';
import { getCategoriesChartData } from '@/lib/category/get-categories-chart-data';
import { Period } from '@/types';
import { columns } from './_columns/categories';

import Bento from '@/components/sections/bento';
import Chart from '@/components/sections/chart';
import Table from '@/components/sections/table';
import Form from '@/components/sections/form';

const Categories = async ({
  className,
  selectedIncomeCategoryIds,
  selectedExpenseCategoryIds,
  period
}: {
  className?: string;
  selectedIncomeCategoryIds: string[];
  selectedExpenseCategoryIds: string[];
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
          selectedRows={selectedIncomeCategoryIds}
          rowActions={[
            <Form.Delete.Categories
              type='income'
              selectedCategoryIds={selectedIncomeCategoryIds}
              tableData={data.income}
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
          selectedRows={selectedExpenseCategoryIds}
          rowActions={[
            <Form.Delete.Categories
              type='expense'
              selectedCategoryIds={selectedExpenseCategoryIds}
              tableData={data.expense}
            />
          ]}
        />

        <Form.Add.Category type='expense' className='!mx-4 !mt-2' />
      </Bento.Box.Content>
    </Bento.Box>
  );
};

export default Categories;
