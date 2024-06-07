import mongoose from 'mongoose';
import { databaseConnect, databaseClose } from '@/helpers/database';
import Expense from '@/models/expense';
import User from '@/models/user';

databaseConnect();

const seedExpense = async () => {
  const user = await User.findById('666323b5fb1a3011bdc3ec1b');

  if (!user) {
    console.log('User not found!');
    return;
  }
  console.log('User found!');

  const expenses = await Expense.insertMany([
    {
      userId: user._id,
      transactionId: '123509481238905611',
      amount: 200,
      description: 'Total exp on food',
      transactionDate: new Date()
    },
    {
      userId: user._id,
      transactionId: '776168253838905611',
      amount: 115,
      description: 'Total exp on transportation',
      transactionDate: new Date()
    },
    {
      userId: user._id,
      transactionId: '90412768253838905611',
      amount: 375,
      description: 'Pokemon Cards',
      transactionDate: new Date()
    }
  ]);

  const foundExpenses = await Expense.find().populate('userId');
  console.log(foundExpenses);
  databaseClose();
};
seedExpense();
