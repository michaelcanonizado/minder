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

/**
 * Gets the net-amount per day within the specified
 * time period. It fetches the incomes and expenses made
 * during the current period(this week/month/year) and
 * previous period(last week/month/year), as data about
 * the previous period is needed when determining the
 * percentage change of the current net-amount. The
 * net-amount will then be calculated for each of the
 * days within the period
 *
 * @param userId _id of the user
 * @param period time period of the data needed
 * @returns an object containing the balance and the
 * net-amount data within the time period
 */
export const getNetAmountChartData = async (userId: string, period: Period) => {
  await databaseConnect();

  /**
   *
   *
   * Get period dates
   */
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

  /**
   *
   *
   * Get the starting net-amount (The net-amount before the
   * period).
   */
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

  /**
   *
   *
   * Get the income and expense transactions within the period,
   * and sort them in ascending order
   */
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

  /**
   *
   *
   * Find the user's net-amount for each day within the period.
   */
  const chartRows: ChartRow[] = [];
  const dateNow = new Date();
  let secondHalfLastRow = {
    amount: 0,
    date: new Date()
  };

  /* Loop through each day from the start of the first half
  (previous period) up to the date right now, finding the 
  net-amount for each day.*/
  for (
    let dateIndex = firstHalfDates.startDate, incomeIndex = 0, expenseIndex = 0;
    dateIndex.valueOf() <= secondHalfDates.endDate.valueOf();
    dateIndex.setDate(dateIndex.getDate() + 1)
  ) {
    /* Since the net-amount is the difference between the total 
    income and total expenses, we can loop through the fetched
    transactions (should already be in ascending order) within
    the period and add/deduct from the starting net-amount. */

    /* Loop through incomes that match the current date (dateIndex)
    in the for-loop. There could be multiple transactions in a day,
    so keep on adding until all incomes within the current date */
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

    /* Repeat for the expenses, but deduct. */
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

    /* Once all incomes and expenses within the current date have
    been added and deducted, push the data for the current date
    in the array */
    chartRows.push({
      amount: startingNetAmount,
      date: new Date(dateIndex) as Date & string
    });

    /* Break the loop once current date is equal to the date
    right now */
    if (
      dateIndex.getFullYear() === dateNow.getFullYear() &&
      dateIndex.getMonth() === dateNow.getMonth() &&
      dateIndex.getDate() === dateNow.getDate()
    ) {
      /* Before breaking out, store the latest pushed object in the
      array. This object is the user's current net-amount for the day.*/
      secondHalfLastRow = chartRows[chartRows.length - 1];
      break;
    }
  }

  /**
   *
   *
   * Get the net-amount of the first half (last week/month/year)
   */
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
    throw new Error(
      'Something went wrong! Could not get Net Amount Data for last period'
    );
  }

  /* Get the percentage change between the net-amount of the current
  and previous period */
  const percentageChange = getPercentageChange(
    firstHalfLastRow.amount,
    secondHalfLastRow.amount
  );

  /* Collect the results */
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
    dates: {
      start:
        chartRows.length < 2 ? firstHalfDates.startDate : chartRows[0].date,
      end:
        chartRows.length < 2
          ? secondHalfDates.endDate
          : chartRows[chartRows.length - 1].date
    },
    rows: JSON.parse(JSON.stringify(chartRows)) as ChartRow[]
  };

  return result;
};
