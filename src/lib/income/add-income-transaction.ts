'use server';

import { databaseConnect } from '@/helpers/database/database';
import Income from '@/models/income';
import User from '@/models/user';
import addIncomeTransactionSchema from '@/schemas/add-income-transaction';
import { ServerResponse } from '@/types';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

/**
 * Records an income of the user
 *
 * @param data data submitted from the form
 * @returns a response object about the success state
 */
export const addIncomeTransaction = async (
  data: unknown
): Promise<ServerResponse> => {
  const errorResponse = {
    isSuccessful: false,
    resetForm: true,
    message: {
      title: 'Error!',
      description: 'Failed to add income! Please try again'
    }
  };

  /* Validate data coming from the client */
  const result = addIncomeTransactionSchema.safeParse(data);
  if (!result.success) {
    return errorResponse;
  }

  await databaseConnect();

  /* Get user document */
  const user = await User.findById(result.data.userId);
  if (user === null) {
    return errorResponse;
  }

  /* Create new income document */
  const income = new Income({
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
      wallet.balance! += result.data.amount;
    }
  }

  await user.save();
  await income.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    resetForm: true,
    message: {
      title: 'Success!',
      description: 'Successfully added income'
    }
  };
};
