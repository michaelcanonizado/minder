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

  //
  //
  //
  //
  //
  // Get the start and end dates of first half (last week/month/year) and second half (this week/month/year)
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

  //
  //
  //
  //
  //
  // Get the starting net amount (The net amount before the first half). Add up all the income and expense logs before the first half and get the total
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
  let startingNetAmount = startingIncome - startingExpense;

  //
  //
  //
  //
  //
  // Get the income and expense transactions within the first and second half, and sort them in ascending order
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

  //
  //
  //
  //
  //
  // Find the user's net amount for each day within the period.
  const chartRows: ChartRow[] = [];
  const dateNow = new Date();
  let secondHalfLastRow = {
    amount: 0,
    date: new Date()
  };

  // Loop through each day from the start of the first half up to the date right now, finding the net amount for each day.
  for (
    let dateIndex = firstHalfDates.startDate, incomeIndex = 0, expenseIndex = 0;
    dateIndex.valueOf() <= secondHalfDates.endDate.valueOf();
    dateIndex.setDate(dateIndex.getDate() + 1)
  ) {
    // Since the net amount is the difference between the total income and total expenses, and we've previously gotten the income and expense transaction records within the period, we can now loop through the records and add/deduct from the starting net amount respectively.

    // Loop through income until the current date in the for-loop doesn't match the index in the incomes transaction. (There could be multiple transactions in a day, so keep on adding/deducting until the next day)
    while (
      incomeIndex < incomesWithinPeriod.length &&
      dateIndex.getFullYear() ===
        incomesWithinPeriod[incomeIndex].transactionDate.getFullYear() &&
      dateIndex.getMonth() ===
        incomesWithinPeriod[incomeIndex].transactionDate.getMonth() &&
      dateIndex.getDate() ===
        incomesWithinPeriod[incomeIndex].transactionDate.getDate()
    ) {
      startingNetAmount += incomesWithinPeriod[incomeIndex].amount;

      incomeIndex++;
    }
    // Repeat for the expenses transactions
    while (
      expenseIndex < expensesWithinPeriod.length &&
      dateIndex.getFullYear() ===
        expensesWithinPeriod[expenseIndex].transactionDate.getFullYear() &&
      dateIndex.getMonth() ===
        expensesWithinPeriod[expenseIndex].transactionDate.getMonth() &&
      dateIndex.getDate() ===
        expensesWithinPeriod[expenseIndex].transactionDate.getDate()
    ) {
      startingNetAmount -= expensesWithinPeriod[expenseIndex].amount;

      expenseIndex++;
    }

    // Once all incomes and expenses within the current day have been added/deducted, push the gathered data in the array
    chartRows.push({
      amount: startingNetAmount,
      date: new Date(dateIndex) as Date & string
    });

    // Break the loop once current date is equal to the date right now
    if (
      dateIndex.getFullYear() === dateNow.getFullYear() &&
      dateIndex.getMonth() === dateNow.getMonth() &&
      dateIndex.getDate() === dateNow.getDate()
    ) {
      // Before breaking out, store the latest pushed object in the array. This object is the user's current net amount for the day.
      secondHalfLastRow = chartRows[chartRows.length - 1];

      break;
    }
  }

  //
  //
  //
  //
  //
  // Get the net amount of the first half (last week/month/year)
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

  // Get the percentage change between the net amount of the first and second half
  const percentageChange = getPercentageChange(
    firstHalfLastRow.amount,
    secondHalfLastRow.amount
  );

  // Collect the data gathered
  const result: ChartData = {
    balance: {
      amount: {
        current: secondHalfLastRow.amount,
        previous: firstHalfLastRow.amount
      },
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
