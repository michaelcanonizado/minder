'use server';

import Income from '@/models/income';
import Expense from '@/models/expense';
import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database/database';

import { getPercentageChange } from '@/helpers/get-percentage-change';
import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';
import { getThisMonthStartAndEndDates } from '@/helpers/dates/get-this-month-start-and-end-dates';
import { getLastMonthStartAndEndDates } from '@/helpers/dates/get-last-month-start-and-end-dates';
import { getLastYearStartAndEndDates } from '@/helpers/dates/get-last-year-start-and-end-dates';
import { getThisYearStartAndEndDates } from '@/helpers/dates/get-this-year-start-and-end-dates';

import { ChartData, ChartRow, Period, PeriodDates } from '@/types';

export const getNetAmountChartData = async (userId: string, period: Period) => {
  await databaseConnect();

  let firstHalfDates: PeriodDates | null = null;
  let secondHalfDates: PeriodDates | null = null;

  if (period === 'weekly') {
    firstHalfDates = getLastWeekStartAndEndDates();
    secondHalfDates = getThisWeekStartAndEndDates();
  } else if (period === 'monthly') {
    firstHalfDates = getLastMonthStartAndEndDates();
    secondHalfDates = getThisMonthStartAndEndDates();
  } else if (period === 'yearly') {
    firstHalfDates = getLastYearStartAndEndDates();
    secondHalfDates = getThisYearStartAndEndDates();
  }

  if (!firstHalfDates || !secondHalfDates) {
    return {} as ChartData;
  }

  const startingExpenseTotalRes = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $lte: firstHalfDates.startDate
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
          $lte: firstHalfDates.startDate
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

  const incomesWithinPeriod = await Income.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $lte: secondHalfDates.endDate,
          $gte: firstHalfDates.startDate
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
          $lte: secondHalfDates.endDate,
          $gte: firstHalfDates.startDate
        }
      }
    },
    {
      $sort: {
        transactionDate: 1
      }
    }
  ]);

  const chartRows: ChartRow[] = [];
  let netAmountIndex: number = startingNetAmount;
  const dateNow = new Date();
  let secondHalfLastRow = {
    amount: 0,
    date: new Date()
  };

  for (
    let dateIndex = firstHalfDates.startDate, incomeIndex = 0, expenseIndex = 0;
    dateIndex.valueOf() <= secondHalfDates.endDate.valueOf();
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
      netAmountIndex -= expensesWithinPeriod[expenseIndex].amount;

      expenseIndex++;
    }

    chartRows.push({
      amount: netAmountIndex,
      date: new Date(dateIndex) as Date & string
    });

    if (
      dateIndex.getFullYear() === dateNow.getFullYear() &&
      dateIndex.getMonth() === dateNow.getMonth() &&
      dateIndex.getDate() === dateNow.getDate()
    ) {
      secondHalfLastRow = chartRows[chartRows.length - 1];

      break;
    }
  }

  let firstHalfLastRow = chartRows.find(row => {
    if (
      row.date.getFullYear() === firstHalfDates.endDate.getFullYear() &&
      row.date.getMonth() === firstHalfDates.endDate.getMonth() &&
      row.date.getDate() === firstHalfDates.endDate.getDate()
    ) {
      return row;
    }
  });

  if (!firstHalfLastRow) {
    throw new Error('Something went wrong! Could not get Net Amount Data');
  }

  const percentageChange = getPercentageChange(
    firstHalfLastRow.amount,
    secondHalfLastRow.amount
  );

  const result: ChartData = {
    balance: {
      amount: secondHalfLastRow.amount,
      percentageChange: {
        difference: secondHalfLastRow.amount - firstHalfLastRow.amount,
        percentage: percentageChange,
        isPositive: percentageChange >= 0 ? true : false
      }
    },
    rows: JSON.parse(JSON.stringify(chartRows)) as ChartRow[]
  };

  return result;
};
