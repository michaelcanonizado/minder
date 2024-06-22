import { getNetAmountChartData } from '@/lib/balance/get.net-amount-chart-data';

const NetAmount = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getNetAmountChartData(userId, 'monthly');

  return <div>NetAmount</div>;
};

export default NetAmount;
