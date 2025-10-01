import { PoolData } from "./columns";
import { lora } from "./utils/fonts";

interface TotalSupplyProps {
  data: PoolData[];
}

export function TotalSupply({ data }: TotalSupplyProps) {
  const totalSupplySum = data.reduce((sum, pool) => {
    const supply = parseFloat(pool.totalSupply || "0");
    return sum + supply;
  }, 0);

  const formatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "long",
    maximumFractionDigits: 2,
  }).format(totalSupplySum);

  return (
    <div className="flex flex-col">
      <p>Total Supply:</p>
      <p className={`${lora.className} text-3xl`}>${formatted}</p>
    </div>
  );
}
