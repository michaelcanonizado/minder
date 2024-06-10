'use client';

import React from 'react';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import DataTable, { DataTableProps } from './no-scroll';

const Scroll = <TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) => {
  return (
    <ScrollArea className='overflow-hidden whitespace-nowrap'>
      <DataTable columns={columns} data={data} />
      <ScrollBar orientation='horizontal' className='mt-10' />
    </ScrollArea>
  );
};

export default Scroll;
