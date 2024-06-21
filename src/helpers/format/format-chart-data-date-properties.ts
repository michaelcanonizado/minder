import { format } from 'date-fns';

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
