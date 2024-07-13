import { z } from 'zod';

const addWalletSchema = z.object({
  name: z
    .string({ message: 'Please name the wallet' })
    .min(1, { message: 'Please name the wallet' }),
  balance: z.coerce.number({ message: 'Please enter a valid amount' }),

  userId: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' }),
  formPath: z
    .string({ message: 'Error! Please try again.' })
    .min(1, { message: 'Error! Please try again.' })
});

export default addWalletSchema;
