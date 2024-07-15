'use server';

import { databaseConnect } from '@/helpers/database/database';
import BalanceTransfer from '@/models/balance-transfer';
import User from '@/models/user';
import deleteBalanceTransfersSchema from '@/schemas/delete-balance-transfers';
import { ServerResponse } from '@/types';
import { revalidatePath } from 'next/cache';

export const deleteBalanceTransfers = async (
  data: unknown
): Promise<ServerResponse> => {
  const errorResponse = {
    isSuccessful: false,
    message: {
      title: 'Error!',
      description: 'Failed to delete balance transfer! Please try again'
    }
  };

  const result = deleteBalanceTransfersSchema.safeParse(data);
  if (!result.success) {
    return errorResponse;
  }

  await databaseConnect();

  const balanceTransferIds = result.data.balanceTransfers;
  const userId = result.data.userId;
  const user = await User.findById(userId);
  if (!user) {
    return errorResponse;
  }

  let isErrorDeleting: boolean = false;
  const balanceTransfers = await Promise.all(
    balanceTransferIds.map(async transferId => {
      try {
        const balanceTransfer = await BalanceTransfer.findOne({
          _id: transferId,
          user: userId
        });
        if (!balanceTransfer) {
          throw new Error('Could not find balance transfer in database!');
        }

        return balanceTransfer;
      } catch (error) {
        console.log(error);
        isErrorDeleting = true;
      }
    })
  );

  if (isErrorDeleting) {
    return errorResponse;
  }

  for (const balanceTransfer of balanceTransfers) {
    if (!balanceTransfer) {
      continue;
    }

    const transferAmount = balanceTransfer.amount;

    const sourceWallet = user.wallets.id(balanceTransfer.sourceWallet);
    if (!sourceWallet) {
      return errorResponse;
    }
    const destinationWallet = user.wallets.id(
      balanceTransfer.destinationWallet
    );
    if (!destinationWallet) {
      return errorResponse;
    }

    const response = await balanceTransfer.deleteOne();
    if (response?.deletedCount === 0) {
      return errorResponse;
    }

    destinationWallet.balance -= transferAmount;
    sourceWallet.balance += transferAmount;
  }

  await user.save();

  revalidatePath(result.data.formPath);

  return {
    isSuccessful: true,
    message: {
      title: 'Success!',
      description: 'Successfully deleted balance transfers'
    }
  };
};
