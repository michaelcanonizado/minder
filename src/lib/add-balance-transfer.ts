'use server';

import { databaseClose, databaseConnect } from '@/helpers/database';
import BalanceTransfer, { IBalanceTransfer } from '@/models/balance-transfer';
import User from '@/models/user';
import trackBalanceTransferSchema from '@/schemas/track-balance-transfer';
import mongoose, { HydratedDocument } from 'mongoose';

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
      message: 'Failed to add expense! Please try again'
    };
  }

  const balanceTransfer: HydratedDocument<IBalanceTransfer> =
    new BalanceTransfer({
      user: result.data.userId,
      sourceWallet: result.data.sourceWalletId,
      // destinationWallet: result.data.destinationWalletId,
      destinationWallet: new mongoose.Types.ObjectId(
        result.data.destinationWalletId
      ),
      amount: result.data.amount,
      description: result.data.description,
      transactionDate: result.data.date
    });

  await balanceTransfer.save();

  console.log('Balance Transfer: ', balanceTransfer);

  await databaseClose();

  return {
    isSuccessful: true,
    message: 'Successfully added expense'
  };
};
