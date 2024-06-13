import { databaseClose, databaseConnect } from '@/helpers/database';
import User, { UserCategoryType, UserWalletType } from '@/models/user';

export const getWalletsAndCategoriesData = async (userId: string) => {
  await databaseConnect();

  const data = await User.findById(userId);

  if (!data) {
    return {
      wallets: [],
      categories: []
    };
  }

  await databaseClose();

  return {
    wallets: JSON.parse(JSON.stringify(data.wallets)) as UserWalletType[],
    categories: JSON.parse(
      JSON.stringify(data.categories)
    ) as UserCategoryType[]
  };
};
