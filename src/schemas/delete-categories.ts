import { z } from 'zod';

const deleteCategoriesSchema = z.object({
  categories: z.array(z.string()),
  type: z.enum(['income', 'expense']),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default deleteCategoriesSchema;
