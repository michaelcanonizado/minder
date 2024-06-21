import { UserCurrencyType } from '@/models/user';

export const formatCurrency = (value: number) => {
  if (!value) {
    return '';
  }

  const currency: UserCurrencyType = {
    code: 'PHP',
    name: 'Philippine Peso'
  };

  const result = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code
  }).format(value);

  return result;
};
