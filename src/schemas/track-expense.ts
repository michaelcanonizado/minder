import { z } from 'zod';

const trackExpenseSchema = z.object({
  amount: z.coerce.number({ message: 'Please enter a valid amount' }).min(1, {
    message: 'Please enter the amount'
  }),
  walletId: z
    .string({ message: 'Please choose where to deduct' })
    .min(1, { message: 'Please choose where to deduct' }),
  categoryId: z
    .string({ message: 'Please choose the expense category' })
    .min(1, { message: 'Please choose the expense category' }),
  description: z
    .string({ message: 'Please describe the expense' })
    .min(1, { message: 'Please describe the expense' })
});

export default trackExpenseSchema;
