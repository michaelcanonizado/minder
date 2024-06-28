import { format } from 'date-fns';

/**
 * Formats the Date object property of an array
 * of objects.
 *
 * @param data array of objects with a date:Date property
 * @returns the array but with formatted dates
 */
export const formatChartDataDateProperties = <
  T extends {
    [key: string]: any;
    date: Date;
  }
>(
  data: T[]
) => {
  const result = data.map(item => {
    return {
      ...item,
      date: format(item.date, 'E, MMM d, yyyy')
    };
  });

  return result as (Omit<T, 'date'> & { date: string })[];
};
