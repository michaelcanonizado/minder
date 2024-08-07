'use server';

import { databaseConnect } from '@/helpers/database/database';
import User, { UserType } from '@/models/user';

export interface CategoriesType {
  data: Pick<UserType, 'categories'>['categories'];
}

/**
 * Gets the income and expense categories of the user
 *
 * @param userId _id of user
 * @param showDeleted (optional) show deleted categories
 * @returns the categories object of the user
 */
export const getCategoriesData = async (
  userId: string,
  options = {
    showDeleted: false
  }
) => {
  await databaseConnect();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  let data = JSON.parse(
    JSON.stringify(user.categories)
  ) as typeof user.categories;

  if (!options.showDeleted) {
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
