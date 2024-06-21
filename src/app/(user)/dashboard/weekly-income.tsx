import Chart from '@/components/sections/chart';
import { getIncomesWeekly } from '@/lib/income/get-incomes-weekly';

const WeeklyIncome = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getIncomesWeekly(userId);

  console.log(data);

  return (
    <Chart.Area data={data} index='transactionDate' categories={['amount']} />
  );
};

export default WeeklyIncome;
