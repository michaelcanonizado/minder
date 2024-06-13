import mongoose from 'mongoose';
import { databaseConnect, databaseClose } from '@/helpers/database';
import User from '@/models/user';
import Person from '@/models/user-v2';
import Income from '@/models/income-v2';

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

const getIncome = async () => {
  await databaseConnect();

  const user = await Person.findOne({ profile: { username: 'Mikey' } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log(user);
  console.log('User found!');

  await databaseClose();
};

// seedIncome();
getIncome();
