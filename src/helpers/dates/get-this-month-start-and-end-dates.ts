import { PeriodDates } from '@/types';

export const getThisMonthStartAndEndDates = (): PeriodDates => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Calculate the first day of the current month
  const firstDayOfMonth = new Date(year, month, 1);
  // Set time to 12:00 AM
  firstDayOfMonth.setHours(0, 0, 0, 0);

  // Calculate the last day of the current month
  const lastDayOfMonth = new Date(year, month + 1, 0);
  // Set time to 11:59 PM
  lastDayOfMonth.setHours(23, 59, 59, 999);

  return {
    startDate: firstDayOfMonth,
    endDate: lastDayOfMonth
  };
};
