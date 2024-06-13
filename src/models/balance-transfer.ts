import mongoose, { InferSchemaType, HydratedDocument } from 'mongoose';
import { UserType, UserWalletType } from './user';

export interface IBalanceTransfer {
  user: mongoose.Types.ObjectId;
  sourceWallet: mongoose.Types.ObjectId;
  destinationWallet: mongoose.Types.ObjectId;
  amount: number;
  description: string;
  transactionDate: Date;
}
type BalanceTransferHydratedDocument = HydratedDocument<IBalanceTransfer>;

const balanceTransferSchema = new mongoose.Schema<
  IBalanceTransfer,
  mongoose.Model<IBalanceTransfer, {}, {}, {}, BalanceTransferHydratedDocument>,
  {},
  {},
  {},
  {},
  BalanceTransferHydratedDocument
>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sourceWallet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    destinationWallet: {
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

// export interface BalanceTransferType {
//   user: UserType;
//   sourceWallet: UserWalletType;
//   destinationWallet: UserWalletType;
//   amount: number;
//   description: number;
//   transactionDate: Date;
//   createdAt: Date;
//   updatedAt: Date;
//   __v?: number;
// }

const BalanceTransfer =
  mongoose.models.BalanceTransfer ||
  mongoose.model<IBalanceTransfer, BalanceTransferHydratedDocument>(
    'BalanceTransfer',
    balanceTransferSchema
  );
export default BalanceTransfer;
