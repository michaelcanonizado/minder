import { z } from 'zod';

const trackBalanceTransferSchema = z.object({
  amount: z.coerce.number({ message: 'Please enter a valid amount' }).min(1, {
    message: 'Please enter the amount'
  }),
  date: z.date({
    message: 'Please enter the date'
  }),
  userId: z
    .string({ message: 'Please choose the source' })
    .min(1, { message: 'Please choose the source' }),
  sourceWalletId: z
    .string({ message: 'Please choose the source' })
    .min(1, { message: 'Please choose the source' }),
  destinationWalletId: z
    .string({ message: 'Please choose the destination' })
    .min(1, { message: 'Please choose the destination' }),
  description: z
    .string({ message: 'Please describe the income' })
    .min(1, { message: 'Please describe the income' }),
  formPath: z
    .string({ message: 'Please choose the source' })
    .min(1, { message: 'Please choose the source' })
});

export default trackBalanceTransferSchema;
