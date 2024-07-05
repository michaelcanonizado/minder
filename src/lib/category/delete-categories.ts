'use server';

import { databaseConnect } from '@/helpers/database/database';
import User from '@/models/user';

import deleteCategoriesSchema from '@/schemas/delete-categories';

export const deleteCateogries = async (data: unknown) => {
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

  result.data.categories.forEach(category => {
    const matchCategory = user.categories.income.id(category._id);
    if (matchCategory) {
      matchCategory.isDeleted.status = true;
      matchCategory.isDeleted.deletedAt = new Date();
    }
  });

  console.log(user.categories.income);

  //   console.log(result);

  return;
};
