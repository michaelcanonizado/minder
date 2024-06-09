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
        localField: 'userId',
        foreignField: '_id',
        as: 'userId'
      }
    },
    {
      // Turn the new userId array field into just an object
      $unwind: '$userId'
    },
    {
      // Filter the wallets array to just get the one that matches walletId
      $set: {
        walletId: {
          $filter: {
            input: '$userId.wallets',
            as: 'wallet',
            cond: {
              $eq: ['$$wallet._id', '$walletId']
            }
          }
        }
      }
    },
    {
      // Turn the new array into just an object
      $unwind: '$walletId'
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
