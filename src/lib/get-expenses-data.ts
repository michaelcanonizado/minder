import { databaseClose, databaseConnect } from '@/helpers/database';

import Expense from '@/models/expense';

export const getExpensesData = async ({
  page = 1,
  limit = 10
}: {
  page: number;
  limit: number;
}) => {
  await databaseConnect();

  const skip = (page - 1) * limit;

  const data = await Expense.aggregate([
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
      //Populate the expenses document with user details
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      // Turn the new userId array field into just an object
      $unwind: '$user'
    },
    {
      // Filter the wallets array to just get the one that matches walletId
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
  ]);

  console.log(data);
  const documentCount = await Expense.countDocuments();
  console.log(`total documents: ${documentCount}`);
  console.log(`Page: ${page}, Skipped: ${skip}, Limit: ${limit}`);
  console.log(`total retrieved: ${data.length}`);

  await databaseClose();
  return;
};
