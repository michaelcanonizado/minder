import mongoose from 'mongoose';
import { databaseClose, databaseConnect } from '@/helpers/database';
import BalanceTransfer, {
  BalanceTransferType
} from '@/models/balance-transfer';

export const getBalanceTransfersData = async ({
  page = 1,
  limit = 10
}: {
  page: number;
  limit: number;
}) => {
  await databaseConnect();

  const skip = (page - 1) * limit;

  const data: unknown = await BalanceTransfer.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(process.env.TEMP_USER_ID) } },
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
        sourceWallet: {
          $filter: {
            input: '$user.wallets',
            as: 'wallet',
            cond: {
              $eq: ['$$wallet._id', '$sourceWallet']
            }
          }
        }
      }
    },
    {
      $unwind: '$sourceWallet'
    },
    {
      $set: {
        destinationWallet: {
          $filter: {
            input: '$user.wallets',
            as: 'wallet',
            cond: {
              $eq: ['$$wallet._id', '$destinationWallet']
            }
          }
        }
      }
    },
    {
      $unwind: '$destinationWallet'
    }
  ]).exec();

  const totalDocuments = await BalanceTransfer.countDocuments({
    user: new mongoose.Types.ObjectId(process.env.TEMP_USER_ID)
  });

  await databaseClose();

  return {
    data: JSON.parse(JSON.stringify(data)) as BalanceTransferType[],
    pages: {
      current: page,
      max: Math.ceil(totalDocuments / limit)
    }
  };
};