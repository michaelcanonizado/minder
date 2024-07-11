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
import { cn } from '@/lib/utils';

interface RequiredProperties {
  _id: string;
}

export interface DataTableProps<TData extends RequiredProperties, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowActions?: React.ReactNode[];
  queryString?: string;
  selectedRows?: TData[];
}

export const Table = <TData extends RequiredProperties, TValue>({
  columns,
  data,
  rowActions,
  queryString = 'selected',
  selectedRows = []
}: DataTableProps<TData, TValue>) => {
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

  /* On intial load: if there are any selected rows in the URL,
  preselect the corresponding rows*/
  useEffect(() => {
    const selected: { [key: string]: boolean } = {};
    selectedRows.forEach(IRow => {
      const matchedRow = table
        .getRowModel()
        .rows.find(JRow => JRow.original._id === IRow._id);

      if (matchedRow) {
        selected[matchedRow.index] = true;
      }
    });

    setRowSelection(selected);
  }, []);

  useEffect(() => {
    const areRowsSelected =
      table.getFilteredSelectedRowModel().rows.length !== 0;

    if (areRowsSelected) {
      setIsRowSelectionActionsVisible(true);
    } else {
      setIsRowSelectionActionsVisible(false);
    }

    /* On row select, push the selected rows' _id in the URL 
    as queries. The selected rows state are stored in the URL
    instead of in context or any other state to keep the 
    components using this table a server component. This also
    allows the state of the selected rows to be shareable with
    other people/devices as any selected rows in the URL will
    be preselected on the initial table render
    
    The downside to this is that _id's are now required
    properties of the passed object as they are the properties\
    being pushed to the URL*/
    const currentUrl = new URLSearchParams(searchParams);
    const joinedRowIds = table
      .getFilteredSelectedRowModel()
      .rows.map(row => row.original._id)
      .join(',');

    if (areRowsSelected) {
      currentUrl.set(queryString, joinedRowIds);
    } else {
      currentUrl.delete(queryString);
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
      className={cn('m-4 mb-2 divide-x rounded-lg border border-muted')}
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
      <ScrollArea className='overflow-hidden whitespace-nowrap'>
        <div className=''>
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
        <ScrollBar orientation='horizontal' className='mt-10' />
      </ScrollArea>
    </div>
  );
};

export default Table;
