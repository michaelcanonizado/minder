'use server';

import User from '@/models/user';
import { databaseConnect } from '@/helpers/database/database';

import addCategorySchema from '@/schemas/add-cetegory';
import { CategoryType, categoryColors } from '@/types';
import { revalidatePath } from 'next/cache';

export const addNewCategory = async (data: unknown, type: CategoryType) => {
  const result = addCategorySchema.safeParse(data);
  if (!result.success) {
    return {
      isSuccessful: false,
      message: 'Failed to add category! Please try again'
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
      message: 'Failed to add category! Please try again'
    };
  }

  await databaseConnect();

  const userId = process.env.TEMP_USER_ID;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  if (type === 'income') {
    user.categories.income.push({
      name: result.data.name,
      color: selectedColor
    });
  } else if (type === 'expense') {
    user.categories.expense.push({
      name: result.data.name,
      color: selectedColor
    });
  }

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully added category!'
  };
};
