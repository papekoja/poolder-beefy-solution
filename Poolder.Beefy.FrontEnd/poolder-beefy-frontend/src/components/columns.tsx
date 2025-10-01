"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "./ui/badge";

export type PoolData = {
  name: string;
  price?: number;
  tokens?: string[];
  balances?: string[];
  totalSupply?: string;
};

export const columns: ColumnDef<PoolData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "tokens",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tokens" />
    ),
    cell: ({ row }) => {
      const tokens: string[] = row.getValue("tokens") ?? [];

      return (
        <div className="flex flex-col items-end gap-1">
          {tokens.map((token, i) => {
            return <Badge key={i} variant="secondary">{token}</Badge>;
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "balances",
    header: () => <div className="text-right">Balances</div>,
    cell: ({ row }) => {
      const balances: string[] = row.getValue("balances") ?? [];

      return (
        <div className="flex flex-col items-end gap-1">
          {balances.map((balance, i) => {
            const amount = parseFloat(balance);
            const formatted = new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(amount);

            return (
              <span key={i} className="text-right font-medium">
                {formatted}
              </span>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "totalSupply",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Supply" />
    ),
    cell: ({ row }) => {
      const rawValue: string = row.getValue("totalSupply");
      const amount = parseFloat(rawValue);

      // Format with max 6 decimals, but no trailing zeros
      const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
