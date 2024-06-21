import Chart from '@/components/sections/chart';
import { getIncomesChartData } from '@/lib/income/get-incomes-chart-data';
import { formatChartDataDateProperties } from '@/helpers/format/format-chart-data-date-properties';

const MonthlyIncome = async () => {
  const userId = process.env.TEMP_USER_ID!;

  const data = await getIncomesChartData(userId, 'monthly');

  const formattedData = formatChartDataDateProperties(data);

  return (
    <>
      <Chart.Area data={formattedData} index='date' categories={['amount']} />
      <div className='flex flex-row justify-between px-4 pb-4 pt-8'>
        <Chart.Label>{formattedData[0].date}</Chart.Label>
        <Chart.Label>
          {formattedData[formattedData.length - 1].date}
        </Chart.Label>
      </div>
    </>
  );
};

export default MonthlyIncome;
