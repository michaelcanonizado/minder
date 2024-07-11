'use server';

import User from '@/models/user';
import { databaseConnect } from '@/helpers/database/database';

import { CategoryType, categoryColors } from '@/types';
import { revalidatePath } from 'next/cache';
import editCategorySchema from '@/schemas/edit-category';

export const editCategory = async (data: unknown, type: CategoryType) => {
  const result = editCategorySchema.safeParse(data);
  if (!result.success) {
    return {
      isSuccessful: false,
      message: 'Failed to edit category! Please try again'
    };
  }

  const selectedColor = categoryColors.find(color => {
    if (color._id == result.data.colorId) {
      return color;
    }
  });

  if (!selectedColor) {
    return {
      isSuccessful: false,
      message: 'Failed to edit category! Please try again'
    };
  }

  await databaseConnect();

  const userId = process.env.TEMP_USER_ID;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  let category;
  if (type === 'income') {
    category = user.categories.income.id(result.data._id);
  } else if (type === 'expense') {
    category = user.categories.expense.id(result.data._id);
  }

  if (!category) {
    return {
      isSuccessful: false,
      message: 'Failed to edit category! Please try again'
    };
  }

  category.name = result.data.name;
  category.color = selectedColor;

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully edited category!'
  };
};
