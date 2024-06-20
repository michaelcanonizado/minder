'use server';

import { databaseConnect } from '@/helpers/database';
import User from '@/models/user';
import addWalletSchema from '@/schemas/add-wallet';

export const addNewWallet = async (data: unknown) => {
  const result = addWalletSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return {
      isSuccessful: false,
      message: 'Failed to add income! Please try again'
    };
  }
  console.log(result);

  await databaseConnect();

  const user = await User.findById(result.data.userId);
  if (!user) {
    throw new Error('User not found!');
  }

  // user.wallets.push({ name: 'None' });

  // await user.save()

  console.log(user.wallets);

  return {
    isSuccessful: true,
    message: 'Successfully added wallet'
  };

  return;
};
