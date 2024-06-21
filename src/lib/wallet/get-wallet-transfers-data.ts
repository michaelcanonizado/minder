import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database/database';
import BalanceTransfer, {
  BalanceTransferType
} from '@/models/balance-transfer';

export const getWalletTransfersData = async ({
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

  const data: unknown = await BalanceTransfer.aggregate([
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

  return {
    data: JSON.parse(JSON.stringify(data)) as BalanceTransferType[],
    pages: {
      current: page,
      max: Math.ceil(totalDocuments / limit)
    }
  };
};
