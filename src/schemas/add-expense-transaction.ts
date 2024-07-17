import { z } from 'zod';

const addExpenseTransactionSchema = z.object({
  amount: z.coerce.number({ message: 'Please enter a valid amount' }).min(1, {
    message: 'Please enter the amount'
  }),
  date: z.date({
    message: 'Please enter the date'
  }),
  walletId: z
    .string({ message: 'Please choose where to deduct' })
    .min(1, { message: 'Please choose where to deduct' }),
  categoryId: z
    .string({ message: 'Please choose the expense category' })
    .min(1, { message: 'Please choose the expense category' }),
  description: z
    .string({ message: 'Please describe the expense' })
    .min(1, { message: 'Please describe the expense' }),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default addExpenseTransactionSchema;
