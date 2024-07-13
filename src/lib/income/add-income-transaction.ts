'use server';

import { databaseConnect } from '@/helpers/database/database';
import Income from '@/models/income';
import User from '@/models/user';
import trackIncomeSchema from '@/schemas/track-income';
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
  /* Validate data coming from the client */
  const result = trackIncomeSchema.safeParse(data);
  if (!result.success) {
    return {
      isSuccessful: false,
      message: {
        title: 'Error!',
        description: 'Failed to add income! Please try again'
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
        title: 'Error',
        description: 'Failed to add income! Please try again'
      }
    };
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
    message: {
      title: 'Success!',
      description: 'Successfully added income'
    }
  };
};
