import mongoose from 'mongoose';

export interface IncomeType {
  user: mongoose.Types.ObjectId;
  wallet: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  amount: number;
  description: string;
  transactionDate: Date;
}

export type IncomeHydratedDocument = mongoose.HydratedDocument<IncomeType>;
type IncomeModelType = mongoose.Model<
  IncomeType,
  {},
  {},
  {},
  IncomeHydratedDocument
>;

const incomeSchema = new mongoose.Schema<IncomeType>(
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

const Income = mongoose.model<IncomeType, IncomeModelType>(
  'IncomeV2',
  incomeSchema
);
export default Income;
