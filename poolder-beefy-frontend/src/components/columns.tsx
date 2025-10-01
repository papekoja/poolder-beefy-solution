"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "./ui/badge";
import { DollarSign } from "lucide-react";

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
    cell: ({ row }) => {
      const name: string = row.getValue("name") ?? "";
      return <p className="font-bold text-lg">{name}</p>;
    },
  },
  {
    accessorKey: "tokens",
    header: ({ column }) => <div className="flex justify-end">Tokens</div>,
    cell: ({ row }) => {
      const tokens: string[] = row.getValue("tokens") ?? [];

      return (
        <div className="flex flex-col items-end gap-1">
          {tokens.map((token, i) => {
            return (
              <Badge key={i} variant="secondary">
                {token}
              </Badge>
            );
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
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 3,
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
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Total Supply" />
      </div>
    ),
    cell: ({ row }) => {
      const rawValue: string = row.getValue("totalSupply");
      const amount = parseFloat(rawValue);

      // Format with max 6 decimals, but no trailing zeros
      const formatted = new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Price" />
      </div>
    ),
    cell: ({ row }) => {
      const rawValue: string = row.getValue("price");
      const amount = parseFloat(rawValue);

      // Format with max 6 decimals, but no trailing zeros
      const formatted = new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      }).format(amount);

      return (
        <div className="flex flex-row justify-center items-center text-right font-medium">
          <DollarSign size={14} />
          <span>{formatted}</span>
        </div>
      );
    },
  },
];
