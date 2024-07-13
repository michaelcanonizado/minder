'use server';

import { databaseConnect } from '@/helpers/database/database';
import User from '@/models/user';
import addCategorySchema from '@/schemas/add-cetegory';
import { CategoryType, ServerResponse, categoryColors } from '@/types';
import { revalidatePath } from 'next/cache';

export const addNewCategory = async (
  data: unknown,
  type: CategoryType
): Promise<ServerResponse> => {
  const result = addCategorySchema.safeParse(data);
  if (!result.success) {
    return {
      isSuccessful: false,
      message: {
        title: 'Error!',
        description: 'Failed to add category! Please try again'
      }
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
      message: {
        title: 'Error!',
        description: 'Failed to add category! Please try again'
      }
    };
  }

  await databaseConnect();

  const userId = process.env.TEMP_USER_ID;
  const user = await User.findById(userId);
  if (!user) {
    return {
      isSuccessful: false,
      message: {
        title: 'Error!',
        description: 'Failed to add category! Please try again'
      }
    };
  }

  if (type === 'income') {
    user.categories.income.push({
      name: result.data.name,
      color: selectedColor,
      isDeleted: {
        status: false,
        deletedAt: null
      }
    });
  } else if (type === 'expense') {
    user.categories.expense.push({
      name: result.data.name,
      color: selectedColor,
      isDeleted: {
        status: false,
        deletedAt: null
      }
    });
  }

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: {
      title: 'Success!',
      description: 'Successfully added category'
    }
  };
};
