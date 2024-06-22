import { databaseConnect } from '@/helpers/database/database';

import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';
import { getThisMonthStartAndEndDates } from '@/helpers/dates/get-this-month-start-and-end-dates';
import { getLastMonthStartAndEndDates } from '@/helpers/dates/get-last-month-start-and-end-dates';

import Income from '@/models/income';
import Expense from '@/models/expense';
import mongoose from 'mongoose';

export const getNetAmountChartData = async (
  userId: string,
  period: 'weekly' | 'monthly'
) => {
  await databaseConnect();

  let startDate: Date | null = null;
  let endDate: Date | null = null;

  if (period === 'weekly') {
    const thisWeek = getThisWeekStartAndEndDates();
    const lastWeek = getLastWeekStartAndEndDates();

    startDate = lastWeek.startDate;
    endDate = thisWeek.endDate;
  } else if (period === 'monthly') {
    const thisMonth = getThisMonthStartAndEndDates();
    const lastMonth = getLastMonthStartAndEndDates();

    startDate = lastMonth.startDate;
    endDate = thisMonth.endDate;
  }

  const startingExpenseTotalRes = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $lte: startDate
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
  ]);
  const startingIncomeTotalRes = await Income.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $lte: startDate
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
  ]);

  const startingExpense = startingExpenseTotalRes[0]
    ? startingExpenseTotalRes[0].totalAmount
    : 0;
  const startingIncome = startingIncomeTotalRes[0]
    ? startingIncomeTotalRes[0].totalAmount
    : 0;
  const startingNetAmount = startingIncome - startingExpense;

  console.log(startingIncome);
  console.log(startingExpense);
  console.log(
    `Balance before: ${startDate?.toLocaleDateString()} is ${startingNetAmount}`
  );
};
