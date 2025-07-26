import { useChambers } from '@/hooks/useChambers';
import { Suspense, useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Chamber } from '@/types';
import { Trash2Icon, MoreHorizontalIcon, PencilIcon } from 'lucide-react';
import {
  Card,
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
import { useChamberStore } from '@/store/chamber';
import { Button } from '../ui/button';
import ChamberFallback from './Fallback';
import ChamberEditDialog from './EditDialog';

const TableContent = () => {
  const { chamberRows, setChamberRows } = useChamberStore();

  const [editingRow, setEditingRow] = useState<Chamber | null>(null);
  const { query } = useChambers();

  const columns = React.useMemo<ColumnDef<Chamber>[]>(
    () => [
      {
        accessorKey: 'Chamber',
        header: 'Chamber',
      },
      {
        accessorKey: 'Status',
        header: () => 'Status',
        cell: ({ row }) => {
          return <>{convertStatNumberToString(row.original.Status)}</>;
        },
      },
      {
        accessorKey: 'Product',
        header: 'Product',
      },
      {
        accessorKey: 'UploadTime',
        header: ' Upload Time',
      },
      {
        accessorKey: 'DegasRoom',
        header: 'Degas Room',
      },
      {
        accessorKey: 'ReloadTime',
        header: 'Reload Time',
      },
      {
        accessorKey: 'PCRoom',
        header: 'PC Room',
      },
      {
        accessorKey: 'FinishTime',
        header: 'Finish Time',
      },
      {
        id: 'action',
        enableHiding: false,
        cell: ({ row }) => {
          const rowId = row.original.ID;

          const handleDelete = () => {
            const clearedRow: Chamber = {
              ...row.original,
              UploadTime: '',
              Status: 0,
              StartTime: '',
              ReloadTime: '',
              Product: '',
              PCRoom: '',
              FinishTime: '',
              DegasRoom: '',
            };

            const updatedRows = chamberRows.map((row) =>
              row.ID === rowId ? clearedRow : row
            );
            setChamberRows(updatedRows);
            // make api call
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
    [chamberRows, setChamberRows]
  );

  const table = useReactTable({
    data: chamberRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (query.data) {
      setChamberRows(query.data);
    }
  }, [query.data, setChamberRows]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Chamber Table</CardTitle>
          <CardDescription>Click on the 3 dots to edit rows.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
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
          </div>
        </CardContent>
      </Card>
      {/* Dialogs for edting/addding data */}
      {editingRow && (
        <ChamberEditDialog
          row={editingRow}
          onClose={() => setEditingRow(null)}
        />
      )}
    </>
  );
};

const ChamberTable = () => {
  return (
    <>
      <Suspense fallback={<ChamberFallback />}>
        <TableContent />
      </Suspense>
    </>
  );
};

export default ChamberTable;
