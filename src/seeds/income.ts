import mongoose from 'mongoose';
import { databaseConnect, databaseClose } from '@/helpers/database';
import Income from '@/models/income';
import User from '@/models/user';

databaseConnect();

const seedIncome = async () => {
  const user = await User.findOne({ profile: { username: 'mikey' } });

  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log('User found!');

  await Income.deleteMany({});
  console.log('Deleted all incomes!');

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

  for (let i = 0; i < numOfWallets; i++) {
    const randAmount = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    const randCategory = Math.floor(Math.random() * numOfCategories);
    const randDescription = Math.floor(Math.random() * numOfDescriptions);

    incomeLogs.push({
      userId: user._id,
      walletId: user.wallets[i]._id,
      categoryId: user.categories?.income[randCategory]._id,
      amount: randAmount,
      description: descriptions[randDescription],
      transactionDate: new Date()
    });
  }

  const incomes = await Income.insertMany(incomeLogs);

  console.log('Incomes generated:');
  console.log(incomes);
  databaseClose();
};
seedIncome();
