import { databaseClose, databaseConnect } from '@/helpers/database';

import Income, { IncomeType } from '@/models/income';

export const getIncomesData = async ({
  page = 1,
  limit = 10
}: {
  page: number;
  limit: number;
}) => {
  await databaseConnect();

  const skip = (page - 1) * limit;

  const data: unknown = await Income.aggregate([
    {
      $sort: {
        amount: -1
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

  await databaseClose();
  return data as IncomeType[];
};
