'use server';

import { databaseConnect } from '@/helpers/database/database';
import User from '@/models/user';

import deleteCategoriesSchema from '@/schemas/delete-categories';
import { CategoryType } from '@/types';
import { revalidatePath } from 'next/cache';

export const deleteCateogries = async (data: unknown, type: CategoryType) => {
  const result = deleteCategoriesSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return {
      isSuccessful: false,
      message: 'Failed to add income! Please try again'
    };
  }

  await databaseConnect();

  const user = await User.findById(result.data.userId);
  if (!user) {
    throw new Error('User not found!');
  }

  const userCategories =
    type === 'income' ? user.categories.income : user.categories.expense;

  result.data.categories.forEach(selectedCategory => {
    const matchCategory = userCategories.id(selectedCategory._id);
    if (matchCategory) {
      matchCategory.isDeleted.status = true;
      matchCategory.isDeleted.deletedAt = new Date();
    }
  });

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully deleted categories'
  };
};
