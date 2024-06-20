'use server';

import { databaseConnect } from '@/helpers/database';
import User from '@/models/user';
import addWalletSchema from '@/schemas/add-wallet';
import { revalidatePath } from 'next/cache';

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

  user.wallets.push({
    name: result.data.name,
    balance: result.data.balance
  });

  await user.save();

  console.log(user.wallets);

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully added wallet'
  };
};
