import { PeriodDates } from '@/types';

/**
 * Gets the start and end date of last week
 *
 * @returns start(Monday, 12:00:000AM) and end(Sunday,
 * 11:59:999PM) dates
 */
export const getLastWeekStartAndEndDates = (): PeriodDates => {
  const now = new Date();
  const currentDayOfWeek = now.getDay();

  /* Calculate the start date of last week */
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - currentDayOfWeek - 6);
  startDate.setHours(0, 0, 0, 0);

  /* Calculate the end date of last week */
  const endDate = new Date(now);
  endDate.setDate(now.getDate() - currentDayOfWeek);
  endDate.setHours(23, 59, 59, 999);

  /* If today is Sunday, offset the dates */
  if (currentDayOfWeek === 0) {
    startDate.setDate(startDate.getDate() - 7);
    endDate.setDate(endDate.getDate() - 7);
  }

  return { startDate, endDate };
};
