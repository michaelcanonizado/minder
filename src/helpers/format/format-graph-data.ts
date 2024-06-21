import { UserCurrencyType } from '@/models/user';
import { format } from 'date-fns';

interface DataType {
  amount: number;
  date: Date;
}

export const formatGraphData = (
  data: DataType[],
  currency: UserCurrencyType
) => {
  const result = data.map(item => {
    return {
      item: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.code
      }).format(item.amount),
      data: format(item.date, 'E, MMM d, yyyy')
    };
  });

  return result;
};
