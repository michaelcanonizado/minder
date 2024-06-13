import mongoose from 'mongoose';
import { databaseConnect, databaseClose } from '@/helpers/database';
import User from '@/models/user';
import Person from '@/models/user-v2';
import Income, { IncomeType } from '@/models/income-v2';
import { UserType } from '@/models/user-v2';

const seedIncome = async () => {
  databaseConnect();
  // Get user
  const user = await Person.findOne({ profile: { username: 'Mikey' } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log(user);
  console.log('User found!');

  const income = new Income({
    amount: 500,
    user: user._id,
    wallet: user.wallets[0]._id,
    category: user.categories.income[0]._id,
    description: 'This is a test',
    transactionDate: new Date()
  });

  await income.save();

  console.log(income);

  databaseClose();
};

type Merged = Omit<IncomeType, 'user'> & {
  user: UserType;
};

const getIncome = async () => {
  await databaseConnect();

  const user = await Person.findOne({ profile: { username: 'Mikey' } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  await databaseConnect();

  const page = 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const data: unknown = await Income.aggregate([
    { $match: { user: user._id } },
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
        from: 'people',
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

  const res = JSON.parse(JSON.stringify(data)) as Merged[];

  console.log(res[0]);

  await databaseClose();
};

// seedIncome();
getIncome();
