import { z } from 'zod';

const trackIncomeSchema = z.object({
  amount: z.coerce.number({ message: 'Please enter a valid amount' }).min(1, {
    message: 'Please enter the amount'
  }),
  walletId: z
    .string({ message: 'Please choose where to add' })
    .min(1, { message: 'Please choose where to add' }),
  categoryId: z
    .string({ message: 'Please choose the income category' })
    .min(1, { message: 'Please choose the income category' }),
  description: z.string({ message: 'Please describe the expense' }).optional()
});

export default trackIncomeSchema;
