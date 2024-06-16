'use server';

import { databaseConnect, databaseClose } from '@/helpers/database';
import { getLastWeekSundayDate } from '@/helpers/getLastWeekSundayDate';

import User from '@/models/user';
import Expense from '@/models/expense';
import Income from '@/models/income';

export const createUserSnapshot = async (userId: string) => {
  await databaseConnect();

  const user = await User.findById(userId).exec();
  if (!user) {
    console.log('User not found!');
    return;
  }

  const lastSundayDate = getLastWeekSundayDate();

  const pipeline = [
    {
      $match: {
        user: user._id,
        transactionDate: {
          $lte: lastSundayDate
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

  // @ts-ignore
  user.snapshots.push({
    balance: {
      totalBalance: totalIncome - totalExpense,
      totalIncome: totalIncome,
      totalExpense: totalExpense
    },
    snapshotDateLimit: lastSundayDate
  });

  console.log(user.snapshots);

  await user.save();

  await databaseClose();
  return;
};
