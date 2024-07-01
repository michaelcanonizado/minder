'use server';

import { databaseConnect } from '@/helpers/database/database';
import { Period } from '@/types';

export const getCategoriesChartData = async (
  userId: string,
  period: Period
) => {
  await databaseConnect();
  console.log('Categories: ');
  return;
};
