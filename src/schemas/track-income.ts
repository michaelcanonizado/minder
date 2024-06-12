import { z } from 'zod';

const trackIncomeSchema = z.object({
  amount: z.coerce.number({ message: 'Please enter a valid amount' }).min(1, {
    message: 'Please enter the amount'
  }),
  date: z.date({
    message: 'Please enter the date'
  }),
  userId: z
    .string({ message: 'UserId missing please restart page!' })
    .min(1, { message: 'UserId missing please restart page!' }),
  walletId: z
    .string({ message: 'Please choose where to add' })
    .min(1, { message: 'Please choose where to add' }),
  categoryId: z
    .string({ message: 'Please choose the income category' })
    .min(1, { message: 'Please choose the income category' }),
  description: z
    .string({ message: 'Please describe the income' })
    .min(1, { message: 'Please describe the income' })
});

export default trackIncomeSchema;
