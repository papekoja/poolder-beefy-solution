"use client";

import { ColumnDef } from "@tanstack/react-table";

export type PoolData = {
  name: string;
  price?: number;
  tokens?: string[];
  balances?: string[];
  totalSupply?: string;
};

export const columns: ColumnDef<PoolData>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "tokens",
    header: "Tokens",
  },
  {
    accessorKey: "balances",
    header: "Balances",
  },
  {
    accessorKey: "totalSupply",
    header: "Total Supply",
  },
];
