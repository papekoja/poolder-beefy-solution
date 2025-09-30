"use client";

import { columns, PoolData } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";

type PoolsResponse = Record<string, Omit<PoolData, "name">>;

function convertToList(response: PoolsResponse): PoolData[] {
  return Object.entries(response).map(([name, pool]) => ({
    name,
    ...pool,
  }));
}

export default function Home() {
  const [pools, setPools] = useState<PoolData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await fetch(
          "http://localhost:5266/api/Beefy/lps/breakdown"
        );
        const data: PoolsResponse = await response.json();
        setPools(convertToList(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  return (
    <div>
      <h1 className="">Beefy Pools</h1>
      <DataTable columns={columns} data={pools} />
    </div>
  );
}
