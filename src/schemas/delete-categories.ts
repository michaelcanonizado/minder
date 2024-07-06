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
  type: z.enum(['income', 'expense']),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default deleteCategoriesSchema;
