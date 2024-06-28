import { PeriodDates } from '@/types';

/**
 * Gets the start and end date of this week
 *
 * @returns start(Monday, 12:00:000AM) and end(Sunday,
 * 11:59:999PM) dates
 */
export const getThisWeekStartAndEndDates = (): PeriodDates => {
  const now = new Date();
  const today = now.getDay();

  /* Calculate the start date of this week */
  const startDate = new Date(now);
  /* Offset when today is Sunday */
  startDate.setDate(now.getDate() - today + (today === 0 ? -6 : 1));
  startDate.setHours(0, 0, 0, 0);

  /* Calculate the end date */
  const endDate = new Date(startDate);
  /* Add 6 days to the start date(monday) to get
  Sunday*/
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return {
    startDate,
    endDate
  };
};
