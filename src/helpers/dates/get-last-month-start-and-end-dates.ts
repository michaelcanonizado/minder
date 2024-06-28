import { PeriodDates } from '@/types';

/**
 * Gets the start and end dates of last month
 *
 * @returns start and end dates
 */
export const getLastMonthStartAndEndDates = (): PeriodDates => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  /* Calculate the first day of the previous month */
  const firstDayOfLastMonth = new Date(year, month - 1, 1);
  /* Set time to 12:00:00AM */
  firstDayOfLastMonth.setHours(0, 0, 0, 0);

  /* Calculate the last day of the previous month */
  const lastDayOfLastMonth = new Date(year, month, 0);
  /* Set time to 11:59:999PM */
  lastDayOfLastMonth.setHours(23, 59, 59, 999);

  return {
    startDate: firstDayOfLastMonth,
    endDate: lastDayOfLastMonth
  };
};
