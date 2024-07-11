import { z } from 'zod';
import trackIncomeSchema from './track-income';

const deleteIncomeTransactionSchema = z.object({
  incomes: z.array(trackIncomeSchema),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default deleteIncomeTransactionSchema;
