'use server';

import { databaseClose, databaseConnect } from '@/helpers/database';
import Income from '@/models/income';
import User, { UserType } from '@/models/user';
import trackIncomeSchema from '@/schemas/track-income';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

export const addIncomeTransaction = async (data: unknown) => {
  // Validate data coming from the client
  const result = trackIncomeSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return {
      isSuccessful: false,
      message: 'Failed to add income! Please try again'
    };
  }

  await databaseConnect();

  // Get user document
  const user = await User.findById(result.data.userId);
  if (user === null) {
    return {
      isSuccessful: false,
      message: 'Failed to add income! Please try again'
    };
  }

  // Create new income document
  const income = new Income({
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
      wallet.balance! += result.data.amount;
    }
  }

  // Update user's total balance
  user.balance.netBalance += result.data.amount;

  // Update user's income balance
  user.balance.totalIncome += result.data.amount;

  console.log('User: ', user);
  console.log('Income: ', income);

  // Save user and income document
  await user.save();
  await income.save();

  await databaseClose();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully added income'
  };
};
