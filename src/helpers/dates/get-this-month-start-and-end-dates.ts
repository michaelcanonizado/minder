import { PeriodDates } from '@/types';

/**
 * Gets the start and end dates of this month
 *
 * @returns start and end dates
 */
export const getThisMonthStartAndEndDates = (): PeriodDates => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  /* Calculate the first day of the current month */
  const firstDayOfMonth = new Date(year, month, 1);
  /* Set time to 12:00:000 AM */
  firstDayOfMonth.setHours(0, 0, 0, 0);

  /* Calculate the last day of the current month */
  const lastDayOfMonth = new Date(year, month + 1, 0);
  /* Set time to 11:59:999 PM */
  lastDayOfMonth.setHours(23, 59, 59, 999);

  return {
    startDate: firstDayOfMonth,
    endDate: lastDayOfMonth
  };
};
