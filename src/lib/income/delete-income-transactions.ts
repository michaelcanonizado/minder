'use server';

import { databaseConnect } from '@/helpers/database/database';
import Income from '@/models/income';
import User from '@/models/user';

import deleteIncomeTransactionSchema from '@/schemas/delete-income-transaction';
import { ServerResponse } from '@/types';
import { revalidatePath } from 'next/cache';

export const deleteIncomeTransactions = async (
  data: unknown
): Promise<ServerResponse> => {
  const errorResponse = {
    isSuccessful: false,
    message: {
      title: 'Error!',
      description: 'Failed to delete income! Please try again'
    }
  };

  const result = deleteIncomeTransactionSchema.safeParse(data);
  if (!result.success) {
    return errorResponse;
  }

  await databaseConnect();

  const incomeTransactionIds = result.data.incomes;
  const userId = result.data.userId;
  const user = await User.findById(userId);
  if (!user) {
    return errorResponse;
  }

  let isErrorDeleting: boolean = false;
  const incomes = await Promise.all(
    incomeTransactionIds.map(async transactionId => {
      try {
        const income = await Income.findOne({
          _id: transactionId,
          user: userId
        });
        if (!income) {
          throw new Error('Could not find income in database!');
        }

        return income;
      } catch (error) {
        console.log(error);
        isErrorDeleting = true;
      }
    })
  );

  if (isErrorDeleting) {
    return errorResponse;
  }

  for (const income of incomes) {
    const incomeAmount = income!.amount;
    const transactionWallet = user.wallets.id(income!.wallet);
    if (!transactionWallet) {
      return errorResponse;
    }

    const response = await income?.deleteOne();
    if (response?.deletedCount === 0) {
      return errorResponse;
    }
    transactionWallet.balance -= incomeAmount;
  }

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: {
      title: 'Success!',
      description: 'Successfully deleted incomes'
    }
  };
};
