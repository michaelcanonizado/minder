import { databaseClose, databaseConnect } from '@/helpers/database';
import User, { UserType } from '@/models/user';
import mongoose from 'mongoose';

export const getWalletsAndCategoriesData = async (userId: string) => {
  await databaseConnect();

  const data = (await User.findById(
    new mongoose.Types.ObjectId(userId)
  )) as UserType;

  await databaseClose();

  return {
    wallets: data.wallets,
    categories: data.categories
  };
};
