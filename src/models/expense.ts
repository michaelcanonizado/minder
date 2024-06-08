import mongoose, { InferSchemaType } from 'mongoose';

const expenseSchema = new mongoose.Schema(
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

const Expense = mongoose.model<InferSchemaType<typeof expenseSchema>>(
  'Expense',
  expenseSchema
);
export default Expense;
