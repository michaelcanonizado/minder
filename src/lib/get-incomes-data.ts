import mongoose from 'mongoose';
import { databaseClose, databaseConnect } from '@/helpers/database';
import Income, { IncomeType } from '@/models/income';

export const getIncomesData = async ({
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

  // Currently this doesn't match the userId, it fetches all documents in the collection!
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

  await databaseClose();

  return {
    data: JSON.parse(JSON.stringify(data)) as IncomeType[],
    pages: {
      current: page,
      max: Math.ceil(totalDocuments / limit)
    }
  };
};
