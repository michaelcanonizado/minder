import mongoose, { InferSchemaType } from 'mongoose';

const profileSchema = new mongoose.Schema(
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

const currencySchema = new mongoose.Schema(
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

const categorySchema = new mongoose.Schema(
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

const walletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    color: {
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
        default: null
      },
      deletedAt: {
        type: Date,
        default: null
      }
    }
  },
  { timestamps: true }
);

const balanceSchema = new mongoose.Schema(
  {
    totalBalance: {
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

const userSchema = new mongoose.Schema(
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

const User = mongoose.model<InferSchemaType<typeof userSchema>>(
  'User',
  userSchema
);
export default User;