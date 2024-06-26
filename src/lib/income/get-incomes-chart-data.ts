'use server';

import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database/database';
import Income from '@/models/income';

import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';
import { getThisMonthStartAndEndDates } from '@/helpers/dates/get-this-month-start-and-end-dates';
import { getLastMonthStartAndEndDates } from '@/helpers/dates/get-last-month-start-and-end-dates';
import { ChartData, ChartRow, Period, PeriodDates } from '@/types';
import { getPercentageChange } from '@/helpers/get-percentage-change';

export const getIncomesChartData = async (userId: string, period: Period) => {
  await databaseConnect();

  let firstHalfDates: PeriodDates | null = null;
  let secondHalfDates: PeriodDates | null = null;

  if (period === 'weekly') {
    firstHalfDates = getLastWeekStartAndEndDates();
    secondHalfDates = getThisWeekStartAndEndDates();
  } else if (period === 'monthly') {
    firstHalfDates = getLastMonthStartAndEndDates();
    secondHalfDates = getThisMonthStartAndEndDates();
  }

  if (!firstHalfDates || !secondHalfDates) {
    return {} as ChartData;
  }

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

  const totalAmount = data.reduce((sum: number, item) => {
    return sum + item.amount;
  }, 0);

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

  const percentageChange = getPercentageChange(
    firstHalfTotalAmount,
    secondHalfTotalAmount
  );

  const result: ChartData = {
    balance: {
      amount: totalAmount,
      percentageChange: {
        difference: secondHalfTotalAmount - firstHalfTotalAmount,
        percentage: percentageChange,
        isPositive: percentageChange >= 0 ? true : false
      }
    },
    rows: JSON.parse(JSON.stringify(data)) as ChartRow[]
  };

  return result;
};
