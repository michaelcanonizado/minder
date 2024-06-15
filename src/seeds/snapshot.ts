import { databaseConnect, databaseClose } from '@/helpers/database';
import User from '@/models/user';
import Expense from '@/models/expense';
import Income from '@/models/income';

const getLastWeekSunday = () => {
  const today = new Date();

  // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const dayOfWeek = today.getDay();

  // Make a copy of today's date
  const prevSunday = new Date(today);

  // Calculate how many days to subtract to get to the previous Sunday
  prevSunday.setDate(prevSunday.getDate() - dayOfWeek);

  // Set time to 11:59:59 PM
  prevSunday.setHours(23, 59, 59, 999);

  return prevSunday;
};

const seedSnapshot = async () => {
  await databaseConnect();

  // Get user
  const user = await User.findOne({ profile: { username: 'mikey' } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log('User found!');

  const lastSundayDate = getLastWeekSunday();

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

  const totalExpense = expenseRes[0] ? expenseRes[0] : 0;
  const totalIncome = incomeRes[0] ? incomeRes[0] : 0;

  // @ts-ignore
  user.snapshots.push({
    balance: {
      totalBalance: totalIncome - totalExpense,
      totalIncome: totalIncome,
      totalExpense: totalExpense
    },
    snapshotDateLimit: lastSundayDate
  });

  console.log(user.snapshots);
  console.log(totalExpense);
  console.log(totalIncome);

  await user.save();

  await databaseClose();
  return;
};

seedSnapshot();
