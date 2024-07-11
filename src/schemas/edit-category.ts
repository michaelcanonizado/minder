import { z } from 'zod';

const editCategorySchema = z.object({
  _id: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  name: z
    .string({ message: 'Please name the category' })
    .min(1, { message: 'Please name the category' }),
  colorId: z
    .string({ message: 'Please choose a color' })
    .min(1, { message: 'Please choose a color' }),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default editCategorySchema;
