import { databaseConnect } from '@/helpers/database/database';
import User, { UserType } from '@/models/user';

export interface WalletsDataType {
  data: Pick<UserType, 'categories'>['categories'];
}

export const getCategoriesData = async (userId: string) => {
  await databaseConnect();

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found!');
  }

  return {
    data: JSON.parse(JSON.stringify(user.categories))
  };
};
