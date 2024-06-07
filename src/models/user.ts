import mongoose, { InferSchemaType } from 'mongoose';

const profileSchema = new mongoose.Schema({
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
});

const currencySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    isDeleted: {
      status: {
        type: Boolean,
        required: true
      },
      deletedAt: {
        type: Date,
        required: true
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
      required: true
    },
    transactionCount: {
      type: Number,
      required: true
    },
    isDeleted: {
      status: {
        type: Boolean,
        required: true
      },
      deletedAt: {
        type: Date,
        required: true
      }
    }
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    profile: {
      type: profileSchema
    },
    lastLogin: {
      type: Date,
      required: true
    },
    currency: {
      type: currencySchema
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

export const User = mongoose.model<InferSchemaType<typeof userSchema>>(
  'User',
  userSchema
);
