'use server';

import { databaseClose, databaseConnect } from '@/helpers/database';
import trackIncomeSchema from '@/schemas/track-income';

export const addIncomeTransaction = async (data: unknown) => {
  console.log('SS: Adding income to database...');

  const result = trackIncomeSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return {
      isSuccessful: false,
      message: 'Failed to add income! Please try again'
    };
  }

  console.log(result);

  await databaseConnect();

  console.log('data sent...!');
  console.log('Returning...!');

  await databaseClose();

  return {
    isSuccessful: true,
    message: 'Successfully added income'
  };
};
