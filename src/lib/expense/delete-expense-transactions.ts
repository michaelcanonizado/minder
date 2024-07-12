'use server';

import { databaseConnect } from '@/helpers/database/database';
import Expense from '@/models/expense';
import User from '@/models/user';

import deleteExpenseTransactionSchema from '@/schemas/delete-expense-transaction';
import { revalidatePath } from 'next/cache';

export const deleteExpenseTransactions = async (data: unknown) => {
  const result = deleteExpenseTransactionSchema.safeParse(data);
  if (!result.success) {
    return {
      isSuccessful: false,
      message: 'Failed to delete expense! Please try again'
    };
  }

  await databaseConnect();

  const expenseTransactionIds = result.data.expenses;
  const userId = result.data.userId;

  const user = await User.findById(userId);
  if (!user) {
    return {
      isSuccessful: false,
      message: 'Error deleting expense! Failed to get user document.'
    };
  }

  const responses = await Promise.all(
    expenseTransactionIds.map(async transactionId => {
      try {
        const expense = await Expense.findOne({
          _id: transactionId,
          user: userId
        });
        if (!expense) {
          return {
            isSuccessful: false,
            message: 'Error deleting expense! Could not find expense.'
          };
        }

        const expenseAmount = expense.amount;
        const transactionWallet = user.wallets.id(expense.wallet);
        if (!transactionWallet) {
          return {
            isSuccessful: false,
            message:
              'Error deleting expense! Could not find corresponding wallet.'
          };
        }

        const response = await expense.deleteOne();
        if (response.deletedCount === 0) {
          return response;
        }
        transactionWallet.balance += expenseAmount;

        return response;
      } catch (error) {
        console.log(error);
        return {
          isSuccessful: false,
          message: 'Error deleting expense! Failed to find expense.'
        };
      }
    })
  );

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: 'Successfully deleted expenses'
  };
};
