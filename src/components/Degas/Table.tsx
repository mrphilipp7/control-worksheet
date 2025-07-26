import { useDegas } from '@/hooks/useDegas';
import { Suspense, useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import type { Degas } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import {
  Trash2Icon,
  MoreHorizontalIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusIcon,
} from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { convertStatNumberToString } from '@/lib/utils';
import DegasEditDialog from './EditDialog';
import DegasAddDialog from './AddDialog';
import DegasFallback from './Fallback';
import { useDegasStore } from '@/store/degas';

const TableContent = () => {
  const { degasRows, setDegasRows } = useDegasStore();

  const columns = React.useMemo<ColumnDef<Degas>[]>(
    () => [
      {
        accessorKey: 'Status',
        header: () => 'Status',
        cell: ({ row }) => {
          return <>{convertStatNumberToString(row.original.Status)}</>;
        },
      },
      {
        accessorKey: 'Room',
        header: 'Room #',
      },
      {
        accessorKey: 'ControlNumber',
        header: 'Control #',
      },
      {
        accessorKey: 'TimeFinished',
        header: 'Time Finished',
      },
      {
        accessorKey: 'LoadSize',
        header: 'Load Size',
      },
      {
        id: 'action',
        enableHiding: false,
        cell: ({ row }) => {
          const rowId = row.original.ID;

          const handleDelete = () => {
            const updatedRows = degasRows.filter((item) => item.ID !== rowId);
            setDegasRows(updatedRows);
          };

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setEditingRow(row.original)}>
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                  <Trash2Icon />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [degasRows, setDegasRows] // ✅ Add dependencies here!
  );
  const [editingRow, setEditingRow] = useState<Degas | null>(null);
  const [isAddingRow, setIsAddingRow] = useState<boolean>(false);

  const { query } = useDegas();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, // Default rows per page
  });

  const table = useReactTable({
    data: degasRows,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (query.data) {
      setDegasRows(query.data);
    }
  }, [query.data, setDegasRows]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Degas Table</CardTitle>
          <CardDescription>Click on the 3 dots to edit rows.</CardDescription>
          <CardAction>
            <Button variant={'default'} onClick={() => setIsAddingRow(true)}>
              <PlusIcon />
              Add row
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border ">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center p-2">
              <span className="text-sm leading-none ">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  disableAnimation={!table.getCanPreviousPage()}
                >
                  <ChevronLeftIcon />
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  disableAnimation={!table.getCanNextPage()}
                >
                  Next
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs for edting/addding data */}
      {editingRow && (
        <DegasEditDialog row={editingRow} onClose={() => setEditingRow(null)} />
      )}
      {isAddingRow && (
        <DegasAddDialog
          onClose={() => setIsAddingRow(false)}
          isOpen={isAddingRow}
        />
      )}
    </>
  );
};

const DegasTable = () => {
  return (
    <>
      <Suspense fallback={<DegasFallback />}>
        <TableContent />
      </Suspense>
    </>
  );
};

export default DegasTable;
