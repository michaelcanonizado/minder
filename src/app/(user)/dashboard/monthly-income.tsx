import Chart from '@/components/sections/chart';
import { getIncomesGraphData } from '@/lib/income/get-incomes-graph-data';

const MonthlyIncome = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getIncomesGraphData(userId, 'monthly');

  return (
    <Chart.Area data={data} index='transactionDate' categories={['amount']} />
  );
};

export default MonthlyIncome;
