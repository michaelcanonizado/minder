import mongoose, { InferRawDocType, InferSchemaType, mongo } from 'mongoose';

export interface UserProfileType {
  username: string;
}

export interface UserCurrencyType {
  code: string;
  name: string;
}

export interface UserWalletType {
  name: string;
  balance: number;
  isDeleted: {
    status: boolean;
    deletedAt: Date | null;
  };
}

export interface UserType {
  profile: UserProfileType;
  currency: UserCurrencyType;
  wallets: Array<UserWalletType>;
}

type UserHydratedDocument = mongoose.HydratedDocument<
  UserType,
  {
    wallets: mongoose.HydratedArraySubdocument<UserWalletType[]>;
  }
>;
type UserModelType = mongoose.Model<UserType, {}, {}, {}, UserHydratedDocument>;

// -----------------------------------------------------

const profileSchema = new mongoose.Schema<UserProfileType>(
  {
    username: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const currencySchema = new mongoose.Schema<UserCurrencyType>(
  {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const walletSchema = new mongoose.Schema<UserWalletType>(
  {
    name: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      default: 0
    },
    isDeleted: {
      status: {
        type: Boolean,
        default: false
      },
      deletedAt: {
        type: Date,
        default: null
      }
    }
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema<UserType, UserModelType>(
  {
    profile: profileSchema,
    currency: currencySchema,
    wallets: {
      type: [walletSchema],
      required: true,
      default: []
    }
  },
  { timestamps: true }
);

const Person = mongoose.model<UserType, UserModelType>('Person', userSchema);
export default Person;
