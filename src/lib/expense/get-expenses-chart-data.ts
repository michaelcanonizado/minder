'use server';

import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database/database';
import Expense from '@/models/expense';

import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';
import { getThisMonthStartAndEndDates } from '@/helpers/dates/get-this-month-start-and-end-dates';
import { getLastMonthStartAndEndDates } from '@/helpers/dates/get-last-month-start-and-end-dates';
import { Period } from '@/types';

export const getExpensesChartData = async (userId: string, period: Period) => {
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

  const data: unknown = await Expense.aggregate([
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
  ]).exec();

  return JSON.parse(JSON.stringify(data)) as {
    amount: number;
    date: Date;
  }[];
};
