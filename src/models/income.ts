import mongoose, { Types, Schema, HydratedDocument, Model } from 'mongoose';
import { UserCategoryType, UserType, UserWalletType } from './user';

export interface IncomeType {
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

type IncomeHydratedDocument = HydratedDocument<IncomeType>;
type IncomeModelType = Model<IncomeType, {}, {}, {}, IncomeHydratedDocument>;

const incomeSchema = new Schema<IncomeType>(
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

const Income =
  (mongoose.models.Income as IncomeModelType) ||
  mongoose.model<IncomeType, IncomeModelType>('Income', incomeSchema);
export default Income;
