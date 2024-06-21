import Chart from '@/components/sections/chart';
import { getExpensesChartData } from '@/lib/expense/get-expenses-chart-data';
import { format } from 'date-fns';

const MonthlyExpense = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getExpensesChartData(userId, 'monthly');

  return (
    <>
      <Chart.Area data={data} index='date' categories={['amount']} />
      <div className='flex flex-row justify-between px-4 pb-4 pt-8'>
        <Chart.Label>{format(data[0].date, 'E, MMM d, yyyy')}</Chart.Label>
        <Chart.Label>
          {format(data[data.length - 1].date, 'E, MMM d, yyyy')}
        </Chart.Label>
      </div>
    </>
  );
};

export default MonthlyExpense;
