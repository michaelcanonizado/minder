import { getLastWeekDateLimit } from '@/helpers/get-last-week-date-limit';
import User, { UserSnapshot } from '@/models/user';
import Income from '@/models/income';
import Expense from '@/models/expense';
import { getLastMonthDateLimit } from '@/helpers/get-last-month-date-limit';

export const createUserSnapshot = async (
  userId: string,
  period: 'lastWeek' | 'lastMonth'
) => {
  /*
  WARNING!!!

  This function needs the database to be be connected!
  databaseConnect() and databaseClose() is not being called
  here to avoid connection conflicts. I.e: this function will
  be called inside of server actions that already have the
  database connected.
  */

  console.log('Creating snapshot....');

  const user = await User.findOne({ profile: { username: 'mikey' } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log('User found!');

  let dateLimit: Date;
  if (period === 'lastWeek') {
    dateLimit = getLastWeekDateLimit();
  } else if (period === 'lastMonth') {
    dateLimit = getLastMonthDateLimit();
  }

  const pipeline = [
    {
      $match: {
        user: user._id,
        transactionDate: {
          $lte: dateLimit!
        }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' }
      }
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1
      }
    }
  ];

  const expenseRes = await Expense.aggregate(pipeline);
  const incomeRes = await Income.aggregate(pipeline);

  const totalExpense = expenseRes[0] ? expenseRes[0].totalAmount : 0;
  const totalIncome = incomeRes[0] ? incomeRes[0].totalAmount : 0;

  const snapshot = {
    balance: {
      totalBalance: totalIncome - totalExpense,
      totalIncome: totalIncome,
      totalExpense: totalExpense
    },
    snapshotDateLimit: dateLimit!
  };

  if (period === 'lastWeek') {
    // @ts-ignore
    user.snapshot.lastWeek = snapshot;
  } else if (period === 'lastMonth') {
    // @ts-ignore
    user.snapshot.lastMonth = snapshot;
  }

  console.log('Date Limit: ', dateLimit!);
  console.log('Total Income: ', totalIncome);
  console.log('Total Expense: ', totalExpense);
  console.log('User: ', user.snapshot);

  await user.save();

  return;
};
