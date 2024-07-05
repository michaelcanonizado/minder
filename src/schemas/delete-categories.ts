import { z } from 'zod';

const deleteCategoriesSchema = z.object({
  // categoryId: z
  //   .string({ message: 'Please name the wallet' })
  //   .min(1, { message: 'Please name the wallet' }),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default deleteCategoriesSchema;
