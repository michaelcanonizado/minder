import { z } from 'zod';

const categorySchema = z.object({
  _id: z
    .string({ message: 'Error! Please try again' })
    .min(1, { message: 'Error! Please try again' }),
  name: z
    .string({ message: 'Error! Please try again' })
    .min(1, { message: 'Error! Please try again' })
});

const deleteCategoriesSchema = z.object({
  categories: z.array(categorySchema),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default deleteCategoriesSchema;
