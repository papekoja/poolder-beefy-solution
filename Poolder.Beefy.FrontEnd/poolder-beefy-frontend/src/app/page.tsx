"use client";

import { useEffect, useState } from "react";

interface PoolData {
  price?: number;
  tokens?: string[];
  balances?: string[];
  totalSupply?: string;
}

type PoolsResponse = Record<string, PoolData>;

export default function Home() {
  const [pools, setPools] = useState<PoolsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5266/api/Beefy/lps/breakdown"
        );
        const data = await response.json();
        setPools(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Beefy Pools</h1>
      <ul>
        {pools && Object.entries(pools).map(([name, pool]) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{pool.price ?? "N/A"}</td>
            <td>{pool.totalSupply ?? "N/A"}</td>
            <td>{pool.tokens?.join(", ") ?? "N/A"}</td>
            <td>{pool.balances?.join(", ") ?? "N/A"}</td>
          </tr>
        ))}
      </ul>
    </div>
  );
}
