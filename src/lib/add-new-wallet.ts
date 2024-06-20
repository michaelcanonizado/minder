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

  const userId = process.env.TEMP_USER_ID;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  // user.wallets.push({ name: 'None' });

  // await user.save()

  // console.log(user.wallets);

  return;
};
