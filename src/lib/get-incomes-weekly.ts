import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database';
import Income, { IncomeType } from '@/models/income';

import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';

export const getIncomesWeekly = async (userId: string) => {
  await databaseConnect();

  const { startDate: thisWeekStartDate, endDate: thisWeekEndDate } =
    getThisWeekStartAndEndDates();

  const { startDate: lastWeekStartDate, endDate: lastWeekEndDate } =
    getLastWeekStartAndEndDates();

  const data: unknown = await Income.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $lte: thisWeekEndDate,
          $gte: lastWeekStartDate
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
      $sort: { transactionDate: 1 }
    },

    {
      $addFields: {
        dayOfWeek: {
          $switch: {
            branches: [
              {
                case: { $eq: [{ $dayOfWeek: '$transactionDate' }, 1] },
                then: 'Sun'
              },
              {
                case: { $eq: [{ $dayOfWeek: '$transactionDate' }, 2] },
                then: 'Mon'
              },
              {
                case: { $eq: [{ $dayOfWeek: '$transactionDate' }, 3] },
                then: 'Tue'
              },
              {
                case: { $eq: [{ $dayOfWeek: '$transactionDate' }, 4] },
                then: 'Wed'
              },
              {
                case: { $eq: [{ $dayOfWeek: '$transactionDate' }, 5] },
                then: 'Thu'
              },
              {
                case: { $eq: [{ $dayOfWeek: '$transactionDate' }, 6] },
                then: 'Fri'
              },
              {
                case: { $eq: [{ $dayOfWeek: '$transactionDate' }, 7] },
                then: 'Sat'
              }
            ],
            default: ''
          }
        },
        formattedDate: {
          $dateToString: {
            format: '%b %d, %Y',
            date: '$transactionDate',
            timezone: 'Asia/Manila'
          }
        }
      }
    },
    {
      $addFields: {
        transactionDate: {
          $concat: ['$dayOfWeek', ', ', '$formattedDate']
        }
      }
    },
    {
      $project: {
        dayOfWeek: 0,
        formattedDate: 0
      }
    }
  ]).exec();

  return JSON.parse(JSON.stringify(data)) as {
    amount: number;
    transactionDate: string;
  }[];
};
