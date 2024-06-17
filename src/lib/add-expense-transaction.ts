'use server';

import { databaseClose, databaseConnect } from '@/helpers/database';
import Expense from '@/models/expense';
import User from '@/models/user';
import trackExpenseSchema from '@/schemas/track-expense';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

export const addExpenseTransaction = async (data: unknown) => {
  // Validate data coming from the client
  const result = trackExpenseSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return {
      isSuccessful: false,
      message: 'Failed to add expense! Please try again'
    };
  }

  await databaseConnect();

  // Get user document
  const user = await User.findById(result.data.userId);
  if (user === null) {
    return {
      isSuccessful: false,
      message: 'Failed to add expense! Please try again'
    };
  }

  // Create new expense document
  const expense = new Expense({
    user: new mongoose.Types.ObjectId(result.data.userId),
    wallet: new mongoose.Types.ObjectId(result.data.walletId),
    category: new mongoose.Types.ObjectId(result.data.categoryId),
    amount: result.data.amount,
    description: result.data.description,
    transactionDate: result.data.date
  });

  // Update user's corresponding wallet balance
  for (const wallet of user.wallets) {
    if (wallet._id == result.data.walletId) {
      wallet.balance -= result.data.amount;
    }
  }

  // Update user's total balance
  user.balance.netBalance -= result.data.amount;

  // Update user's expense balance
  user.balance.totalExpense += result.data.amount;

  // Save user and expense document
  await user.save();
  await expense.save();

  await databaseClose();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully added expense'
  };
};
