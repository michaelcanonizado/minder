import Chart from '@/components/sections/chart';
import { getExpensesGraphData } from '@/lib/expense/get-expenses-graph-data';

const WeeklyExpense = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getExpensesGraphData(userId, 'weekly');

  console.log(data);

  return (
    <Chart.Area data={data} index='transactionDate' categories={['amount']} />
  );
};

export default WeeklyExpense;
