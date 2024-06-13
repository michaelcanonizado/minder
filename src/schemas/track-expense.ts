import { z } from 'zod';

const trackExpenseSchema = z.object({
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
    .string({ message: 'Please choose where to deduct' })
    .min(1, { message: 'Please choose where to deduct' }),
  categoryId: z
    .string({ message: 'Please choose the expense category' })
    .min(1, { message: 'Please choose the expense category' }),
  description: z
    .string({ message: 'Please describe the expense' })
    .min(1, { message: 'Please describe the expense' }),
  formPath: z
    .string({ message: 'UserId missing please restart page!' })
    .min(1, { message: 'UserId missing please restart page!' })
});

export default trackExpenseSchema;
