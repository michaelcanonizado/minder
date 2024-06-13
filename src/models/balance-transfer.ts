import {
  Types,
  Schema,
  HydratedDocument,
  Model,
  model,
  models
} from 'mongoose';
import { UserType, UserWalletType } from './user';

export interface BalanceTransferType {
  _id: Types.ObjectId;
  user: Types.ObjectId & UserType;
  sourceWallet: Types.ObjectId & UserWalletType;
  destinationWallet: Types.ObjectId & UserWalletType;
  amount: number;
  description: string;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

type BalanceTransferHydratedDocument = HydratedDocument<BalanceTransferType>;
type BalanceTransferModelType = Model<
  BalanceTransferType,
  {},
  {},
  {},
  BalanceTransferHydratedDocument
>;

const balanceTransferSchema = new Schema<BalanceTransferType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sourceWallet: {
      type: Schema.Types.ObjectId,
      required: true
    },
    destinationWallet: {
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

const BalanceTransfer =
  (models.BalanceTransfer as BalanceTransferModelType) ||
  model<BalanceTransferType, BalanceTransferModelType>(
    'BalanceTransfer',
    balanceTransferSchema
  );
export default BalanceTransfer;
