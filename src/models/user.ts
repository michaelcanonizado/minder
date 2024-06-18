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
interface UserBalanceTimeframeType {
  startDate: Date | null;
  endDate: Date | null;
}
interface UserBalanceTotalType {
  current: {
    amount: number;
    timeframe: UserBalanceTimeframeType;
  };
  lastWeek: {
    amount: number;
    timeframe: UserBalanceTimeframeType;
  };
  lastMonth: {
    amount: number;
    timeframe: UserBalanceTimeframeType;
  };
}
interface UserBalancePeriodType {
  thisWeek: {
    amount: number;
    timeframe: UserBalanceTimeframeType;
  };
  thisMonth: {
    amount: number;
    timeframe: UserBalanceTimeframeType;
  };
  lastWeek: {
    amount: number;
    timeframe: UserBalanceTimeframeType;
  };
  lastMonth: {
    amount: number;
    timeframe: UserBalanceTimeframeType;
  };
}
export interface UserBalanceType {
  netBalance: number;
  totalIncome: number;
  totalExpense: number;

  net: {
    total: UserBalanceTotalType;
  };
  income: {
    total: UserBalanceTotalType;
    period: UserBalancePeriodType;
  };
  expense: {
    total: UserBalanceTotalType;
    period: UserBalancePeriodType;
  };
}
export interface UserCategoryType {
  name: string;
  _id?: Types.ObjectId & string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: {
    status: boolean;
    deletedAt: Date | null;
  };
  __v?: number;
}
export interface UserWalletType {
  _id: Types.ObjectId & string;
  name: string;
  balance: number;
  transactionCount: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: {
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

const categorySchema = new Schema<UserCategoryType>(
  {
    name: {
      type: String,
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

const balanceTimeframeSchema = new Schema<UserBalanceTimeframeType>(
  {
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: new Date()
    }
  },
  { _id: false }
);
const balanceTotalSchema = new Schema<UserBalanceTotalType>(
  {
    current: {
      amount: {
        type: Number,
        default: 0
      },
      timeframe: {
        type: balanceTimeframeSchema,
        default: {}
      }
    },
    lastWeek: {
      amount: {
        type: Number,
        default: 0
      },
      timeframe: {
        type: balanceTimeframeSchema,
        default: {}
      }
    },
    lastMonth: {
      amount: {
        type: Number,
        default: 0
      },
      timeframe: {
        type: balanceTimeframeSchema,
        default: {}
      }
    }
  },
  { _id: false }
);
const balancePeriodSchema = new Schema<UserBalancePeriodType>(
  {
    thisWeek: {
      amount: {
        type: Number,
        default: 0
      },
      timeframe: {
        type: balanceTimeframeSchema,
        default: {}
      }
    },
    thisMonth: {
      amount: {
        type: Number,
        default: 0
      },
      timeframe: {
        type: balanceTimeframeSchema,
        default: {}
      }
    },
    lastWeek: {
      amount: {
        type: Number,
        default: 0
      },
      timeframe: {
        type: balanceTimeframeSchema,
        default: {}
      }
    },
    lastMonth: {
      amount: {
        type: Number,
        default: 0
      },
      timeframe: {
        type: balanceTimeframeSchema,
        default: {}
      }
    }
  },
  { _id: false }
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
    },

    net: {
      type: {
        total: {
          type: balanceTotalSchema,
          default: {}
        }
      },
      default: {},
      _id: false
    },
    income: {
      type: {
        total: {
          type: balanceTotalSchema,
          default: {}
        },
        period: {
          type: balancePeriodSchema,
          default: {}
        }
      },
      default: {},
      _id: false
    },
    expense: {
      type: {
        total: {
          type: balanceTotalSchema,
          default: {}
        },
        period: {
          type: balancePeriodSchema,
          default: {}
        }
      },
      default: {},
      _id: false
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
