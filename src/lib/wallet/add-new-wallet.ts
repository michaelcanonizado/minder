'use server';

import { databaseConnect } from '@/helpers/database/database';
import User from '@/models/user';
import addWalletSchema from '@/schemas/add-wallet';
import { ServerResponse } from '@/types';

import { revalidatePath } from 'next/cache';

/**
 * Adds a new wallet to the user's document
 *
 * @param data data submitted from the form
 * @returns a response object about the success state
 */
export const addNewWallet = async (data: unknown): Promise<ServerResponse> => {
  const errorResponse = {
    isSuccessful: false,
    resetForm: true,
    message: {
      title: 'Error!',
      description: 'Failed to add income! Please try again'
    }
  };

  /* Validate data coming from the client */
  const result = addWalletSchema.safeParse(data);
  if (!result.success) {
    return errorResponse;
  }

  await databaseConnect();

  /* Get user document */
  const user = await User.findById(result.data.userId);
  if (!user) {
    return errorResponse;
  }

  /* Add wallet */
  user.wallets.push({
    name: result.data.name,
    balance: result.data.balance
  });

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    resetForm: true,
    message: {
      title: 'Success!',
      description: 'Successfully added wallet'
    }
  };
};
