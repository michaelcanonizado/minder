import { databaseClose, databaseConnect } from '@/helpers/database';
import User from '@/models/user';

export const getBalanceData = async (userId: string) => {
  await databaseConnect();

  const user = await User.findById(userId);

  if (!user) {
    console.log('User not found...');
    return;
  }
  console.log('User found!');

  await databaseClose();
  return;
};
