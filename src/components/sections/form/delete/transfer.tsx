import { BalanceTransferType } from '@/models/balance-transfer';
import React from 'react';

const Transfer = ({
  className,
  selectedIncomeIds = [],
  tableData,
  queryToRemove = 'selected'
}: {
  className?: string;
  selectedIncomeIds?: string[];
  tableData: BalanceTransferType[];
  queryToRemove?: string;
}) => {
  return <div>Transfer</div>;
};

export default Transfer;
