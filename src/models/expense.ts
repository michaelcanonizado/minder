import mongoose, { InferSchemaType } from 'mongoose';
import { UserCategoryType, UserType, UserWalletType } from './user';

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    transactionDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export interface ExpenseType {
  user: UserType;
  wallet: UserWalletType;
  category: UserCategoryType;
  amount: number;
  description: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

const Expense =
  mongoose.models.Expense ||
  mongoose.model<InferSchemaType<typeof expenseSchema>>(
    'Expense',
    expenseSchema
  );
export default Expense;
