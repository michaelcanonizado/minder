'use server';

import { databaseConnect } from '@/helpers/database/database';
import Expense from '@/models/expense';
import User from '@/models/user';
import deleteExpenseTransactionSchema from '@/schemas/delete-expense-transaction';
import { ServerResponse } from '@/types';
import { revalidatePath } from 'next/cache';

export const deleteExpenseTransactions = async (
  data: unknown
): Promise<ServerResponse> => {
  const errorResponse = {
    isSuccessful: false,
    message: {
      title: 'Error!',
      description: 'Failed to delete expense! Please try again'
    }
  };

  const result = deleteExpenseTransactionSchema.safeParse(data);
  if (!result.success) {
    return errorResponse;
  }

  await databaseConnect();

  const expenseTransactionIds = result.data.expenses;
  const userId = result.data.userId;

  const user = await User.findById(userId);
  if (!user) {
    return errorResponse;
  }

  let isErrorDeleting: boolean = false;
  const expenses = await Promise.all(
    expenseTransactionIds.map(async transactionId => {
      try {
        const expense = await Expense.findOne({
          _id: transactionId,
          user: userId
        });
        if (!expense) {
          throw new Error('Error deleting expense! Could not find expense.');
        }

        return expense;
      } catch (error) {
        console.log(error);
        isErrorDeleting = true;
      }
    })
  );

  if (isErrorDeleting) {
    return errorResponse;
  }

  for (const expense of expenses) {
    const expenseAmount = expense?.amount;
    const transactionWallet = user.wallets.id(expense?.wallet);
    if (!transactionWallet) {
      return errorResponse;
    }

    const response = await expense?.deleteOne();
    if (response?.deletedCount === 0) {
      return errorResponse;
    }
    transactionWallet.balance += expenseAmount;
  }

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: {
      title: 'Success!',
      description: 'Successfully deleted expenses'
    }
  };
};
