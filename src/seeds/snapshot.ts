import { databaseConnect, databaseClose } from '@/helpers/database';
import User from '@/models/user';
import Expense from '@/models/expense';
import Income from '@/models/income';
import { getLastWeekDateLimit } from '@/helpers/get-last-week-date-limit';

const seedSnapshot = async () => {
  // DEPRECATED CODE!!!!

  await databaseConnect();

  // Get user
  const user = await User.findOne({ profile: { username: 'mikey' } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log('User found!');

  const lastSundayDate = getLastWeekDateLimit();

  const pipeline = [
    {
      $match: {
        user: user._id,
        transactionDate: {
          $lte: lastSundayDate
        }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' }
      }
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1
      }
    }
  ];

  const expenseRes = await Expense.aggregate(pipeline);
  const incomeRes = await Income.aggregate(pipeline);

  const totalExpense = expenseRes[0] ? expenseRes[0].totalAmount : 0;
  const totalIncome = incomeRes[0] ? incomeRes[0].totalAmount : 0;

  // DEPRECATED CODE!!!!

  // @ts-ignore
  // user.snapshots.push({
  //   balance: {
  //     totalBalance: totalIncome - totalExpense,
  //     totalIncome: totalIncome,
  //     totalExpense: totalExpense
  //   },
  //   snapshotDateLimit: lastSundayDate
  // });

  // console.log(user.snapshots);
  // console.log(totalExpense);
  // console.log(totalIncome);

  await user.save();

  await databaseClose();
  return;

  // DEPRECATED CODE!!!!
};

seedSnapshot();
