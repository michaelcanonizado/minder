'use server';

import { databaseConnect } from '@/helpers/database/database';
import User, { UserType } from '@/models/user';

export interface WalletsDataType {
  data: Pick<UserType, 'wallets'>['wallets'];
  currency: Pick<UserType, 'currency'>['currency'];
}

/**
 * Gets the wallets of the user
 *
 * @param userId _id of user
 * @returns the wallets array of the user and
 * currency
 */
export const getWalletsData = async (userId: string) => {
  await databaseConnect();

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found!');
  }

  return {
    data: JSON.parse(JSON.stringify(user.wallets)),
    currency: JSON.parse(JSON.stringify(user.currency))
  } as WalletsDataType;
};
