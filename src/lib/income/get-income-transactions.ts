'use server';

import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database/database';
import Income, { IncomeType } from '@/models/income';

/**
 * Gets the user's income transactions with pagination
 *
 * @param userId _id of the user
 * @param page current page
 * @param limit how many to return
 * @returns an array of the matched incomes using the
 * userId and the maximum page number
 */
export const getIncomeTransactions = async ({
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
  const data: unknown = await Income.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
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
      wallet of the income */
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
      /* Filter the user.categories.income[] to get the one that
      matches category of the income */
      $set: {
        category: {
          $filter: {
            input: '$user.categories.income',
            as: 'income',
            cond: {
              $eq: ['$$income._id', '$category']
            }
          }
        }
      }
    },
    {
      $unwind: '$category'
    }
  ]).exec();

  const totalDocuments = await Income.countDocuments({
    user: new mongoose.Types.ObjectId(process.env.TEMP_USER_ID)
  });

  return {
    data: JSON.parse(JSON.stringify(data)) as IncomeType[],
    pages: {
      current: page,
      max: Math.ceil(totalDocuments / limit)
    }
  };
};
