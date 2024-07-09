'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

export interface DataTableProps<TData, TValue, TRows> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowActions?: React.ReactNode[];
  /* This component is used in many places that have no 
  relation to one another (I.e: showing transactions and 
  showing categories), therefore to access the state of 
  the selected rows, we need to pass it to the parent and 
  perform the logic there. Doing the logic here, such as 
  updating a context or submiting the form will not make 
  this component reusable and tie it to that specific 
  purpose. 
  
  So to access the selected rows, pass a function that 
  accepts a parameter 'data' of the type of the original 
  object to this component, and it will pass the data to
   that function.*/
  passSelectedRowsToParent?: (data: TRows) => void;
}

export const DataTable = <TData, TValue, TRows>({
  columns,
  data,
  rowActions,
  passSelectedRowsToParent
}: DataTableProps<TData, TValue, TRows>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isRowSelectionActionsVisible, setIsRowSelectionActionsVisible] =
    useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    const areRowsSelected =
      table.getFilteredSelectedRowModel().rows.length !== 0;

    if (areRowsSelected) {
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

    console.log(table.getFilteredSelectedRowModel().rows[0]?.original);

    const currentUrl = new URLSearchParams(searchParams);
    const joinedRowIds = table
      .getFilteredSelectedRowModel()
      /* @ts-ignore */
      .rows.map(row => row.original._id)
      .join(',');

    if (areRowsSelected) {
      currentUrl.set('selected', joinedRowIds);
    } else {
      currentUrl.delete('selected');
    }

    const search = currentUrl.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`, { scroll: false });
  }, [rowSelection]);

  const rowsSelected = table.getFilteredSelectedRowModel().rows;
  const rowsSelectedCount = rowsSelected.length;
  const rowActionsCount = rowActions ? rowActions.length + 1 : 1;

  const RowActions = (
    <div
      className='mb-2 divide-x rounded-lg border border-muted'
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${rowActionsCount},minmax(0,1fr))`
      }}
    >
      <div className='grid place-items-center p-4'>
        <p className='w-fit'>{rowsSelectedCount} selected</p>
      </div>
      {rowActions?.map((action, index) => {
        return <div key={index}>{action}</div>;
      })}
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
