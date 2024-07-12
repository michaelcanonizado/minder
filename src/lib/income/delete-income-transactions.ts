'use server';

import { databaseConnect } from '@/helpers/database/database';
import Income from '@/models/income';
import User from '@/models/user';

import deleteIncomeTransactionSchema from '@/schemas/delete-income-transaction';
import { revalidatePath } from 'next/cache';

export const deleteIncomeTransactions = async (data: unknown) => {
  const result = deleteIncomeTransactionSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return {
      isSuccessful: false,
      message: 'Failed to delete income! Please try again'
    };
  }

  await databaseConnect();

  console.log(result.data);

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully deleted categories'
  };
};
