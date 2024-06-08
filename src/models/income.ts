import mongoose, { InferSchemaType } from 'mongoose';

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    categoryId: {
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

const Income = mongoose.model<InferSchemaType<typeof incomeSchema>>(
  'Income',
  incomeSchema
);
export default Income;
