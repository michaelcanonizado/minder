import { ExpenseType } from '@/models/expense';
import React from 'react';

const Expenses = ({
  className,
  selectedExpenseIds = [],
  tableData
}: {
  className?: string;
  selectedExpenseIds?: string[];
  tableData: ExpenseType[];
}) => {
  return <div>Expenses</div>;
};

export default Expenses;
