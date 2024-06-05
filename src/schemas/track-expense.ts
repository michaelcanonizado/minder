import { Description } from '@radix-ui/react-dialog';
import { z } from 'zod';

const trackExpenseSchema = z.object({
  amount: z.number().min(1, {
    message: 'Please enter the amount'
  }),
  description: z.string()
});

export default trackExpenseSchema;
