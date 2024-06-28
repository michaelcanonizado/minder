import { PeriodDates } from '@/types';

/**
 * Gets the start and end dates of last year
 *
 * @returns start(Jan 1, 12:00:000AM) and end(Dec 31,
 * 11:59:999PM) dates
 */
export const getLastYearStartAndEndDates = (): PeriodDates => {
  const now = new Date();

  const startDate = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0);

  const endDate = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);

  return {
    startDate: startDate,
    endDate: endDate
  };
};
