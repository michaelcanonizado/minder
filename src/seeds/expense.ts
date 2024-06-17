import mongoose from 'mongoose';
import { databaseConnect, databaseClose } from '@/helpers/database';
import Expense from '@/models/expense';
import User from '@/models/user';

// WARNING
// This function does not automatically call seedIncome (npm run seed-income), where the income collection is cleared, new incomes are made, and the wallets are updated. Therefore, calling this function multiple times can cause an overflow and mismatch between the expenses and incomes
// To avoid this, always run 'npm run seed-income' before running this file(npm run seed-expense), or seedIncome can be imported from ./income.ts and be called before the function below runs.
const seedExpense = async () => {
  databaseConnect();

  // Get user
  const user = await User.findOne({ profile: { username: 'mikey' } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log('User found!');

  // Delete contents of Expense collection
  await Expense.deleteMany({});
  console.log('Deleted all expenses!');

  let totalAmount = 0;
  const expenseLogs = [];
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo scelerisque venenatis.',
    'Lorem ipsum dolor sit amet',
    'Vestibulum commodo scelerisque venenatis.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  ];
  const numOfDescriptions = descriptions.length;
  const numOfWallets = user.wallets.length;
  const numOfCategories = user.categories ? user.categories?.income.length : 0;

  // Seed 3-15 expense logs for each wallet
  for (let i = 0; i < numOfWallets; i++) {
    const randNumofExpenses = Math.floor(Math.random() * (15 - 3 + 1) + 3);

    for (let j = 0; j < randNumofExpenses; j++) {
      let randAmount =
        Math.floor(
          Math.random() * (Math.floor(user.wallets[i].balance / 3) - 100 + 1)
        ) + 100;
      const randCategory = Math.floor(Math.random() * numOfCategories);
      const randDescription = Math.floor(Math.random() * numOfDescriptions);

      if (randAmount < 0) {
        randAmount = 0;
      }

      totalAmount += randAmount;

      expenseLogs.push({
        user: user._id,
        wallet: user.wallets[i]._id,
        category: user.categories?.expense[randCategory]._id,
        amount: randAmount,
        description: descriptions[randDescription],
        transactionDate: new Date()
      });

      for (const wallet of user.wallets) {
        if (wallet._id == user.wallets[i]._id) {
          wallet.balance -= randAmount;
        }
      }
    }
  }

  // Push data to database
  const expenses = await Expense.insertMany(expenseLogs);
  console.log('Expenses generated:');
  console.log(expenses);

  // Update user's balances
  user.balance.netBalance -= totalAmount;
  user.balance.totalExpense = totalAmount;
  await user.save();
  console.log(`User's total balance: ${user.balance.netBalance}`);

  databaseClose();
};
seedExpense();
