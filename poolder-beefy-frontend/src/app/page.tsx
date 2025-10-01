"use client";

import { columns, PoolData } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { TotalSupply } from "@/components/total-supply";
import { monsterrat_alternates } from "@/components/utils/fonts";
import { Droplet } from "lucide-react";
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
    <div className="flex flex-col mx-auto px-10">
      <div className="flex justify-between mt-4 md:mx-16 space-x-2">
        <div className="flex flex-row items-center">
          <h1
            className={`${monsterrat_alternates.className} font-black text-6xl`}
          >
            Beefy Pools
          </h1>
          <Droplet size={48} color="#3ae8a2" />
        </div>
        <TotalSupply data={pools} />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={pools} isLoading={loading} />
      </div>
    </div>
  );
}
