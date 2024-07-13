'use server';

import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database/database';
import Expense from '@/models/expense';
import User from '@/models/user';
import trackExpenseSchema from '@/schemas/track-expense';
import { revalidatePath } from 'next/cache';
import { ServerResponse } from '@/types';

/**
 * Records an expense of the user
 *
 * @param data data submitted from the form
 * @returns a response object about the success state
 */
export const addExpenseTransaction = async (
  data: unknown
): Promise<ServerResponse> => {
  /* Validate data coming from the client */
  const result = trackExpenseSchema.safeParse(data);
  if (!result.success) {
    return {
      isSuccessful: false,
      message: {
        title: 'Error!',
        description: 'Failed to add expense! Please try again'
      }
    };
  }

  await databaseConnect();

  /* Get user document */
  const user = await User.findById(result.data.userId);
  if (user === null) {
    return {
      isSuccessful: false,
      message: {
        title: 'Error!',
        description: 'Failed to add expense! Please try again'
      }
    };
  }

  /* Create new expense document */
  const expense = new Expense({
    user: new mongoose.Types.ObjectId(result.data.userId),
    wallet: new mongoose.Types.ObjectId(result.data.walletId),
    category: new mongoose.Types.ObjectId(result.data.categoryId),
    amount: result.data.amount,
    description: result.data.description,
    transactionDate: result.data.date
  });

  /* Update user's corresponding wallet balance */
  for (const wallet of user.wallets) {
    if (wallet._id == result.data.walletId) {
      wallet.balance! -= result.data.amount;
    }
  }

  await user.save();
  await expense.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: {
      title: 'Success!',
      description: 'Successfully added expense'
    }
  };
};
