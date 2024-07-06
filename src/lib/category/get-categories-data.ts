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
export const getCategoriesData = async (
  userId: string,
  showDeleted = false
) => {
  await databaseConnect();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  let data = JSON.parse(
    JSON.stringify(user.categories)
  ) as typeof user.categories;

  if (!showDeleted) {
    const filteredIncomeCategories = data.income.filter(category => {
      if (category.isDeleted?.status !== true) {
        return category;
      }
    }) as typeof data.income;

    const filteredExpenseCategories = data.expense.filter(category => {
      if (category.isDeleted?.status !== true) {
        return category;
      }
    }) as typeof data.expense;

    data = {
      income: filteredIncomeCategories,
      expense: filteredExpenseCategories
    };
  }

  return {
    data: data
  } as CategoriesType;
};
