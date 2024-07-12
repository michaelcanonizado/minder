'use server';

import { databaseConnect } from '@/helpers/database/database';
import Income from '@/models/income';
import User from '@/models/user';

import deleteIncomeTransactionSchema from '@/schemas/delete-income-transaction';
import { revalidatePath } from 'next/cache';

export const deleteIncomeTransactions = async (data: unknown) => {
  const result = deleteIncomeTransactionSchema.safeParse(data);
  if (!result.success) {
    return {
      isSuccessful: false,
      message: 'Failed to delete income! Please try again'
    };
  }

  await databaseConnect();

  const incomeTransactionIds = result.data.incomes;
  const userId = result.data.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Error deleting income! Failed to get user document.');
  }

  const responses = await Promise.all(
    incomeTransactionIds.map(async transactionId => {
      try {
        const income = await Income.findOne({
          _id: transactionId,
          user: userId
        });
        if (!income) {
          return {
            isSuccessful: false,
            message: 'Error deleting income! Could not find income.'
          };
        }

        const incomeAmount = income.amount;
        const transactionWallet = user.wallets.id(income.wallet);
        if (!transactionWallet) {
          return {
            isSuccessful: false,
            message:
              'Error deleting income! Could not find corresponding wallet.'
          };
        }

        const response = await income.deleteOne();
        if (response.deletedCount === 0) {
          return response;
        }
        transactionWallet.balance -= incomeAmount;

        return response;
      } catch (error) {
        console.log(error);
        return {
          isSuccessful: false,
          message: 'Error deleting income! Failed to find income.'
        };
      }
    })
  );

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully deleted incomes'
  };
};
