'use server';

import User from '@/models/user';
import { getLastWeekSundayDate } from '@/helpers/getLastWeekSundayDate';
import { databaseClose, databaseConnect } from '@/helpers/database';

export const getBalanceData = async (userId: string) => {
  await databaseConnect();

  const lastWeekSundayDate = getLastWeekSundayDate();

  const user = await User.findById(userId).exec();
  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log('User found!');

  const balanceSnapshot = user.snapshots.find(snapshot => {
    if (snapshot.snapshotDateLimit.getTime() === lastWeekSundayDate.getTime()) {
      return snapshot;
    }
  });

  if (!balanceSnapshot) {
    console.log('No snapshot of last week!');
    console.log('Creating new snapshot...');
  }

  console.log(user.snapshots);
  console.log(balanceSnapshot);

  await databaseClose();
  return {
    totalBalance: {
      current: user.balance.totalBalance,
      lastWeek: balanceSnapshot?.balance.totalBalance
    },
    totalIncome: {
      current: user.balance.totalIncome,
      lastWeek: balanceSnapshot?.balance.totalIncome
    },
    totalExpense: {
      current: user.balance.totalExpense,
      lastWeek: balanceSnapshot?.balance.totalExpense
    }
  };
};
