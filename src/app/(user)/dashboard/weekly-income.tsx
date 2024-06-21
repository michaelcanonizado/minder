import Chart from '@/components/sections/chart';
import { getIncomesGraphData } from '@/lib/income/get-incomes-graph-data';

const WeeklyIncome = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getIncomesGraphData(userId, 'weekly');

  console.log(data);

  return (
    <Chart.Area data={data} index='transactionDate' categories={['amount']} />
  );
};

export default WeeklyIncome;
