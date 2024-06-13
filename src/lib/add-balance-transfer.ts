'use server';

import { databaseClose, databaseConnect } from '@/helpers/database';
import BalanceTransfer from '@/models/balance-transfer';
import User from '@/models/user';
import trackBalanceTransferSchema from '@/schemas/track-balance-transfer';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

export const addBalanceTransfer = async (data: unknown) => {
  // Validate data coming from the client
  const result = trackBalanceTransferSchema.safeParse(data);
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
      message: 'Failed to transfer balance! Please try again'
    };
  }

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

  const sourceWallet = user.wallets.id(result.data.sourceWalletId);
  const destinationWallet = user.wallets.id(result.data.destinationWalletId);

  sourceWallet.balance -= result.data.amount;
  destinationWallet.balance += result.data.amount;

  await balanceTransfer.save();
  await user.save();

  await databaseClose();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully transferred balance'
  };
};
