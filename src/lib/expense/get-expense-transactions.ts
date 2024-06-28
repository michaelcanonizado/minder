'use server';

import { databaseConnect } from '@/helpers/database/database';

import Expense, { ExpenseType } from '@/models/expense';
import mongoose from 'mongoose';

/**
 * Gets the user's expense transactions with pagination
 *
 * @param userId _id of the user
 * @param page current page
 * @param limit how many to return
 * @returns an array of the matched expenses using the
 * userId and the maximum page number
 */
export const getExpenseTransactions = async ({
  page = 1,
  limit = 10,
  userId
}: {
  page: number;
  limit: number;
  userId: string;
}) => {
  await databaseConnect();

  const skip = (page - 1) * limit;

  /**
   *
   *
   * Use aggregate to populate the wallet and category
   * which is a sub document within the user document
   */
  const data: unknown = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $sort: {
        createdAt: -1
      }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    },
    {
      /* Populate the user property with user's details */
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      /* Filter the user.wallets[] to get the one that matches 
      wallet of the expense */
      $set: {
        wallet: {
          $filter: {
            input: '$user.wallets',
            as: 'wallet',
            cond: {
              $eq: ['$$wallet._id', '$wallet']
            }
          }
        }
      }
    },
    {
      $unwind: '$wallet'
    },
    {
      /* Filter the user.categories.expense[] to get the one that
      matches category of the expense */
      $set: {
        category: {
          $filter: {
            input: '$user.categories.expense',
            as: 'expense',
            cond: {
              $eq: ['$$expense._id', '$category']
            }
          }
        }
      }
    },
    {
      $unwind: '$category'
    }
  ]).exec();

  const totalDocuments = await Expense.countDocuments({
    user: new mongoose.Types.ObjectId(process.env.TEMP_USER_ID)
  });

  return {
    data: JSON.parse(JSON.stringify(data)) as ExpenseType[],
    pages: {
      current: page,
      max: Math.ceil(totalDocuments / limit)
    }
  };
};
