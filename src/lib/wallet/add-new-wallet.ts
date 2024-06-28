'use server';

import { databaseConnect } from '@/helpers/database/database';
import User from '@/models/user';
import addWalletSchema from '@/schemas/add-wallet';

import { revalidatePath } from 'next/cache';

/**
 * Adds a new wallet to the user's document
 *
 * @param data data submitted from the form
 * @returns a response object about the success state
 */
export const addNewWallet = async (data: unknown) => {
  /* Validate data coming from the client */
  const result = addWalletSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return {
      isSuccessful: false,
      message: 'Failed to add income! Please try again'
    };
  }

  await databaseConnect();

  /* Get user document */
  const user = await User.findById(result.data.userId);
  if (!user) {
    throw new Error('User not found!');
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
    message: 'Successfully added wallet'
  };
};
