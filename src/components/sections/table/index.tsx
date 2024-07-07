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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface DataTableProps<TData, TValue, TRows> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  deleteCTA?: React.ReactNode;
  passSelectedRowsToParent?: (data: TRows) => void;
}

export const DataTable = <TData, TValue, TRows>({
  columns,
  data,
  deleteCTA,
  passSelectedRowsToParent
}: DataTableProps<TData, TValue, TRows>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [rowSelection, setRowSelection] = useState({});

  const [isRowSelectionActionsVisible, setIsRowSelectionActionsVisible] =
    useState(false);

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

  useEffect(() => {
    if (table.getFilteredSelectedRowModel().rows.length !== 0) {
      setIsRowSelectionActionsVisible(true);
    } else {
      setIsRowSelectionActionsVisible(false);
    }

    const originalRowsData = table
      .getFilteredSelectedRowModel()
      .rows.map(row => {
        return row.original;
      }) as TRows;

    if (passSelectedRowsToParent) {
      passSelectedRowsToParent(originalRowsData);
    }
  }, [rowSelection]);

  const rowsSelected = table.getFilteredSelectedRowModel().rows;
  const rowsSelectedCount = rowsSelected.length;

  const DeleteModal = (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='transition-color flex h-full w-full items-center justify-center rounded-none border border-none bg-inherit p-4 duration-200 ease-in hover:bg-accent'>
          <Trash2 className='w-[16px] stroke-foreground' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Categories</DialogTitle>
          <DialogDescription className=''>
            This will delete the categories from your account allong with the
            connected transactions!
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-2 pt-4'>
          <div className=''>
            <p className='text-body-100'>Selected Categories:</p>
          </div>
          <div className='ml-4 space-y-2'>
            {rowsSelected.map((item, index) => {
              return (
                <div
                  className='text-body-200 flex flex-row space-x-1'
                  key={index}
                >
                  <p className=''>- {item.getValue('name')}</p>
                  <p className='text-muted-foreground'>
                    (123 transactions | $12345.00)
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {deleteCTA}
      </DialogContent>
    </Dialog>
  );

  const RowActions = (
    <div className='mb-2 flex flex-row divide-x rounded-lg border border-muted [&>*]:grow'>
      <div className='flex items-center justify-center px-4 pb-4 pt-4'>
        <p className='w-fit'>{rowsSelectedCount} selected</p>
      </div>
      <div className=''>{deleteCTA ? DeleteModal : ''}</div>
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

const Table = <TData, TValue, TRows>({
  columns,
  data,
  ...props
}: DataTableProps<TData, TValue, TRows>) => {
  return (
    <ScrollArea className='overflow-hidden whitespace-nowrap'>
      <DataTable columns={columns} data={data} {...props} />
      <ScrollBar orientation='horizontal' className='mt-10' />
    </ScrollArea>
  );
};

export default Table;
