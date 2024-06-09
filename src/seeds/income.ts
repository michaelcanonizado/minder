import mongoose from 'mongoose';
import { databaseConnect, databaseClose } from '@/helpers/database';
import Income from '@/models/income';
import User from '@/models/user';

databaseConnect();

const seedIncome = async () => {
  // Get user
  const user = await User.findOne({ profile: { username: 'mikey' } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log('User found!');

  // Delete contents of Income collection
  await Income.deleteMany({});
  console.log('Deleted all incomes!');

  let totalAmount = 0;
  const incomeLogs = [];
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo scelerisque venenatis.',
    'Lorem ipsum dolor sit amet',
    'Vestibulum commodo scelerisque venenatis.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  ];
  const numOfDescriptions = descriptions.length;
  const numOfWallets = user.wallets.length;
  const numOfCategories = user.categories ? user.categories?.income.length : 0;

  // Seed income for each wallet
  for (let i = 0; i < numOfWallets; i++) {
    const randAmount = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    const randCategory = Math.floor(Math.random() * numOfCategories);
    const randDescription = Math.floor(Math.random() * numOfDescriptions);

    totalAmount += randAmount;

    incomeLogs.push({
      user: user._id,
      wallet: user.wallets[i]._id,
      category: user.categories?.income[randCategory]._id,
      amount: randAmount,
      description: descriptions[randDescription],
      transactionDate: new Date()
    });

    for (const wallet of user.wallets) {
      if (wallet._id == user.wallets[i]._id) {
        wallet.balance = randAmount;
      }
    }
  }

  // Push data to database
  const incomes = await Income.insertMany(incomeLogs);
  console.log('Incomes generated:');
  console.log(incomes);

  // Update user's balances
  user.balance.totalBalance = totalAmount;
  user.balance.totalIncome = totalAmount;
  await user.save();
  console.log(`User's total balance: ${user.balance.totalBalance}`);

  databaseClose();
};
seedIncome();
