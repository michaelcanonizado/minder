'use server';

import { databaseConnect } from '@/helpers/database/database';
import User, { UserType } from '@/models/user';

export interface CategoriesType {
  data: Pick<UserType, 'categories'>['categories'];
}

/**
 * Gets the categories of the user
 *
 * @param userId _id of user
 * @returns the categories object of the user
 */
export const getCategoriesData = async (userId: string) => {
  await databaseConnect();

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found!');
  }

  return {
    data: JSON.parse(JSON.stringify(user.categories))
  } as CategoriesType;
};
