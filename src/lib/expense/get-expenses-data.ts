'use server';

import { databaseConnect } from '@/helpers/database/database';

import Expense, { ExpenseType } from '@/models/expense';
import mongoose from 'mongoose';

export const getExpensesData = async ({
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
      //Populate the expenses document with user details
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      // Turn the new user array field into just an object
      $unwind: '$user'
    },
    {
      // Filter the user.wallets array to just get the one that matches wallet
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
      // Turn the new array into just an object
      $unwind: '$wallet'
    },
    {
      // Filter the user.categories.expense array to just get the one that matches category
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
      // Turn the new array into just an object
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
