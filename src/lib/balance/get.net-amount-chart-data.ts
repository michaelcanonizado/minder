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

  if (!startDate || !endDate) {
    throw new Error('Date/s missing!');
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

  const incomesWithinPeriod = await Income.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $sort: {
        transactionDate: 1
      }
    }
  ]);
  const expensesWithinPeriod = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $sort: {
        transactionDate: 1
      }
    }
  ]);

  console.log(incomesWithinPeriod.length);
  console.log(expensesWithinPeriod.length);

  const result: {
    amount: number;
    date: Date;
  }[] = [];
  let netAmountIndex: number = startingNetAmount;

  for (
    let dateIndex = startDate, incomeIndex = 0, expenseIndex = 0;
    dateIndex.valueOf() <= endDate.valueOf();
    dateIndex.setDate(dateIndex.getDate() + 1)
  ) {
    while (
      incomeIndex < incomesWithinPeriod.length &&
      dateIndex.getFullYear() ===
        incomesWithinPeriod[incomeIndex].transactionDate.getFullYear() &&
      dateIndex.getMonth() ===
        incomesWithinPeriod[incomeIndex].transactionDate.getMonth() &&
      dateIndex.getDate() ===
        incomesWithinPeriod[incomeIndex].transactionDate.getDate()
    ) {
      console.log(
        `Adding ${incomesWithinPeriod[incomeIndex].amount} to ${netAmountIndex} - ${incomesWithinPeriod[incomeIndex].transactionDate.toLocaleDateString()}`
      );
      netAmountIndex += incomesWithinPeriod[incomeIndex].amount;

      incomeIndex++;
    }
    while (
      expenseIndex < expensesWithinPeriod.length &&
      dateIndex.getFullYear() ===
        expensesWithinPeriod[expenseIndex].transactionDate.getFullYear() &&
      dateIndex.getMonth() ===
        expensesWithinPeriod[expenseIndex].transactionDate.getMonth() &&
      dateIndex.getDate() ===
        expensesWithinPeriod[expenseIndex].transactionDate.getDate()
    ) {
      console.log(
        `Deducting ${expensesWithinPeriod[expenseIndex].amount} to ${netAmountIndex} - ${expensesWithinPeriod[expenseIndex].transactionDate.toLocaleDateString()}`
      );
      netAmountIndex -= expensesWithinPeriod[expenseIndex].amount;

      expenseIndex++;
    }

    result.push({
      amount: netAmountIndex,
      date: dateIndex
    });
  }

  return JSON.parse(JSON.stringify(result)) as typeof result;
};
