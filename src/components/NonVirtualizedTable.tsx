import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import { useVirtualizer } from "@tanstack/react-virtual";

import { ProcessedTransaction } from "../utils/types";
import {
  groupAndSumDataByDate,
  generateData,
  flatten,
} from "@/utils/data-generation";
import { format, parseISO } from "date-fns";

const data = flatten(groupAndSumDataByDate(generateData()));

export const NonVirtualizedTable = ({}) => {
  const columns = React.useMemo<ColumnDef<ProcessedTransaction>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (cell) => (
          <div className="truncate w-40">
            {cell.row.original.isAggregation
              ? "Items count: " + cell.row.original.count
              : cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: "creditCardNumber",
        header: "credit card number",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "amount",
        id: "amount",
        cell: (info) => info.getValue(),
        header: "amount",
      },
      {
        accessorKey: "currency",
        header: "currency",
      },
      {
        accessorKey: "createdAt",
        header: "created At",
        cell: (cell) => {
          const dt = cell.getValue<string>();
          const date = parseISO(dt);

          const utcDate = new Date(
            date.getTime() + date.getTimezoneOffset() * 60000
          );

          return (
            <span>
              {cell.row.original.isAggregation
                ? format(cell.row.original.createdAt, "yyyy-MM-dd")
                : format(utcDate, "yyyy-MM-dd HH:mm:ss")}
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  return (
    <div className="flex flex-col border border-border bg-background text-foreground  p-2 rounded-md shadow-md w-full overflow-x-auto">
      <div className="mb-2">({data.length} rows)</div>

      <div
        className="border rounded-sm block w-full overflow-x-auto"
        style={{
          overflow: "auto",
          position: "relative",
          height: "400px",
        }}
      >
        <table className="w-full">
          <thead className="w-full sticky top-0 bg-background z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="flex bg-border/80">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={1}
                      className="w-full flex px-2"
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<ProcessedTransaction>;
              const isAggregation = row.original.isAggregation;

              return (
                <tr
                  data-index={virtualRow.index}
                  key={row.id}
                  style={{
                    display: "flex",
                    width: "100%",
                    height: 20,
                  }}
                  className={`${isAggregation ? "bg-violet-700/20 border border-violet-700 font-semibold" : ""} hover:bg-violet-700`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        colSpan={1}
                        key={cell.id}
                        className="w-full flex items-center px-2"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,

                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
