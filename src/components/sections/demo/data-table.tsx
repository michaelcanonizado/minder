import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal'
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer'
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal'
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer'
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card'
  }
];

const DataTable = () => {
  const renderBodyRow = (data: (typeof invoices)[number]) => {
    return (
      <TableRow key={data.invoice}>
        {Object.entries(data).map(([key, value], index) => {
          return (
            <TableCell
              key={key + value + index}
              className='text-right font-medium'
            >
              {value}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  const renderHeaderRow = (data: (typeof invoices)[number]) => {
    return (
      <TableRow key={data.invoice}>
        {Object.entries(data).map(([key, value], index) => {
          return (
            <TableHead key={key + value + index} className='text-right'>
              {key}
            </TableHead>
          );
        })}
      </TableRow>
    );
  };

  return (
    <Table>
      <TableHeader>{renderHeaderRow(invoices[0])}</TableHeader>
      <TableBody>{invoices.map(invoice => renderBodyRow(invoice))}</TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>$0,000.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DataTable;
