'use server';

import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database/database';
import Income from '@/models/income';

import { getPercentageChange } from '@/helpers/get-percentage-change';
import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';
import { getThisMonthStartAndEndDates } from '@/helpers/dates/get-this-month-start-and-end-dates';
import { getLastMonthStartAndEndDates } from '@/helpers/dates/get-last-month-start-and-end-dates';
import { getLastYearStartAndEndDates } from '@/helpers/dates/get-last-year-start-and-end-dates';
import { getThisYearStartAndEndDates } from '@/helpers/dates/get-this-year-start-and-end-dates';

import { ChartRow, Period, PeriodDates, ChartData } from '@/types';

/**
 * Gets the income transactions within a time period.
 * It fetches the incomes made during the current
 * period(this week/month/year) as well as the previous
 * period(last week/month/year), as data about the
 * previous period is needed when determining the
 * percentage change of the amount. The data from both
 * periods will then be concatenated together
 *
 * @param userId _id of the user
 * @param period time period of the data needed
 * @returns an object containing the balance and the
 * simplified incomes data within the time period
 */
export const getIncomeChartData = async (userId: string, period: Period) => {
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
   * Fetch incomes within the time period
   */
  const data = (await Income.aggregate([
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
        createdAt: 1
      }
    },

    {
      $group: {
        _id: {
          $dateToString: { date: '$transactionDate' }
        },
        totalAmount: { $sum: '$amount' }
      }
    },
    {
      $project: {
        _id: 0,
        transactionDate: { $dateFromString: { dateString: '$_id' } },
        amount: '$totalAmount'
      }
    },
    {
      $project: {
        amount: 1,
        date: '$transactionDate'
      }
    },
    {
      $sort: { date: 1 }
    }
  ]).exec()) as ChartRow[];

  /**
   *
   *
   * Calculate the total amounts for the current and
   * previous periods and calculate the percentage change
   */
  const firstHalfTotalAmount = data.reduce((sum: number, item) => {
    if (item.date.valueOf() <= firstHalfDates.endDate.valueOf()) {
      return sum + item.amount;
    }
    return sum + 0;
  }, 0);

  const secondHalfTotalAmount = data.reduce((sum: number, item) => {
    if (item.date.valueOf() >= secondHalfDates.startDate.valueOf()) {
      return sum + item.amount;
    }
    return sum + 0;
  }, 0);

  let percentageChange = getPercentageChange(
    firstHalfTotalAmount,
    secondHalfTotalAmount
  );
  percentageChange = percentageChange ? percentageChange : 0;

  /**
   *
   *
   * Collect the results
   */
  const result: ChartData = {
    balance: {
      amount: {
        current: secondHalfTotalAmount,
        previous: firstHalfTotalAmount
      },
      percentageChange: {
        difference: secondHalfTotalAmount - firstHalfTotalAmount,
        percentage: percentageChange,
        isPositive: percentageChange >= 0 ? true : false
      }
    },
    dates: {
      start: firstHalfDates.startDate,
      end: secondHalfDates.endDate
    },
    rows: JSON.parse(JSON.stringify(data)) as ChartRow[]
  };

  return result;
};
