'use server';

import mongoose from 'mongoose';
import { databaseConnect } from '@/helpers/database/database';
import BalanceTransfer from '@/models/balance-transfer';
import User from '@/models/user';
import trackBalanceTransferSchema from '@/schemas/track-balance-transfer';

import { revalidatePath } from 'next/cache';

/**
 * Transfers balance between the user's wallets
 *
 * @param data data submitted from the form
 * @returns a response object about the success state
 */
export const addWalletTransfer = async (data: unknown) => {
  /* Validate data coming from the client */
  const result = trackBalanceTransferSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return {
      isSuccessful: false,
      message: 'Failed to add expense! Please try again'
    };
  }

  await databaseConnect();

  /* Get user document */
  const user = await User.findById(result.data.userId);
  if (user === null) {
    return {
      isSuccessful: false,
      message: 'Failed to transfer balance! Please try again'
    };
  }

  /* Create new balance transfer document */
  const balanceTransfer = new BalanceTransfer({
    user: new mongoose.Types.ObjectId(result.data.userId),
    sourceWallet: new mongoose.Types.ObjectId(result.data.sourceWalletId),
    destinationWallet: new mongoose.Types.ObjectId(
      result.data.destinationWalletId
    ),
    amount: result.data.amount,
    description: result.data.description,
    transactionDate: result.data.date
  });

  /* Find wallets in user's wallets */
  const sourceWallet = user.wallets.id(result.data.sourceWalletId);
  const destinationWallet = user.wallets.id(result.data.destinationWalletId);

  /* Transfer balance */
  sourceWallet.balance -= result.data.amount;
  destinationWallet.balance += result.data.amount;

  await balanceTransfer.save();
  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully transferred balance'
  };
};
