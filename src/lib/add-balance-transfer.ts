'use server';

import { databaseClose, databaseConnect } from '@/helpers/database';
import User from '@/models/user';
import trackBalanceTransferSchema from '@/schemas/track-balance-transfer';

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

  console.log(result);

  await databaseConnect();

  // Get user document
  const user = await User.findById(result.data.userId);
  if (user === null) {
    return {
      isSuccessful: false,
      message: 'Failed to add expense! Please try again'
    };
  }

  await databaseClose();

  return {
    isSuccessful: true,
    message: 'Successfully added expense'
  };
};
