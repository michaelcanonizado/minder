import { databaseConnect } from '@/helpers/database';
import User, { UserType } from '@/models/user';

export const getWalletsAndCategoriesData = async (userId: string) => {
  await databaseConnect();

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found!');
  }

  return {
    wallets: JSON.parse(JSON.stringify(user.wallets)) as Pick<
      UserType,
      'wallets'
    >['wallets'],
    categories: JSON.parse(JSON.stringify(user.categories)) as Pick<
      UserType,
      'categories'
    >['categories']
  };
};
