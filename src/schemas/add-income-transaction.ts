import { z } from 'zod';

const addIncomeTransactionSchema = z.object({
  amount: z.coerce.number({ message: 'Please enter a valid amount' }).min(1, {
    message: 'Please enter the amount'
  }),
  date: z.date({
    message: 'Please enter the date'
  }),
  walletId: z
    .string({ message: 'Please choose where to add' })
    .min(1, { message: 'Please choose where to add' }),
  categoryId: z
    .string({ message: 'Please choose the income category' })
    .min(1, { message: 'Please choose the income category' }),
  description: z
    .string({ message: 'Please describe the income' })
    .min(1, { message: 'Please describe the income' }),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default addIncomeTransactionSchema;
