import {
  Types,
  HydratedDocument,
  Schema,
  Model,
  model,
  models
} from 'mongoose';
import { UserCategoryType, UserType, UserWalletType } from './user';

export interface ExpenseType {
  _id: Types.ObjectId;
  user: Types.ObjectId & UserType;
  wallet: Types.ObjectId & UserWalletType;
  category: Types.ObjectId & UserCategoryType;
  amount: number;
  description: string;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

type ExpenseHydratedDocument = HydratedDocument<ExpenseType>;
type ExpenseModelType = Model<ExpenseType, {}, {}, {}, ExpenseHydratedDocument>;

const expenseSchema = new Schema<ExpenseType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    wallet: {
      type: Schema.Types.ObjectId,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
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

const Expense =
  (models.Expense as ExpenseModelType) ||
  model<ExpenseType, ExpenseModelType>('Expense', expenseSchema);
export default Expense;
