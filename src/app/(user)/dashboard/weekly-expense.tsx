import Chart from '@/components/sections/chart';
import { getExpensesGraphData } from '@/lib/expense/get-expenses-graph-data';
import { format } from 'date-fns';

const WeeklyExpense = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getExpensesGraphData(userId, 'weekly');

  return (
    <>
      <Chart.Area data={data} index='transactionDate' categories={['amount']} />
      <div className='flex flex-row justify-between px-4 pb-4 pt-8'>
        <Chart.Label>
          {format(data[0].transactionDate, 'E, MMM d, yyyy')}
        </Chart.Label>
        <Chart.Label>
          {format(data[data.length - 1].transactionDate, 'E, MMM d, yyyy')}
        </Chart.Label>
      </div>
    </>
  );
};

export default WeeklyExpense;
