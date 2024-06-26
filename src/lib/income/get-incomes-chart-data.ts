'use server';

import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database/database';
import Income, { IncomeType } from '@/models/income';

import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';
import { getThisMonthStartAndEndDates } from '@/helpers/dates/get-this-month-start-and-end-dates';
import { getLastMonthStartAndEndDates } from '@/helpers/dates/get-last-month-start-and-end-dates';
import { ChartData, ChartRow, Period } from '@/types';
import { getPercentageChange } from '@/helpers/get-percentage-change';

export const getIncomesChartData = async (userId: string, period: Period) => {
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

  const data = (await Income.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $lte: endDate,
          $gte: startDate
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

  const percentageChange = getPercentageChange(0, 0);

  const result: ChartData = {
    balance: {
      amount: totalAmount,
      percentageChange: {
        difference: 0,
        percentage: percentageChange,
        isPositive: percentageChange >= 0 ? true : false
      }
    },
    rows: JSON.parse(JSON.stringify(data)) as ChartRow[]
  };
  console.log(result.balance);

  return result;
};
