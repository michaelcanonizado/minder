import { UserCurrencyType } from '@/models/user';

/**
 * Adds currency code/symbol to a number
 *
 * @param value number to be formatted
 * @returns the number with the currency code
 */
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
