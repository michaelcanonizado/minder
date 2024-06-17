import { getLastWeekDateLimit } from '@/helpers/get-last-week-date-limit';
import { databaseClose, databaseConnect } from '@/helpers/database';
import User from '@/models/user';
import { createUserSnapshot } from './create-user-snapshot';
import { getLastMonthDateLimit } from '@/helpers/get-last-month-date-limit';
import { getPercentageChange } from '@/helpers/get-percentage-change';

export const getBalanceData = async (userId: string) => {
  await databaseConnect();

  const user = await User.findById(userId);

  if (!user) {
    console.log('User not found...');
    return;
  }

  const lastWeekDateLimit = getLastWeekDateLimit();
  const lastMonthDateLimit = getLastMonthDateLimit();

  if (
    !user.snapshot.lastWeek ||
    user.snapshot.lastWeek.snapshotDateLimit.valueOf() !=
      lastWeekDateLimit.valueOf()
  ) {
    console.log("User doesn't have a snapshot of last week...");
    await createUserSnapshot(userId, 'lastWeek');
  }

  if (
    !user.snapshot.lastMonth ||
    user.snapshot.lastMonth.snapshotDateLimit.valueOf() !=
      lastMonthDateLimit.valueOf()
  ) {
    console.log("User doesn't have a snapshot of last month...");
    await createUserSnapshot(userId, 'lastMonth');
  }

  console.log('User: ', user.snapshot);

  await databaseClose();

  //   percentageChange: {
  //     isPositive: boolean;
  //     timePeriod: 'weekly' | 'montly';
  //     percentage: number;
  //     difference: number;
  //   };

  const totalBalancePercentageChangeLastWeek = getPercentageChange(
    user.snapshot.lastWeek!.balance.totalBalance,
    user.balance.totalBalance
  );
  const totalBalanceData = {
    current: user.balance.totalBalance,
    lastWeek: {
      balance: user.snapshot.lastWeek!.balance.totalBalance,
      percentageChange: {
        isPositive: totalBalancePercentageChangeLastWeek > 0 ? true : false,
        percentage: totalBalancePercentageChangeLastWeek,
        difference:
          user.balance.totalBalance -
          user.snapshot.lastWeek!.balance.totalBalance
      }
    },
    lastMonth: user.snapshot.lastMonth!.balance.totalBalance
  };

  const incomeBalancePercentageChangeLastWeek = getPercentageChange(
    user.snapshot.lastWeek!.balance.totalIncome,
    user.balance.totalIncome
  );
  const incomeBalanceData = {
    current: user.balance.totalIncome,
    lastWeek: {
      balance: user.snapshot.lastWeek!.balance.totalIncome,
      percentageChange: {
        isPositive: incomeBalancePercentageChangeLastWeek > 0 ? true : false,
        percentage: incomeBalancePercentageChangeLastWeek,
        difference:
          user.balance.totalIncome - user.snapshot.lastWeek!.balance.totalIncome
      }
    },
    lastMonth: user.snapshot.lastMonth!.balance.totalIncome
  };

  const expenseBalancePercentageChangeLastWeek = getPercentageChange(
    user.snapshot.lastWeek!.balance.totalExpense,
    user.balance.totalExpense
  );
  const expenseBalanceData = {
    current: user.balance.totalExpense,
    lastWeek: {
      balance: user.snapshot.lastWeek!.balance.totalExpense,
      percentageChange: {
        isPositive: expenseBalancePercentageChangeLastWeek > 0 ? true : false,
        percentage: expenseBalancePercentageChangeLastWeek,
        difference:
          user.balance.totalExpense -
          user.snapshot.lastWeek!.balance.totalExpense
      }
    },
    lastMonth: user.snapshot.lastMonth!.balance.totalExpense
  };

  return {
    total: totalBalanceData,
    income: incomeBalanceData,
    expense: expenseBalanceData
  };
};
