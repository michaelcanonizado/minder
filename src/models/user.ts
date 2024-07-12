import {
  Types,
  HydratedDocument,
  HydratedArraySubdocument,
  Schema,
  Model,
  model,
  models
} from 'mongoose';

export interface UserProfileType {
  username: string;
}
export interface UserCurrencyType {
  code: string;
  name: string;
}
export interface UserBalanceType {
  netBalance: number;
  totalIncome: number;
  totalExpense: number;
}
export interface UserColorType {
  _id: string;
  name: string;
  code: {
    primary: string;
    secondary: string;
  };
}
export interface UserCategoryType {
  name: string;
  _id?: Types.ObjectId & string;
  color: UserColorType;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: {
    status: boolean;
    deletedAt: Date | null;
  };
  __v?: number;
}
export interface UserWalletType {
  _id: string;
  name: string;
  balance?: number;
  transactionCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: {
    status: boolean;
    deletedAt: Date | null;
  };
  __v?: number;
}
export interface UserType {
  _id: Types.ObjectId & string;
  profile: UserProfileType;
  lastLogin: Date;
  currency: UserCurrencyType;
  balance: UserBalanceType;
  categories: {
    expense: UserCategoryType[];
    income: UserCategoryType[];
  };
  wallets: UserWalletType[];
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

type UserHydratedDocument = HydratedDocument<
  UserType,
  {
    wallets: HydratedArraySubdocument<UserWalletType[]>;
    categories: {
      expense: HydratedArraySubdocument<UserCategoryType[]>;
      income: HydratedArraySubdocument<UserCategoryType[]>;
    };
  }
>;
type UserModelType = Model<UserType, {}, {}, {}, UserHydratedDocument>;

const profileSchema = new Schema<UserProfileType>(
  {
    // Future properties:
    // firstName: 'michael',
    // lastName: 'canonizado',
    // username: 'mikey',
    // email: 'michael@gmail.com',
    // phone: '0123456789'
    username: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const currencySchema = new Schema<UserCurrencyType>(
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

const colorSchema = new Schema<UserColorType>({
  name: {
    type: String,
    required: true
  },
  code: {
    primary: {
      type: String,
      required: true
    },
    secondary: {
      type: String,
      required: true
    }
  },
  _id: {
    type: Types.ObjectId,
    required: true
  }
});

const categorySchema = new Schema<UserCategoryType>(
  {
    name: {
      type: String,
      required: true
    },
    color: {
      type: colorSchema,
      required: true
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

const walletSchema = new Schema<UserWalletType>(
  {
    name: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      default: 0
    },
    transactionCount: {
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

const balanceSchema = new Schema<UserBalanceType>(
  {
    netBalance: {
      type: Number,
      default: 0
    },
    totalIncome: {
      type: Number,
      default: 0
    },
    totalExpense: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const userSchema = new Schema<UserType>(
  {
    profile: {
      type: profileSchema
    },
    lastLogin: {
      type: Date,
      default: new Date()
    },
    currency: {
      type: currencySchema
    },
    balance: {
      type: balanceSchema,
      default: {}
    },
    categories: {
      expense: {
        type: [categorySchema],
        default: []
      },
      income: {
        type: [categorySchema],
        default: []
      }
    },
    wallets: {
      type: [walletSchema],
      default: []
    }
  },
  { timestamps: true }
);

const User =
  (models.User as UserModelType) ||
  model<UserType, UserModelType>('User', userSchema);
export default User;
