'use client';

import { useEffect, useState } from 'react';

import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

import {
  Table as ShadcnTable,
  TableBody as ShadcnTableBody,
  TableCell as ShadcnTableCell,
  TableHead as ShadcnTableHead,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Modal from '@/components/sections/modal';
import { Trash2 } from 'lucide-react';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [rowSelection, setRowSelection] = useState({});

  const [isRowSelectionActionsVisible, setIsRowSelectionActionsVisible] =
    useState(false);

  useEffect(() => {
    console.log(table.getFilteredSelectedRowModel().rows);

    if (table.getFilteredSelectedRowModel().rows.length !== 0) {
      setIsRowSelectionActionsVisible(true);
    } else {
      setIsRowSelectionActionsVisible(false);
    }
  }, [rowSelection]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection
    }
  });

  const rowsSelectedCount = table.getFilteredSelectedRowModel().rows.length;

  const RowActions = (
    <div className='mb-2 flex flex-row divide-x rounded-lg border border-muted'>
      <div className='flex w-[50%] items-center justify-center px-4 pb-3 pt-4'>
        <p className='w-fit'>{rowsSelectedCount} selected</p>
      </div>
      <div className='w-[50%]'>
        <Modal>
          <Modal.Trigger className='transition-color flex w-full items-center justify-center border border-none p-4 duration-200 ease-in hover:bg-accent'>
            <Trash2 className='w-[16px]' />
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Content.Title>Delete Categories</Modal.Content.Title>
            <Modal.Content.Description>Delete</Modal.Content.Description>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );

  return (
    <div className=''>
      {isRowSelectionActionsVisible && RowActions}

      <ShadcnTable>
        <ShadcnTableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <ShadcnTableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <ShadcnTableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </ShadcnTableHead>
                );
              })}
            </ShadcnTableRow>
          ))}
        </ShadcnTableHeader>
        <ShadcnTableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <ShadcnTableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <ShadcnTableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </ShadcnTableCell>
                ))}
              </ShadcnTableRow>
            ))
          ) : (
            <ShadcnTableRow>
              <ShadcnTableCell
                colSpan={columns.length}
                className='h-24 text-center'
              >
                No results.
              </ShadcnTableCell>
            </ShadcnTableRow>
          )}
        </ShadcnTableBody>
      </ShadcnTable>
    </div>
  );
};

const Table = <TData, TValue>({
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

export default Table;
