'use server';

import { databaseConnect } from '@/helpers/database/database';
import User from '@/models/user';
import deleteCategoriesSchema from '@/schemas/delete-categories';
import { CategoryType, ServerResponse } from '@/types';
import { revalidatePath } from 'next/cache';

export const deleteCateogries = async (
  data: unknown,
  type: CategoryType
): Promise<ServerResponse> => {
  const errorResponse = {
    isSuccessful: false,
    resetForm: true,
    message: {
      title: 'Error!',
      description: 'Failed to delete category! Please try again'
    }
  };

  const result = deleteCategoriesSchema.safeParse(data);
  if (!result.success) {
    return errorResponse;
  }

  await databaseConnect();

  const user = await User.findById(result.data.userId);
  if (!user) {
    return errorResponse;
  }

  const userCategories =
    type === 'income' ? user.categories.income : user.categories.expense;

  result.data.categories.forEach(id => {
    const matchCategory = userCategories.id(id);
    if (matchCategory) {
      matchCategory.isDeleted.status = true;
      matchCategory.isDeleted.deletedAt = new Date();
    }
  });

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    resetForm: true,
    message: {
      title: 'Success!',
      description: 'Successfully deleted categories'
    }
  };
};
