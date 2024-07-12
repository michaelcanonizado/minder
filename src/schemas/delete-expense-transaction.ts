import { z } from 'zod';

const deleteExpenseTransactionSchema = z.object({
  expenses: z.array(z.string()),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default deleteExpenseTransactionSchema;
