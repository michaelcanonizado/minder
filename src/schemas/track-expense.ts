import { z } from 'zod';

const trackExpenseSchema = z.object({
  amount: z.coerce.number({ message: 'Please enter a valid amount' }).min(1, {
    message: 'Please enter the amount'
  }),
  description: z
    .string({ message: 'Please describe the expense' })
    .min(1, { message: 'Please describe the expense' })
});

export default trackExpenseSchema;
