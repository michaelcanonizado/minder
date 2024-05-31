import { Expense, Income, WalletTransfer } from '../data';

export const getTransactions = (
  collection: Expense[] | Income[] | WalletTransfer[],
  targetUserId: string
) => {
  const filteredTransactions = collection.filter(item => {
    if (item.userId == targetUserId) {
      return item;
    }
  });

  return filteredTransactions as typeof collection;
};
