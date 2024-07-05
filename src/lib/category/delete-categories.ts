'use server';

import deleteCategoriesSchema from '@/schemas/delete-categories';

export const deleteCateogries = async (data: unknown) => {
  const result = deleteCategoriesSchema.safeParse(data);

  console.log(result);

  return;
};
